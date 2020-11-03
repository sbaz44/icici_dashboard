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
import "./dashboard.css";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
import Select from "@material-ui/core/Select";
import { bugs, website, server } from "variables/general.js";
import Skeleton from "@material-ui/lab/Skeleton";
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
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
var result = "";
var result2 = "";
var result3 = "";
var result4 = "";
const useStyles = makeStyles(styles);
const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const branches = useSelector((state) => state.branches);
  const dashboard_Count = useSelector((state) => state.dashboard_Count);
  const graph_data = useSelector((state) => state.graph_data);
  const postBranchResponse = useSelector((state) => state.postBranchResponse);
  const branchReport = useSelector((state) => state.branchReport);
  const dispatch = useDispatch();
  const [selectedToDate, setToDate] = React.useState(new Date());
  const [selectedFromDate, setFromDate] = React.useState(new Date());
  const [selectedState, setselectedState] = useState("null");
  const [selectedCity, setselectedCity] = useState("null");

  const handleToChange = (date) => {
    result2 = format(date, "dd-MM-yyyy");
    result4 = format(date, "MM/dd/yyyy");
    setToDate(date);
    dispatch(graphData(selectedState, selectedCity, result, result2));
    dispatch(dashboardCount(selectedState, selectedCity, result, result2));
    // dispatch(viewBranchDetail(props.match.params.branch, result));
  };
  const handleFromChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    result3 = format(date, "MM/dd/yyyy");

    setFromDate(date);

    dispatch(graphData(selectedState, selectedCity, result, result2));
    dispatch(dashboardCount(selectedState, selectedCity, result, result2));
    // dispatch(viewBranchDetail(props.match.params.branch, result));
  };
  const handleCityChange = (event) => {
    setselectedState(event.target.value);
    dispatch(graphData(event.target.value, selectedCity, result, result2));
    dispatch(dashboardCount(event.target.value, selectedCity, result, result2));
  };

  const handleBranchChange = (event) => {
    setselectedCity(event.target.value);
    dispatch(graphData(selectedState, event.target.value, result, result2));
    dispatch(
      dashboardCount(selectedState, event.target.value, result, result2)
    );
  };

  useEffect(() => {
    var todaysDate = new Date();
    var todaysDate2 = new Date();
    todaysDate2.setDate(todaysDate2.getDate() - 6);
    result2 = format(todaysDate, "dd-MM-yyyy");
    result = format(todaysDate2, "dd-MM-yyyy");
    result4 = format(todaysDate, "MM/dd/yyyy");
    result3 = format(todaysDate2, "MM/dd/yyyy");
    console.log(result2);
    var newdate = result.split("-").reverse().join("-");
    setFromDate(newdate);
    dispatch(dashboardCount("", "", "", ""));
    dispatch(graphData("", "", "", ""));
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    // console.log(graph_data);
    // return () => {
    //   console.log("cleared");
    // };

    var obj = {
      Weapon: 0,
      Tampering: 0,
      Mask: 0,
      Fire: 0,
      Exceeded: 0,
      Trespass: 8,
      Loitering: 0,
      Helmet: 0,
      Defective: 0,
    };
    var sortable = [];
    for (var vehicle in obj) {
      sortable.push([vehicle, obj[vehicle]]);
    }

    sortable
      .sort(function (a, b) {
        return a[1] - b[1];
      })
      .reverse();

    console.log(sortable);
  }, []);
  const Maharashtra = ["Mumbai", "Nagpur", "Pune"];
  const Haryana = ["Padla"];
  const Delhi = ["Dwarka", "Najafgarh", "TagoreGarden"];
  return (
    <div id="dashboard-page">
      {console.log(selectedState)}
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
              fontSize: "1.3em",
              marginLeft: "0.5vw",
              fontWeight: "bold",
              paddingTop: "0.5vw",
            }}
          >
            Smart Bank Analytics System
          </p>
        </div>
        <FormControl className={classes2.formControl}>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedState}
            onChange={handleCityChange}
          >
            <MenuItem value={"Delhi"}>Delhi</MenuItem>
            <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
            <MenuItem value={"Haryana"}>Haryana</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes2.formControl}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            onChange={handleBranchChange}
          >
            {selectedState === "Maharashtra" &&
              Maharashtra.map((item, index) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}

            {selectedState === "Delhi" &&
              Delhi.map((item, index) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            {selectedState === "Haryana" &&
              Haryana.map((item, index) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
          </Select>
        </FormControl>
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
          />
        </MuiPickersUtilsProvider>
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
      {/* <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Skeleton animation="wave" variant="text" height={200} />
        </GridItem>
      </GridContainer> */}

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
                {dashboard_Count.Total_Branch_count}
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
          <Card>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.External_threats}
                type="Line"
                options={emailsSubscriptionChart.options}
                listener={emailsSubscriptionChart.animation}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              />
            </CardHeader>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 16px",
                marginTop: "1em",
              }}
            >
              <h4
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  margin: 0,
                  lineHeight: "1.5em",
                }}
              >
                External Threats
              </h4>
              <a
                href={
                  selectedCity == "" || selectedState == ""
                    ? "/admin/threats/External_threats/" +
                      null +
                      "/" +
                      null +
                      "/" +
                      result +
                      "/" +
                      result2
                    : "/admin/threats/External_threats/" +
                      selectedState +
                      "/" +
                      selectedCity +
                      "/" +
                      result +
                      "/" +
                      result2
                }
              >
                <div
                  className="makeStyles-stats-98"
                  style={{ color: "#43a047" }}
                >
                  View More
                </div>
              </a>
            </div>
            <CardBody>
              {Object.keys(graph_data).length > 0 && (
                <Table>
                  <TableBody>
                    {graph_data.External_threats.dataList.map((row, index) => (
                      <TableRow key={row.age} className={classes.tableBodyRow}>
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          style={{
                            fontWeight: "bold",
                            color: "#3C4858",
                            fontSize: "0.8125rem",
                            textAlign: "left",
                          }}
                        >
                          {row.Type}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          style={{
                            fontWeight: "bold",
                            color: "#3C4858",
                            fontSize: "0.8125rem",
                            textAlign: "left",
                          }}
                        >
                          {row.Count}
                        </TableCell>

                        <TableCell
                          className={classes.tableCell}
                          align="center"
                          style={{
                            fontWeight: "bold",
                            color: "#3C4858",
                            fontSize: "0.8125rem",
                            textAlign: "right",
                          }}
                        >
                          <a
                            href={
                              "/admin/detail/threats/All/" +
                              row.Type.replace("alert", "").replace(/\s+/, "") +
                              "/External_threats/" +
                              selectedState +
                              "/" +
                              selectedCity +
                              "/" +
                              result +
                              "/" +
                              result2
                            }
                          >
                            View
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Business_insights}
                type="Line"
                options={emailsSubscriptionChart.options}
                listener={emailsSubscriptionChart.animation}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              />
            </CardHeader>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 16px",
                marginTop: "1em",
              }}
            >
              <h4
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  margin: 0,
                  lineHeight: "1.5em",
                }}
              >
                Business Insights
              </h4>
              <a
                href={
                  selectedCity == "" || selectedState == ""
                    ? "/admin/threats/Business_insights/" +
                      null +
                      "/" +
                      null +
                      "/" +
                      result +
                      "/" +
                      result2
                    : "/admin/threats/Business_insights/" +
                      selectedState +
                      "/" +
                      selectedCity +
                      "/" +
                      result +
                      "/" +
                      result2
                }
              >
                <div
                  className="makeStyles-stats-98"
                  style={{ color: "#43a047" }}
                >
                  View More
                </div>
              </a>
            </div>
            <CardBody>
              {Object.keys(graph_data).length > 0 && (
                <Table>
                  <TableBody>
                    {graph_data.Business_insights.dataList.map((row, index) => {
                      if (row.Type === "Temperature alert") {
                        return (
                          <TableRow
                            key={row.age}
                            className={classes.tableBodyRow}
                          >
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Type}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Count}
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "right",
                              }}
                            >
                              <a
                                href={
                                  "http://10.11.0.4:8118/tickets/filter/?f=1&ds=" +
                                  result3 +
                                  "&de=" +
                                  result4 +
                                  "&fs=Temperature&gp=5f9fc190afc8700011a17f9c"
                                }
                              >
                                View
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow
                            key={row.age}
                            className={classes.tableBodyRow}
                          >
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Type == "People_count alert"
                                ? "People count alert"
                                : row.Type}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Count}
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "right",
                              }}
                            >
                              <a
                                href={
                                  "/admin/detail/threats/All/" +
                                  row.Type.replace("alert", "").replace(
                                    /\s+/,
                                    ""
                                  ) +
                                  "/Business_insights/" +
                                  selectedState +
                                  "/" +
                                  selectedCity +
                                  "/" +
                                  result +
                                  "/" +
                                  result2
                                }
                              >
                                View
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Internal_compliance}
                type="Line"
                options={emailsSubscriptionChart.options}
                listener={emailsSubscriptionChart.animation}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              />
            </CardHeader>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 16px",
                marginTop: "1em",
              }}
            >
              <h4
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  margin: 0,
                  lineHeight: "1.5em",
                }}
              >
                Internal Compliance
              </h4>
              <a
                href={
                  selectedCity == "" || selectedState == ""
                    ? "/admin/threats/Internal_compliance/" +
                      null +
                      "/" +
                      null +
                      "/" +
                      result +
                      "/" +
                      result2
                    : "/admin/threats/Internal_compliance/" +
                      selectedState +
                      "/" +
                      selectedCity +
                      "/" +
                      result +
                      "/" +
                      result2
                }
              >
                <div
                  className="makeStyles-stats-98"
                  style={{ color: "#43a047" }}
                >
                  View More
                </div>
              </a>
            </div>
            <CardBody>
              {Object.keys(graph_data).length > 0 && (
                <Table>
                  <TableBody>
                    {graph_data.Internal_compliance.dataList.map(
                      (row, index) => (
                        <TableRow
                          key={row.age}
                          className={classes.tableBodyRow}
                        >
                          <TableCell
                            className={classes.tableCell}
                            align="center"
                            style={{
                              fontWeight: "bold",
                              color: "#3C4858",
                              fontSize: "0.8125rem",
                              textAlign: "left",
                            }}
                          >
                            {row.Type}
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            align="center"
                            style={{
                              fontWeight: "bold",
                              color: "#3C4858",
                              fontSize: "0.8125rem",
                              textAlign: "left",
                            }}
                          >
                            {row.Count}
                          </TableCell>

                          <TableCell
                            className={classes.tableCell}
                            align="center"
                            style={{
                              fontWeight: "bold",
                              color: "#3C4858",
                              fontSize: "0.8125rem",
                              textAlign: "right",
                            }}
                          >
                            <a
                              href={
                                "/admin/detail/threats/All/" +
                                row.Type.replace("alert", "").replace(
                                  /\s+/,
                                  ""
                                ) +
                                "/Internal_compliance/" +
                                selectedState +
                                "/" +
                                selectedCity +
                                "/" +
                                result +
                                "/" +
                                result2
                              }
                            >
                              View
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Covid_safety}
                type="Line"
                options={emailsSubscriptionChart.options}
                listener={emailsSubscriptionChart.animation}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
              />
            </CardHeader>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 16px",
                marginTop: "1em",
              }}
            >
              <h4
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  margin: 0,
                  lineHeight: "1.5em",
                }}
              >
                Covid Safety
              </h4>

              <a
                href={
                  selectedCity == "" || selectedState == ""
                    ? "/admin/threats/Covid_safety/" +
                      null +
                      "/" +
                      null +
                      "/" +
                      result +
                      "/" +
                      result2
                    : "/admin/threats/Covid_safety/" +
                      selectedState +
                      "/" +
                      selectedCity +
                      "/" +
                      result +
                      "/" +
                      result2
                }
              >
                <div
                  className="makeStyles-stats-98"
                  style={{ color: "#43a047" }}
                >
                  View More
                </div>
              </a>
            </div>
            <CardBody>
              {Object.keys(graph_data).length > 0 && (
                <Table>
                  <TableBody>
                    {graph_data.Covid_safety.dataList.map((row, index) => {
                      if (row.Type === "Temperature alert") {
                        return (
                          <TableRow
                            key={row.age}
                            className={classes.tableBodyRow}
                          >
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Type}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Count}
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "right",
                              }}
                            >
                              <a
                                href={
                                  "http://10.11.0.4:8118/tickets/filter/?f=1&ds=" +
                                  result3 +
                                  "&de=" +
                                  result4 +
                                  "&fs=Temperature&gp=5f9fc190afc8700011a17f9c"
                                }
                              >
                                View
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow
                            key={row.age}
                            className={classes.tableBodyRow}
                          >
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Type}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "left",
                              }}
                            >
                              {row.Count}
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#3C4858",
                                fontSize: "0.8125rem",
                                textAlign: "right",
                              }}
                            >
                              <a
                                href={
                                  "/admin/detail/threats/All/" +
                                  row.Type.replace("alert", "").replace(
                                    /\s+/,
                                    ""
                                  ) +
                                  "/Covid_safety/" +
                                  selectedState +
                                  "/" +
                                  selectedCity +
                                  "/" +
                                  result +
                                  "/" +
                                  result2
                                }
                              >
                                View
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <img
        src={bg}
        alt=""
        style={{ width: "100%", height: "15vw", objectFit: "cover" }}
      /> */}
    </div>
  );
}
