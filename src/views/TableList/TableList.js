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
import { getbranchDetails } from "../../middleware/actions";
import Select from "@material-ui/core/Select";
import smart from "../../assets/img/smartAI.png";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import Pagination from "components/pagination/Pagination";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import red from "../../assets/img/red.png";
import green from "../../assets/img/green.png";
import gray from "../../assets/img/gray.png";
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
const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function TableList() {
  const classes = useStyles();
  const classes2 = useStyles2();

  const branches = useSelector((state) => state.branches);

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedState, setselectedState] = useState("null");
  const [selectedCity, setselectedCity] = useState("null");
  const handleDateChange = (date) => {
    result = format(date, "dd-MM-yyyy");
    setSelectedDate(date);
    dispatch(getbranchDetails(result, selectedState, selectedCity));
  };
  const handleCityChange = (event) => {
    setselectedState(event.target.value);
    dispatch(getbranchDetails(result, event.target.value, selectedCity));
  };

  const handleBranchChange = (event) => {
    setselectedCity(event.target.value);
    dispatch(getbranchDetails(result, selectedState, event.target.value));
  };
  const Maharashtra = ["Mumbai", "Nagpur", "Pune", "dummy"];
  const Haryana = ["Padla"];
  const Delhi = ["Dwarka", "Najafgarh", "TagoreGarden"];
  const MadhyaPradesha = ["Manawar"];

  useEffect(() => {
    var date = new Date();
    result = format(date, "dd-MM-yyyy");
    dispatch(getbranchDetails("", "", ""));
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
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

          <div>
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
                <MenuItem value={"Madhya Pradesha"}>Madhya Pradesha</MenuItem>
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
                {selectedState === "Madhya Pradesha" &&
                  MadhyaPradesha.map((item, index) => {
                    return <MenuItem value={item}>{item}</MenuItem>;
                  })}
              </Select>
            </FormControl>
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
                  "Compliance Status",
                  "Branch",
                  "Camera Count",
                  "People Count",
                  "Alert Count",
                  "Open Time",
                  "Close Time",
                  // "Image",
                  "Date",
                  "View",
                ]}
                date={result}
                tableData={branches}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <div style={{ display: 'flex', marginTop: "05px", marginBottom: "20px", justifyContent: 'center' }}>
        <img src={green} width="12px" style={{ objectFit: 'contain' }} />
        <p className={classes.cardCategory}
          style={{ fontWeight: "bold", fontSize: '10px', color: "#3C4858", textAlign: 'center', paddingTop: 0, marginRight: "10px", marginLeft: "5px" }}>Followed</p>
        <img src={red} width="12px" style={{ objectFit: 'contain' }} />
        <p className={classes.cardCategory}
          style={{ fontWeight: "bold", fontSize: '10px', color: "#3C4858", textAlign: 'center', paddingTop: 0, marginRight: "10px", marginLeft: "5px" }}>Not Followed</p>
        <img src={gray} width="12px" style={{ objectFit: 'contain' }} />
        <p className={classes.cardCategory}
          style={{ fontWeight: "bold", fontSize: '10px', color: "#3C4858", textAlign: 'center', paddingTop: 0, marginRight: "10px", marginLeft: "5px" }}>No Data</p>
      </div>
      {/* <Pagination currentPage={1} lastPage={Math.ceil(12 / 10)} /> */}
    </div>
  );
}
