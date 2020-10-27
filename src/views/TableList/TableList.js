import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import $ from "jquery";
import {
  getbranchDetails,

} from "../../middleware/actions";
import smart from "../../assets/img/smartAI.png";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};
var result = "";

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const branches = useSelector((state) => state.branches);

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date()
  );
  const handleDateChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setSelectedDate(date);
    dispatch(getbranchDetails(result));
    // dispatch(getThreatDetail(props.match.params.subtype, result));
  };
  useEffect(() => {
    var date = new Date();
    result = format(date, "dd-MM-yyyy");
    dispatch(getbranchDetails(""));
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    // console.log(branches);
    // return () => {
    //   console.log("cleared");
    // };
  }, []);

  return (
    <div>
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
              Branches
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Branch</h4>
              <p className={classes.cardCategoryWhite}>List of all branches</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Branch",
                  "Camera Count",
                  "People Count",
                  "Alert Count",
                  "Open Time",
                  "Close Time",
                  "Image",
                  "Date",
                  "View"
                ]}
                date={result}
                tableData={branches}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
