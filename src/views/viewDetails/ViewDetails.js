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
import CardBody from "components/Card/CardBody.js";
import {
  getbranchDetails,
  postBranchDetails,
  getbranchReports,
  postBranchReports,
  dashboardCount,
  viewDetail
} from "../../middleware/actions";
import Pagination from "components/pagination/Pagination";
let currentPage = 1;
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

export default function ViewDetails(props) {
  const classes = useStyles();
  const branches = useSelector((state) => state.branches);
  const viewBranchDetail = useSelector((state) => state.viewBranchDetail);

  const dispatch = useDispatch();
  let [response, setResponse] = useState("");
  const pagination = (name) => {
    if (name === "increment") {
      currentPage += 1;
      dispatch(viewDetail(props.match.params.branch, props.match.params.type, props.match.params.subtype, props.match.params.date, currentPage))
    } else if (name === "decrement") {
      currentPage -= 1;
      // this.getData(currentPage);
      dispatch(viewDetail(props.match.params.branch, props.match.params.type, props.match.params.subtype, props.match.params.date, currentPage))
    }
  };
  useEffect(() => {
    currentPage = 1;
    dispatch(getbranchDetails());
    dispatch(viewDetail(props.match.params.branch, props.match.params.type, props.match.params.subtype, props.match.params.date, currentPage));
    // console.log(branches);
    // return () => {
    //   console.log("cleared");
    // };
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{props.match.params.branch ? "All" : props.match.params.branch} Branch</h4>
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
      {viewBranchDetail.count > 9 && <Pagination currentPage={currentPage}
        lastPage={Math.ceil(
          viewBranchDetail.count / 10
        )}

        nextPage={() => pagination("increment")}
        prevPage={() => pagination("decrement")} />}

    </div>
  );
}
