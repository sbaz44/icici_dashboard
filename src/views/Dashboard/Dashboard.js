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
import {
  getbranchDetails,
  postBranchDetails,
  getbranchReports,
  postBranchReports,
  dashboardCount,
  graphData,
} from "../../middleware/actions";
import $ from "jquery";
import {
  dailySalesChart,
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
var result = "";
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const branches = useSelector((state) => state.branches);
  const dashboard_Count = useSelector((state) => state.dashboard_Count);
  const graph_data = useSelector((state) => state.graph_data);
  const postBranchResponse = useSelector((state) => state.postBranchResponse);
  const branchReport = useSelector((state) => state.branchReport);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setSelectedDate(date);
    // dispatch(viewBranchDetail(props.match.params.branch, result));
  };
  let [response, setResponse] = useState("");
  let [data, setData] = useState({
    Total_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [
        [478, 43, 1234, 14776, 0, 0, 1324],
        [345, 8033, 656, 1244, 5560, 5550, 120],
        [123, 8033, 3434, 1670, 34350, 3450, 6564],
      ],
    },
    Social_distancing_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[43, 97, 526, 0, 0, 0, 0]],
    },
    Teller_missing_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[38, 12, 181, 2, 0, 0, 104]],
    },
    Camera_tampering_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[245, 7729, 1, 14659, 0, 0, 8]],
    },
  });

  useEffect(() => {
    var todaysDate = new Date();
    result = format(todaysDate, "dd-MM-yyyy");
    dispatch(dashboardCount());
    dispatch(graphData());
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    console.log(graph_data);
    // return () => {
    //   console.log("cleared");
    // };
  }, []);

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
      <GridContainer>
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
                {" "}
                Total Alerts Generated
              </p>
              <h3 className={classes.cardTitle}>
                {dashboard_Count.Alert_count}
              </h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
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
                {dashboard_Count.People_count}
              </h3>
            </CardHeader>
            <CardFooter stats>
              {/* <div className={classes.stats}>
                <Update />
                Just Updated
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>

        {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}

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
                {dashboard_Count.Branch_count}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/branch">
                <div className={classes.stats} style={{ color: "#43a047" }}>
                  {/* <DateRange /> */}
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Social_distancing_alerts}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4
                className={classes.cardTitle}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                External Threats
              </h4>
            </CardBody>
            <CardFooter stats>
              <a href="/admin/threats/External_threats">
                <div
                  className={classes.stats}
                  style={{ color: "#43a047", textAlign: "center" }}
                >
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Teller_missing_alerts}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4
                className={classes.cardTitle}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Business Insights
              </h4>
            </CardBody>
            <CardFooter stats>
              <a href="/admin/threats/Business_insights">
                <div
                  className={classes.stats}
                  style={{ color: "#43a047", textAlign: "center" }}
                >
                  {/* <DateRange /> */}
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Camera_tampering_alerts}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4
                className={classes.cardTitle}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Internal Compliance
              </h4>
            </CardBody>
            <CardFooter stats>
              <a href="/admin/threats/Internal_compliance">
                <div
                  className={classes.stats}
                  style={{ color: "#43a047", textAlign: "center" }}
                >
                  {/* <DateRange /> */}
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Camera_tampering_alerts}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4
                className={classes.cardTitle}
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                Covid Safety
              </h4>
            </CardBody>
            <CardFooter stats>
              <a href="/admin/threats/Covid_safety">
                <div
                  className={classes.stats}
                  style={{ color: "#43a047", textAlign: "center" }}
                >
                  {/* <DateRange /> */}
                  View More
                </div>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <img
        src={bg}
        alt=""
        style={{ width: "100%", height: "15vw", objectFit: "cover" }}
      />
    </div>
  );
}
