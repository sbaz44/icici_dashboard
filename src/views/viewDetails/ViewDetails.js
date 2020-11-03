import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table2 from "components/Table2/Table2.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import smart from "../../assets/img/smartAI.png";
import CardBody from "components/Card/CardBody.js";
import { viewDetail } from "../../middleware/actions";
import Pagination from "components/pagination/Pagination";
import $ from "jquery";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

let currentPage = 1;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ViewDetails(props) {
  const classes = useStyles();

  const [typee, setType] = React.useState("");

  const handleChange = (event) => {
    setType(event.target.value);
    dispatch(
      viewDetail(
        props.match.params.branch,
        event.target.value,
        props.match.params.subtype,
        props.match.params.date,
        "",
        currentPage
      )
    );
  };
  const viewBranchDetail = useSelector((state) => state.viewBranchDetail);

  const dispatch = useDispatch();
  const pagination = (name) => {
    if (name === "increment") {
      currentPage += 1;
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          props.match.params.subtype,
          props.match.params.date,
          "",
          currentPage
        )
      );
    } else if (name === "decrement") {
      currentPage -= 1;
      // this.getData(currentPage);
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          props.match.params.subtype,
          props.match.params.date,
          "",
          currentPage
        )
      );
    }
  };
  const threats = {
    External_threats: "External Threat Alerts",
    Business_insights: "Business Insights Alerts",
    Internal_compliance: "Internal Compliance Alerts",
    Covid_safety: "Covid Safety Alerts",
  };
  useEffect(() => {
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    currentPage = 1;
    setType(props.match.params.type);
    // if (props.match.params.subtype == "null") {
    //   alert('insidne')
    //   dispatch(getbranchDetails(props.match.params.date));
    // }
    // else if (props.match.params.subtype != "null") {

    dispatch(
      viewDetail(
        props.match.params.branch,
        props.match.params.type,
        props.match.params.subtype,
        props.match.params.date,
        "",
        currentPage
      )
    );
    // }
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
            {props.match.params.branch} Branch
          </p>
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typee}
            onChange={handleChange}
          >
            <MenuItem value={"External_threats"}>External Threats</MenuItem>
            <MenuItem value={"Business_insights"}>Business Insights</MenuItem>
            <MenuItem value={"Internal_compliance"}>
              Internal Compliance
            </MenuItem>
            <MenuItem value={"Covid_safety"}>Covid Safety</MenuItem>
          </Select>
        </FormControl>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {props.match.params.type != "null" ? threats[typee] : "Alerts"}
              </h4>
              {/* <p className={classes.cardCategoryWhite}>List of all branches</p> */}
            </CardHeader>
            <CardBody>
              <Table2
                tableHeaderColor="primary"
                tableHead={[
                  "Type",
                  "Message",
                  "Date",
                  "Time",
                  "Camera ID",
                  "Image",
                ]}
                tableData={viewBranchDetail.Data}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {viewBranchDetail.count > 9 && (
        <Pagination
          currentPage={currentPage}
          lastPage={Math.ceil(viewBranchDetail.count / 10)}
          nextPage={() => pagination("increment")}
          prevPage={() => pagination("decrement")}
        />
      )}
    </div>
  );
}
