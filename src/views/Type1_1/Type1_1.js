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
var result2 = "";
var state = "";
var city = "";
const useStyles = makeStyles(styles);

export default function Type1_1(props) {
  const classes = useStyles();
  const data = useSelector((state) => state.typeData);
  const dispatch = useDispatch();
  const [selectedToDate, setToDate] = React.useState(new Date());
  const [selectedFromDate, setFromDate] = React.useState(new Date());

  const handleToChange = (date) => {
    result2 = format(date, "dd-MM-yyyy");
    setToDate(date);
    dispatch(
      getTypeDetail(
        props.match.params.type,
        props.match.params.state,
        props.match.params.city,
        result,
        result2
      )
    );
  };
  const handleFromChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setFromDate(date);
    dispatch(
      getTypeDetail(
        props.match.params.type,
        props.match.params.state,
        props.match.params.city,
        result,
        result2
      )
    );
  };

  useEffect(() => {
    // var todaysDate = new Date();
    // result = format(todaysDate, "dd-MM-yyyy");
    // console.log(props.match.params.date);
    var datee = props.match.params.date;
    var datee2 = props.match.params.date2;
    var newdate = datee.split("-").reverse().join("-");
    var newdate2 = datee2.split("-").reverse().join("-");
    setFromDate(newdate);
    setToDate(newdate2);
    result = props.match.params.date;
    result2 = props.match.params.date2;
    state = props.match.params.state;
    city = props.match.params.city;
    dispatch(
      getTypeDetail(
        props.match.params.type,
        props.match.params.state,
        props.match.params.city,
        props.match.params.date,
        props.match.params.date2
      )
    );
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");

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
                  "/admin/details/threats/External_threats/Weapon/" +
                  state +
                  "/" +
                  city +
                  "/" +
                  result +
                  "/" +
                  result2
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
              <a
                href={
                  "/admin/details/threats/External_threats/Tampering/" + result
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
              <a
                href={"/admin/details/threats/External_threats/Mask/" + result}
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
              <a
                href={"/admin/details/threats/External_threats/Fire/" + result}
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
              <a
                href={
                  "/admin/details/threats/External_threats/Exceeded/" + result
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
                  <TransferWithinAStationSharp />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Trespass Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Trespassing}</h3>
            </CardHeader>
            <CardFooter stats>
              <a
                href={
                  "/admin/details/threats/External_threats/Trespass/" + result
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
              <a
                href={
                  "/admin/details/threats/External_threats/Loitering/" + result
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
              <a
                href={
                  "/admin/details/threats/External_threats/Helmet/" + result
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
              <a
                href={
                  "/admin/details/threats/External_threats/Defective/" + result
                }
              >
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
              <a
                href={
                  "/admin/details/threats/Business_insights/Loitering/" + result
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
                  <Accessibility />
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                People Count Alert
              </p>
              <h3 className={classes.cardTitle}>{data.Person}</h3>
            </CardHeader>
            <CardFooter stats>
              <a
                href={
                  "/admin/details/threats/Business_insights/Person/" + result
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
              <a
                href={
                  "/admin/details/threats/Business_insights/Unattended/" +
                  result
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
              {/* <h3 className={classes.cardTitle}>{data.Thermal}</h3> */}
            </CardHeader>
            <CardFooter stats>
              {/* <a
                href={
                  "/admin/details/threats/Business_insights/Thermal/" + result
                }
              > */}
              <a
                href="http://10.11.0.4:8118/tickets/filter/?f=1&fs=Temperature&gp=5f927d96afe0780011024d2a&r=29032"
                target="_blank"
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
              <a
                href={
                  "/admin/details/threats/Business_insights/Social/" + result
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
              <a
                href={
                  "/admin/details/threats/Business_insights/Vault/" + result
                }
              >
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
        {/* <GridItem xs={12} sm={6} md={3}>
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
              <h3 className={classes.cardTitle}>{data.People}</h3>
            </CardHeader>
            <CardFooter stats>
              <a
                href={
                  "/admin/details/threats/Internal_compliance/People_count/" + result
                }
              >

                <div className={classes.stats} style={{ color: "#43a047" }}>
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem> */}
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
              <a
                href={
                  "/admin/details/threats/Internal_compliance/Unattended/" +
                  result
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
              <a
                href={
                  "/admin/details/threats/Internal_compliance/Vault/" + result
                }
              >
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
              <a href={"/admin/details/threats/Covid_safety/Person/" + result}>
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
              <a href={"/admin/details/threats/Covid_safety/Social/" + result}>
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
                    data-icon="emojione-monotone:man"
                    data-inline="false"
                  ></span>
                </Icon>
              </CardIcon>
              <p
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                No Mask Alerts
              </p>
              <h3 className={classes.cardTitle}>{data.Temperature}</h3>
            </CardHeader>
            <CardFooter stats>
              {/* <a  http://10.11.0.4:8118/tickets/filter/?f=1&fs=Temperature&gp=5f927d96afe0780011024d2a&r=29032
                href={
                  "/admin/details/threats/Covid_safety/Temperature/" + result
                }
              > */}
              <a href={"/admin/details/threats/Covid_safety/no/" + result}>
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
              {/* <h3 className={classes.cardTitle}>{data.Temperature}</h3> */}
            </CardHeader>
            <CardFooter stats>
              {/* <a  http://10.11.0.4:8118/tickets/filter/?f=1&fs=Temperature&gp=5f927d96afe0780011024d2a&r=29032
                href={
                  "/admin/details/threats/Covid_safety/Temperature/" + result
                }
              > */}
              <a
                href="http://10.11.0.4:8118/tickets/filter/?f=1&fs=Temperature&gp=5f927d96afe0780011024d2a&r=29032"
                target="_blank"
              >
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={smart}
            style={{ width: "2.8vw", height: "2.8vw", objectFit: "contain" }}
          />
          <p
            style={{
              fontSize: "1.5vw",
              marginLeft: "0.5vw",
              fontWeight: "bold",
              paddingTop: "0.5vw",
            }}
          >
            {props.match.params.type == "External_threats" &&
              "External Threat Alerts"}
            {props.match.params.type == "Business_insights" &&
              "Business Insights Alerts"}
            {props.match.params.type == "Internal_compliance" &&
              "Internal Compliance Alerts"}
            {props.match.params.type == "Covid_safety" && "Covid Safety Alerts"}
          </p>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              disableFuture
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={selectedFromDate}
              onChange={handleFromChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginRight: "25px" }}
            />
          </MuiPickersUtilsProvider>
          {/* <div style={{ marginLeft: "5px", marginRight: "5px" }} /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              disableFuture
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="To"
              value={selectedToDate}
              onChange={handleToChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
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
