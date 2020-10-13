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
import {
  getbranchDetails,
  postBranchDetails,
  getbranchReports,
  postBranchReports,
  dashboardCount,
  graphData,
} from "../../middleware/actions";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const branches = useSelector((state) => state.branches);
  const dashboard_Count = useSelector((state) => state.dashboard_Count);
  const graph_data = useSelector((state) => state.graph_data);
  const postBranchResponse = useSelector((state) => state.postBranchResponse);
  const branchReport = useSelector((state) => state.branchReport);
  const dispatch = useDispatch();
  let [response, setResponse] = useState("");
  let [data, setData] = useState({
    Total_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[478, 8033, 1238, 14776, 0, 0, 120]],
    },
    Social_distancing_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[43, 97, 526, 0, 0, 0, 0]],
    },
    Teller_missing_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[38, 12, 181, 2, 0, 0, 104]],
    },
    Camera_tampering_alerts: {
      labels: ["W", "T", "F", "S", "S", "M", "T"],
      series: [[245, 7729, 1, 14659, 0, 0, 8]],
    },
  });
  useEffect(() => {
    dispatch(dashboardCount());
    dispatch(graphData());
    console.log(graph_data);
    // return () => {
    //   console.log("cleared");
    // };
  }, []);

  return (
    <div>
      {console.log(graph_data)}
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Alerts</p>
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
              <p className={classes.cardCategory}>People</p>
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
              <p className={classes.cardCategory}>Branches</p>
              <h3 className={classes.cardTitle}>
                {dashboard_Count.Branch_count}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <a href="/admin/table">
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Total_alerts}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total Alerts</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Social_distancing_alerts}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Social Distancing Alerts</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Teller_missing_alerts}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Teller Missing Alerts</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={graph_data.Camera_tampering_alerts}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Camera Tampering Alerts</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
