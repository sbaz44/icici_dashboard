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
import TextField from "@material-ui/core/TextField";
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

  const [category, setCategory] = React.useState("null");
  const [search, setSearch] = React.useState("null");

  const handleChange = (event) => {
    currentPage = 1;
    setCategory(event.target.value);
    dispatch(
      viewDetail(
        props.match.params.branch,
        props.match.params.type,
        props.match.params.subtype,
        props.match.params.date,
        "",
        1,
        event.target.value
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
          search,
          props.match.params.date,
          "",
          currentPage,
          category
        )
      );
    } else if (name === "decrement") {
      currentPage -= 1;
      // this.getData(currentPage);
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          search,
          props.match.params.date,
          "",
          currentPage,
          category
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
  const handleChangee = (event) => {
    setSearch(event.target.value);
    if (search.length == 0) {
      setSearch("null");
    }
  };

  const postSearch = () => {
    currentPage = 1;
    if (search.length === 0) {
      setSearch("null");
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          props.match.params.subtype,
          props.match.params.date,
          "",
          1,
          category
        )
      );
    } else {
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          search,
          props.match.params.date,
          "",
          1,
          category
        )
      );
    }
  };
  useEffect(() => {
    $("#root").find("header").hide();
    $("#root").find(".makeStyles-content-3").css("margin-top", "0");
    $("#root").find(".makeStyles-content-3").css("padding", "0px 15px");
    currentPage = 1;
    if (
      props.match.params.type == "null" &&
      props.match.params.subtype == "null"
    ) {
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          search,
          props.match.params.date,
          "",
          currentPage,
          category
        )
      );
    } else {
      setSearch(props.match.params.subtype);
      dispatch(
        viewDetail(
          props.match.params.branch,
          props.match.params.type,
          props.match.params.subtype,
          props.match.params.date,
          "",
          1,
          category
        )
      );
    }
    // else if (search != "null") {

    // dispatch(
    //   viewDetail(
    //     props.match.params.branch,
    //     props.match.params.type,
    //     search,
    //     props.match.params.date,
    //     "",
    //     currentPage
    //   )
    // );
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
        {props.match.params.type == "null" && (
          <TextField
            label="Search"
            onChange={handleChangee}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                postSearch();
              }
            }}
          />
        )}

        {props.match.params.type == "null" && (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleChange}
            >
              <MenuItem value={"null"}>None</MenuItem>
              <MenuItem value={"Trending"}>Trending</MenuItem>
              <MenuItem value={"Alert"}>Alert</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {props.match.params.type != "null"
                  ? threats[category]
                  : "Alerts"}
              </h4>
              {/* <p className={classes.cardCategoryWhite}>List of all branches</p> */}
            </CardHeader>
            <CardBody>
              <Table2
                tableHeaderColor="primary"
                tableHead={[
                  "Type",
                  "Message",
                  "Category",
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
