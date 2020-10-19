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
import {
  getbranchDetails,
  postBranchDetails,
  getbranchReports,
  postBranchReports,
  dashboardCount,
} from "../../middleware/actions";

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

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const branches = useSelector((state) => state.branches);
  const dashboard_Count = useSelector((state) => state.dashboard_Count);
  const postBranchResponse = useSelector((state) => state.postBranchResponse);
  const branchReport = useSelector((state) => state.branchReport);
  const dispatch = useDispatch();
  let [response, setResponse] = useState("");
  useEffect(() => {
    dispatch(getbranchDetails());
    // console.log(branches);
    // return () => {
    //   console.log("cleared");
    // };
  }, []);
  const data = [
    {
      Branch: "string",
      Camera_count: 10,
      People_count: 20,
      Alert_count: 30,
      Image_link:
        "https://res.cloudinary.com/dubm0zyx2/image/upload/v1570085339/13497809_1755248361385609_3709209667542308841_o_euhljv.jpg",
      Date: "string",
    },
    {
      Branch: "string",
      Camera_count: 30,
      People_count: 50,
      Alert_count: 70,
      Image_link:
        "https://res.cloudinary.com/dubm0zyx2/image/upload/v1570085339/13497809_1755248361385609_3709209667542308841_o_euhljv.jpg",
      Date: "string",
    },
    {
      Branch: "string",
      Camera_count: 20,
      People_count: 20,
      Alert_count: 30,
      Image_link:
        "https://res.cloudinary.com/dubm0zyx2/image/upload/v1570085339/13497809_1755248361385609_3709209667542308841_o_euhljv.jpg",
      Date: "string",
    },
  ];
  return (
    <GridContainer>
      {console.log(branches)}
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
              // tableData={[
              //   ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
              //   ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              //   ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
              //   ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
              //   ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
              //   ["Mason Porter", "Chile", "Gloucester", "$78,615"],
              // ]}
              tableData={branches}
            />
          </CardBody>
        </Card>
      </GridItem>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
    </GridContainer>
  );
}
