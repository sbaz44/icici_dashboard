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
const useStyles = makeStyles(styles);

export default function Type1_2(props) {
  const classes = useStyles();
  const data = useSelector((state) => state.threatData);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-10-24T00:00:00")
  );
  console.log(props.match.params.date + "T00:00:00");
  const handleDateChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setSelectedDate(date);
    dispatch(getThreatDetail(props.match.params.subtype, result));
  };
  //   let [response, setResponse] = useState("");

  useEffect(() => {
    // var todaysDate = new Date();
    // result = format(todaysDate, "dd-MM-yyyy");

    var datee = props.match.params.date;
    var newdate = datee.split("-").reverse().join("-");
    setSelectedDate(newdate);

    result = props.match.params.date;
    dispatch(getThreatDetail(props.match.params.subtype, result));
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
            format="dd-MM-yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Search by Date"
            value={selectedDate}
            onChange={handleDateChange}
            // defaultValue={props.match.params.date}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            helperText={""}
          />
        </MuiPickersUtilsProvider>
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
                        "/admin/view/" +
                        Object.keys(item) +
                        "/" +
                        props.match.params.type +
                        "/" +
                        props.match.params.subtype +
                        "/" +
                        result
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
