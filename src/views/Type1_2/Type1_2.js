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
import { getThreatDetail } from "../../middleware/actions";
import $ from "jquery";

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
const useStyles = makeStyles(styles);

export default function Type1_2(props) {
  const classes = useStyles();
  const data = useSelector((state) => state.threatData);
  const dispatch = useDispatch();

  const [selectedToDate, setToDate] = React.useState(new Date());
  const [selectedFromDate, setFromDate] = React.useState(new Date());

  const handleFromChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setFromDate(date);
    var datee = new Date(date);
    datee.setDate(datee.getDate() + 7);
    result2 = format(datee, "dd-MM-yyyy");
    setToDate(datee);
    dispatch(
      getThreatDetail(
        props.match.params.type,
        props.match.params.subtype,
        props.match.params.state,
        props.match.params.city,
        result,
        result2
      )
    );
  };

  const handleToChange = (date) => {
    result2 = format(date, "dd-MM-yyyy");
    setToDate(date);
    var datee = new Date(date);
    datee.setDate(datee.getDate() - 7);
    result = format(datee, "dd-MM-yyyy");
    setFromDate(datee);
    dispatch(
      getThreatDetail(
        props.match.params.type,
        props.match.params.subtype,
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

    var datee = props.match.params.date;
    var datee2 = props.match.params.date2;
    var newdate = datee.split("-").reverse().join("-");
    var newdate2 = datee2.split("-").reverse().join("-");
    setFromDate(newdate);
    setToDate(newdate2);
    result = props.match.params.date;
    result2 = props.match.params.date2;

    // dispatch(getThreatDetail(props.match.params.subtype, result, props.match.params.type));
    dispatch(
      getThreatDetail(
        props.match.params.type,
        props.match.params.subtype,
        props.match.params.state,
        props.match.params.city,
        props.match.params.date,
        props.match.params.date2
      )
    );
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    console.log("data");
    console.log(data);
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
            Branches
          </p>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              // disableFuture
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              // disableFuture
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
      <GridContainer>
        {data.Data &&
          data.Data.map((item, index) => {
            return (
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
                      {Object.keys(item)}
                    </p>
                    <h3 className={classes.cardTitle}>{Object.values(item)}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <a
                      href={
                        "/admin/detail/threats/" +
                        Object.keys(item) +
                        "/" +
                        props.match.params.type +
                        "/" +
                        props.match.params.subtype +
                        "/" +
                        props.match.params.state +
                        "/" +
                        props.match.params.city +
                        "/" +
                        result +
                        "/" +
                        result2
                      }
                    >
                      <div
                        className={classes.stats}
                        style={{ color: "#43a047" }}
                      >
                        View More
                      </div>
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })}
      </GridContainer>
    </div>
  );
}
