import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Videocam from "@material-ui/icons/Videocam";
import Whatshot from "@material-ui/icons/Whatshot";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import bg from "../../assets/img/bg.jpg";
import smart from "../../assets/img/smartAI.png";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useSelector, useDispatch } from "react-redux";
import { bugs, website, server } from "variables/general.js";
import { getTypeDetail } from "../../middleware/actions";
import $ from "jquery";
import {
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { TransferWithinAStationSharp } from "@material-ui/icons";
var result = "";
const useStyles = makeStyles(styles);

export default function Type1_1(props) {
  const classes = useStyles();
  const data = useSelector((state) => state.typeData);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setSelectedDate(date);
    dispatch(getTypeDetail(props.match.params.type, result));
  };
  //   let [response, setResponse] = useState("");

  useEffect(() => {
    // var todaysDate = new Date();
    // result = format(todaysDate, "dd-MM-yyyy");
    // console.log(props.match.params.date);
    var datee = props.match.params.date;
    var newdate = datee.split("-").reverse().join("-");
    setSelectedDate(newdate);
    result = props.match.params.date;
    dispatch(getTypeDetail(props.match.params.type, result));
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    console.log("data");
    console.log(data);
    // return () => {
    //   console.log("cleared");
    // };
  }, []);
  const ExternalThreats = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="whh:gun"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Weapon Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Weapon}</h3>
            </CardHeader>
            <CardFooter stats>
              <a
                href={
                  "/admin/details/threats/External_threats/Weapon/" + result
                }
              >
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <Videocam />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Camera Tampering Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Tampering}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Tampering">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="carbon:face-mask"
                    data-inline="false"
                    data-flip="horizontal"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Mask Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Mask}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Mask">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  {" "}
                  <Whatshot />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Fire Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Fire}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Fire">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  {" "}
                  <Accessibility />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Person Exceeded Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Exceeded}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Exceeded">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <TransferWithinAStationSharp />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Trespass Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Trespass}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Trespass">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="ion:walk-outline"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Loitering Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Loitering}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Loitering">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="mdi:racing-helmet"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Helmet Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Helmet}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Helmet">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="bi:camera-video-off"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Camera Defective Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Defective}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/External_threats/Defective">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };
  const BusinessInsights = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="ion:walk-outline"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Loitering Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Loitering}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Business_insights/Loitering">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <Accessibility />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                People Count Alert
              </p>
              <h3 className={classes.cardTitle}>{data.People_count}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Business_insights/People_count">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="entypo:suitcase"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Object Unattended Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Unattended}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Business_insights/Unattended">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="ri:body-scan-fill"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Thermal Scanning Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Thermal}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Business_insights/Thermal">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="uil:social-distancing"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Social Distancing Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Social}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Business_insights/Social">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="whh:vaultthree"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Vault Related Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Vault}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Business_insights/Vault">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  const InternalCompliance = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <Accessibility />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                People Count Alert
              </p>
              <h3 className={classes.cardTitle}>{data.People_count}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Internal_compliance/People_count">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="entypo:suitcase"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Object Unattended Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Unattended}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Internal_compliance/Unattended">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="whh:vaultthree"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Vault Related Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Vault}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Internal_compliance/Vault">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  const CovidSafety = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <Accessibility />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Person Exceeded Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Person}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Covid_safety/Person">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="uil:social-distancing"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Social Distancing Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Social}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Covid_safety/Social">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>
                  <span
                    class="iconify"
                    data-icon="ri:body-scan-fill"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Temperature Scanning Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Temperature}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/details/threats/Covid_safety/Temperature">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  return (
    <div id="dashboard-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "2vw",
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <img
              src={smart}
              style={{ width: "2.8vw", height: "2.8vw", objectFit: "contain" }}
            /> */}
            <p
              style={{
                fontSize: "1.5vw",
                marginLeft: "0.5vw",
                fontWeight: "bold",
                paddingTop: "0.5vw",
              }}
            >
              Smart Bank Analytics System
            </p>
          </div>
          <KeyboardDatePicker
            disableToolbar
            disableFuture
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Search by Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      {props.match.params.type === "External_threats" && ExternalThreats()}
      {props.match.params.type === "Business_insights" && BusinessInsights()}
      {props.match.params.type === "Internal_compliance" &&
        InternalCompliance()}
      {props.match.params.type === "Covid_safety" && CovidSafety()}
      {/* <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Total Alerts Generated
              </p>
              <h3 className={classes.cardTitle}>
                {dashboard_Count.Alert_count}
              </h3>
            </CardHeader>
            <CardFooter stats>
              
            </CardFooter>
          </Card>
        </GridItem> */}

      {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                {" "}
                Total Customer Visited
              </p>
              <h3 className={classes.cardTitle}>
              </h3>
            </CardHeader>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Live Branches
              </p>
              <h3 className={classes.cardTitle}>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/branch">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem> */}
      {/* </GridContainer> */}
    </div>
  );
}
