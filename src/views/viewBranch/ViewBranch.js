import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import "./viewBranch.css";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Whatshot from "@material-ui/icons/Whatshot";
import Accessibility from "@material-ui/icons/Accessibility";
import DriveEta from "@material-ui/icons/DriveEta";
import ErrorSharp from "@material-ui/icons/ErrorSharp";
import TransferWithinAStationSharp from "@material-ui/icons/TransferWithinAStationSharp";
import AddAlertSharp from "@material-ui/icons/AddAlertSharp";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Switch from "@material-ui/core/Switch";
import ReactSpeedometer from "react-d3-speedometer";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useSelector, useDispatch } from "react-redux";
import { bugs, website, server } from "variables/general.js";
import CardAvatar from "components/Card/CardAvatar";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { format } from "date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import { URL } from "../../middleware/actions";
import $ from "jquery";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import smart from "../../assets/img/smartAI.png";

import Dialog from "@material-ui/core/Dialog";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import avatar from "assets/img/dummy.png";
import { FormControlLabel } from "@material-ui/core";
var result = "";
var result2 = "";
const useStyles = makeStyles(styles);

// const useStyless = makeStyles(styless);
export default function ViewBranch(props) {
  const classes = useStyles();
  // const classess = useStyless();
  const branches = useSelector((state) => state.branches);
  // let data = [];
  // data = useSelector((state) => state.viewBranchDetail);
  const contactData = useSelector((state) => state.viewBranchDetail.Contact);
  const graph_data = useSelector((state) => state.graph_data);
  const postBranchResponse = useSelector((state) => state.postBranchResponse);
  const branchReport = useSelector((state) => state.branchReport);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const handleClickOpen = (link) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [localData, setLocalData] = React.useState({});
  const handleDateChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setSelectedDate(date);
    // props.match.params.branch
    // dispatch(viewBranchDetail(props.match.params.branch, result));
    getData(props.match.params.branch, result);
  };

  const [state, setState] = React.useState({
    checkedB: true,
  });

  const getData = (payload, payload2) => {
    setisLoading(true);
    axios
      .post(URL + "/branch/" + payload + "/dashboard?Date=" + payload2)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // var todaysDate = new Date()
    // result = format(todaysDate, 'dd-MM-yyyy')

    result = props.match.params.date;

    var chunks = result.split("-");
    result2 = chunks[1] + "/" + chunks[0] + "/" + chunks[2];
    var datee = props.match.params.date;
    var newdate = datee.split("-").reverse().join("-");
    setSelectedDate(newdate);
    // dispatch(viewBranchDetail(props.match.params.branch, ""));
    getData(props.match.params.branch, datee);
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    let obj = JSON.parse(localStorage.getItem("smData"));
    setLocalData(obj);
    // this.setState({ ProfilePic: obj.image, Name: obj.name });
    // return () => {
    //   console.log("cleared");
    // };
  }, []);

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
      fontWeight: "bold",
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
          fontWeight: "bold",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
        fontWeight: "bold",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        disabled
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  return (
    <div className="viewBranch">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <img src={localData.image} style={{ padding: "1vw" }} />
      </Dialog>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40vw",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <React.Fragment>
          <div id="header-container">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={smart}
                  style={{
                    width: "2.8vw",
                    height: "2.8vw",
                    objectFit: "contain",
                  }}
                />
                <p
                  style={{
                    fontSize: "1.5vw",
                    marginLeft: "0.5vw",
                    fontWeight: "bold",
                    paddingTop: "0.5vw",
                  }}
                >
                  {props.match.params.branch} Branch
                </p>
              </div>

              {/* <p
                  style={{
                    fontSize: "1.5vw",
                    marginLeft: "0.5vw",
                    fontWeight: "bold",
                    paddingTop: "0.5vw",
                  }}
                >
                  {props.match.params.branch} Branch
              </p> */}
              {/* <KeyboardDatePicker
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
                                    'aria-label': 'change date',
                                }}
                            /> */}
            </MuiPickersUtilsProvider>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card onClick={() => alert("hi")}>
                <p
                  className={classes.cardCategory}
                  style={{
                    fontWeight: "bold",
                    color: "#3C4858",
                    paddingTop: "2px",
                    textAlign: "center",
                  }}
                >
                  Branch Open Time: {localData.open}
                </p>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <p
                  className={classes.cardCategory}
                  style={{
                    fontWeight: "bold",
                    color: "#3C4858",
                    paddingTop: "2px",
                    textAlign: "center",
                  }}
                >
                  Branch Close Time: {localData.close}
                </p>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <p
                  className={classes.cardCategory}
                  style={{
                    fontWeight: "bold",
                    color: "#3C4858",
                    paddingTop: "2px",
                    textAlign: "center",
                  }}
                >
                  Vault Door Open Time: {data.Vault_door_open_time}
                </p>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <p
                  className={classes.cardCategory}
                  style={{
                    fontWeight: "bold",
                    color: "#3C4858",
                    paddingTop: "2px",
                    textAlign: "center",
                  }}
                >
                  Vault Door Close Time: {data.Vault_door_close_time}
                </p>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Whatshot />
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
                    href={
                      "/admin/view/" +
                      props.match.params.branch +
                      "/External_threat/fire/" +
                      result
                    }
                  >
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

            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    {/* <ErrorSharp /> */}
                    <span
                      class="iconify"
                      data-icon="whh:gun"
                      data-inline="false"
                    ></span>
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
                      "/admin/view/" +
                      props.match.params.branch +
                      "/External_threat/weapon/" +
                      result
                    }
                  >
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
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="rose" stats icon>
                  <CardIcon color="rose">
                    <TransferWithinAStationSharp />
                  </CardIcon>
                  <p
                    className={classes.cardCategory}
                    style={{ fontWeight: "bold", color: "#3C4858" }}
                  >
                    Trespassing Alert
                  </p>
                  <h3 className={classes.cardTitle}>{data.Trespassing}</h3>
                </CardHeader>
                <CardFooter stats>
                  <a
                    href={
                      "/admin/view/" +
                      props.match.params.branch +
                      "/External_threat/trespassing/" +
                      result
                    }
                  >
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

            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    {/* <DriveEta /> */}
                    <span
                      class="iconify"
                      data-icon="mdi-thermometer"
                      data-inline="false"
                    ></span>
                  </CardIcon>
                  <p
                    className={classes.cardCategory}
                    style={{ fontWeight: "bold", color: "#3C4858" }}
                  >
                    Temperature Alert
                  </p>
                  {/* <h3 className={classes.cardTitle}>{data.High_temperature}</h3> */}
                </CardHeader>
                <CardFooter stats>
                  {/* <a
                    href={
                      "http://192.168.1.6:8118/tickets/filter/?f=1&fs=" +
                      props.match.params.branch +
                      "&gp=5f8ae9bb5aa68a0011c36907"
                    }
                    target="_blank"
                  > */}
                  <a
                    href={
                      "http://10.11.0.4:8118/tickets/filter/?f=1&ds=" +
                      result2 +
                      "&de=" +
                      result2 +
                      "&fs=High%20temperature%20" +
                      props.match.params.branch +
                      "&gp=5f9fc190afc8700011a17f9c"
                    }
                    target="_blank"
                  >
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

            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <AddAlertSharp />
                  </CardIcon>
                  <p
                    className={classes.cardCategory}
                    style={{ fontWeight: "bold", color: "#3C4858" }}
                  >
                    Total Alert
                  </p>
                  <h3 className={classes.cardTitle}>{data.Total_alert}</h3>
                </CardHeader>
                <CardFooter stats>
                  <a
                    href={
                      "/admin/view/" +
                      props.match.params.branch +
                      "/null/null/" +
                      result
                    }
                  >
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

            <GridItem xs={12} sm={6} md={3}>
              <Card className="adjust">
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <DriveEta />
                  </CardIcon>
                  <p
                    className={classes.cardCategory}
                    style={{ fontWeight: "bold", color: "#3C4858" }}
                  >
                    <span
                      style={{
                        color: "red",
                        fontSize: "1vw",
                        marginRight: "0.5vw",
                      }}
                    >
                      !
                    </span>
                    Vehicle Count
                  </p>
                  <h3 className={classes.cardTitle}>{data.Vehicle_count}</h3>
                </CardHeader>
                <CardFooter stats></CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Accessibility />
                  </CardIcon>
                  <p
                    className={classes.cardCategory}
                    style={{ fontWeight: "bold", color: "#3C4858" }}
                  >
                    People Count
                  </p>
                  <h3 className={classes.cardTitle}>{data.People_count}</h3>
                </CardHeader>
                <CardFooter stats>
                  {/* <a
                      href={
                        "/admin/view/" +
                        props.match.params.branch +
                        "/External_threat/fire/" +
                        result
                      }
                    >
                      <div
                        className={classes.stats}
                        style={{ color: "#43a047", textAlign: "center" }}
                      >
                      View More
                    </div>
                    </a> */}
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="primary" stats icon>
                  {/* <CardIcon color="primary">
                                <AddAlertSharp />
                            </CardIcon> */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      flexDirection: "column",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={data.CameraStatus}
                          name="checkedB"
                        />
                      }
                      label="Camera Status"
                    />
                    <FormControlLabel
                      control={
                        <IOSSwitch checked={data.DvrStatus} name="checkedB" />
                      }
                      label="DVR Status"
                    />
                  </div>

                  {/* <h3 className={classes.cardTitle}>
                                {data.Total_alert}
                            </h3> */}
                </CardHeader>
                <CardFooter stats></CardFooter>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <div style={{ width: "100%", height: "16vw" }}>
                  <ReactSpeedometer
                    paddingVertical={10}
                    fluidWidth={true}
                    height={200}
                    needleHeightRatio={0.7}
                    value={
                      Object.keys(data).length > 0 ? data.Covid_safety[0] : 0
                    }
                    customSegmentStops={[0, 5, 10, 20]}
                    maxValue={20}
                    segmentColors={["#0B8500", "#fb8c00", "#FF4433"]}
                    // currentValueText="Covid Safety"
                    currentValueText={
                      Object.keys(data).length > 0
                        ? data.Covid_safety[0] <= 5
                          ? "Covid Safety: Good"
                          : data.Covid_safety[0] <= 10 &&
                            data.Covid_safety[0] > 5
                          ? "Covid Safety: Average"
                          : "Covid Safety: Critical"
                        : ""
                    }
                    customSegmentLabels={[
                      {
                        text: "Normal",
                        position: "INSIDE",
                        color: "white",
                      },
                      {
                        text: "Medium",
                        position: "INSIDE",
                        color: "white",
                      },
                      {
                        text: "High",
                        position: "INSIDE",
                        color: "white",
                      },
                    ]}
                    ringWidth={47}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    needleColor={"black"}
                    textColor={"black"}
                  />
                </div>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.3vw",
                    fontWeight: "bold",
                  }}
                >
                  {Object.keys(data).length > 0 && data.Covid_safety[1]}
                </div>
                <CardFooter stats>
                  <a
                    href={
                      "/admin/view/" +
                      props.match.params.branch +
                      "/Covid_safety/null/" +
                      result
                    }
                  >
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
            {localData.type == "Branch" && (
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <div style={{ width: "100%", height: "16vw" }}>
                    <ReactSpeedometer
                      paddingVertical={10}
                      fluidWidth={true}
                      height={200}
                      needleHeightRatio={0.7}
                      value={
                        Object.keys(data).length > 0
                          ? data.ATM_performance[0]
                          : 0
                      }
                      customSegmentStops={[0, 5, 10, 20]}
                      maxValue={20}
                      segmentColors={["#0B8500", "#fb8c00", "#FF4433"]}
                      currentValueText="ATM Lobby Performance"
                      currentValueText={
                        Object.keys(data).length > 0
                          ? data.ATM_performance[0] <= 5
                            ? "ATM Lobby Performance: Good"
                            : data.ATM_performance[0] <= 10 &&
                              data.ATM_performance[0] > 5
                            ? "ATM Lobby Performance: Average"
                            : "ATM Lobby Performance: Critical"
                          : ""
                      }
                      customSegmentLabels={[
                        {
                          text: "Normal",
                          position: "INSIDE",
                          color: "white",
                        },
                        {
                          text: "Medium",
                          position: "INSIDE",
                          color: "white",
                        },
                        {
                          text: "High",
                          position: "INSIDE",
                          color: "white",
                        },
                      ]}
                      ringWidth={47}
                      needleTransitionDuration={3333}
                      needleTransition="easeElastic"
                      needleColor={"black"}
                      textColor={"black"}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "1.3vw",
                      fontWeight: "bold",
                    }}
                  >
                    {Object.keys(data).length > 0 && data.ATM_performance[1]}
                  </div>
                  <CardFooter stats>
                    <a
                      href={
                        "/admin/view/" +
                        props.match.params.branch +
                        "/null/atm/" +
                        result
                      }
                    >
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
            )}

            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <div style={{ width: "100%", height: "16vw" }}>
                  <ReactSpeedometer
                    paddingVertical={10}
                    fluidWidth={true}
                    height={200}
                    needleHeightRatio={0.7}
                    value={
                      Object.keys(data).length > 0
                        ? data.Branch_performance[0]
                        : 0
                    }
                    currentValueText={
                      Object.keys(data).length > 0
                        ? data.Branch_performance[0] <= 5
                          ? "Branch Lobby Performance: Good"
                          : data.Branch_performance[0] <= 10 &&
                            data.Branch_performance[0] > 5
                          ? "Branch Lobby Performance: Average"
                          : "Branch Lobby Performance: Critical"
                        : ""
                    }
                    customSegmentStops={[0, 5, 10, 20]}
                    maxValue={20}
                    segmentColors={["#0B8500", "#fb8c00", "#FF4433"]}
                    // currentValueText="Branch Lobby Performance"
                    customSegmentLabels={[
                      {
                        text: "Normal",
                        position: "INSIDE",
                        color: "white",
                      },
                      {
                        text: "Medium",
                        position: "INSIDE",
                        color: "white",
                      },
                      {
                        text: "High",
                        position: "INSIDE",
                        color: "white",
                      },
                    ]}
                    ringWidth={47}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    needleColor={"black"}
                    textColor={"black"}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.3vw",
                    fontWeight: "bold",
                  }}
                >
                  {Object.keys(data).length > 0 && data.Branch_performance[1]}
                </div>
                <CardFooter stats>
                  <a
                    href={
                      "/admin/view/" +
                      props.match.params.branch +
                      "/null/branch/" +
                      result
                    }
                  >
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

            {localData.type != "LCB" && (
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <div style={{ width: "100%", height: "16vw" }}>
                    <ReactSpeedometer
                      paddingVertical={10}
                      fluidWidth={true}
                      height={200}
                      needleHeightRatio={0.7}
                      value={data.UPS_DG}
                      customSegmentStops={[0, 2, 4]}
                      maxValue={4}
                      segmentColors={["#0B8500", "#FF4433"]}
                      currentValueText="UPS and DG Health Check"
                      customSegmentLabels={[
                        {
                          text: "ON",
                          position: "INSIDE",
                          color: "white",
                        },
                        {
                          text: "OFF",
                          position: "INSIDE",
                          color: "white",
                        },
                      ]}
                      ringWidth={47}
                      needleTransitionDuration={3333}
                      needleTransition="easeElastic"
                      needleColor={"black"}
                      textColor={"black"}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "1.3vw",
                      fontWeight: "bold",
                    }}
                  >
                    Status: {data.UPS_DG == 1 ? "Good" : "Bad"}
                  </div>
                  <CardFooter stats>
                    {/* <a href={"/admin/view/" + props.match.params.branch + "/Internal_compliance/ups/" + result}>
                                        <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                  View More
                </div>
                                    </a> */}
                  </CardFooter>
                </Card>
              </GridItem>
            )}

            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <div style={{ width: "100%", height: "16vw" }}>
                  <ReactSpeedometer
                    paddingVertical={10}
                    fluidWidth={true}
                    height={200}
                    needleHeightRatio={0.7}
                    value={
                      Object.keys(data).length > 0
                        ? data.Average_waiting_time[0]
                        : 0
                    }
                    customSegmentStops={[0, 20, 40, 60]}
                    maxValue={60}
                    segmentColors={["#0B8500", "#fb8c00", "#FF4433"]}
                    currentValueText={
                      Object.keys(data).length > 0
                        ? data.Average_waiting_time[0] <= 20
                          ? "Average Waiting Time: Good"
                          : data.Average_waiting_time[0] <= 40 &&
                            data.Average_waiting_time[0] > 20
                          ? "Average Waiting Time: Average"
                          : "Average Waiting Time: Critical"
                        : ""
                    }
                    customSegmentLabels={[
                      {
                        text: "Normal",
                        position: "INSIDE",
                        color: "white",
                      },
                      {
                        text: "Medium",
                        position: "INSIDE",
                        color: "white",
                      },
                      {
                        text: "High",
                        position: "INSIDE",
                        color: "white",
                      },
                    ]}
                    ringWidth={47}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    needleColor={"black"}
                    textColor={"black"}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.3vw",
                    fontWeight: "bold",
                  }}
                >
                  {Object.keys(data).length > 0 && data.Average_waiting_time[1]}{" "}
                  mins
                </div>
                <CardFooter stats>
                  {/* <a href="/admin/branch">
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                  View More
                </div>
                            </a> */}
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <img
                    src={
                      data.Manager_image == null ? avatar : data.Manager_image
                    }
                    alt="..."
                  />
                </CardAvatar>
                <CardBody profile>
                  <h4>{data.Manager_name} </h4>
                  <h4>{data.Manager_contact} </h4>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </React.Fragment>
      )}
      <React.Fragment></React.Fragment>

      {/* 
            <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                    <Card >

                        
                    </Card>
                </GridItem>
            </GridContainer> */}
    </div>
  );
}
