import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import './viewBranch.css'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
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
import Switch from '@material-ui/core/Switch';
import ReactSpeedometer from "react-d3-speedometer"
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
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import $ from 'jquery';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {

    dashboardCount,
    graphData,
    viewBranchDetail
} from "../../middleware/actions";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
} from "variables/charts.js";
import Dialog from '@material-ui/core/Dialog';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import avatar from "assets/img/dummy.png";
import { FormControlLabel } from "@material-ui/core";
var result = "";
const useStyles = makeStyles(styles);
// const styless = {
//     cardCategoryWhite: {
//         color: "rgba(255,255,255,.62)",
//         margin: "0",
//         fontSize: "14px",
//         marginTop: "0",
//         marginBottom: "0",
//     },
//     cardTitleWhite: {
//         color: "#FFFFFF",
//         marginTop: "0px",
//         minHeight: "auto",
//         fontWeight: "300",
//         fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//         marginBottom: "3px",
//         textDecoration: "none",
//     },
// };

// const useStyless = makeStyles(styless);
export default function ViewBranch(props) {
    const classes = useStyles();
    // const classess = useStyless();
    const branches = useSelector((state) => state.branches);
    const data = useSelector((state) => state.viewBranchDetail);
    const contactData = useSelector((state) => state.viewBranchDetail.Contact);
    const graph_data = useSelector((state) => state.graph_data);
    const postBranchResponse = useSelector((state) => state.postBranchResponse);
    const branchReport = useSelector((state) => state.branchReport);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (link) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [localData, setLocalData] = React.useState({});
    const handleDateChange = (date) => {
        result = format(date, 'dd-MM-yyyy')
        setSelectedDate(date);
        // props.match.params.branch
        dispatch(viewBranchDetail(props.match.params.branch, result));

    };

    const [state, setState] = React.useState({
        checkedB: true,
    });



    useEffect(() => {
        var todaysDate = new Date()
        result = format(todaysDate, 'dd-MM-yyyy')
        dispatch(viewBranchDetail(props.match.params.branch, ""));
        $('#root').find('header').hide()
        $('#root').find('.makeStyles-content-3').css('margin-top', '0')
        $('#root').find('.makeStyles-content-3').css('padding', '0px 15px')
        let obj = JSON.parse(localStorage.getItem("smData"));
        setLocalData(obj)
        console.log(localData)
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
            fontWeight: 'bold'
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#52d869',
                    opacity: 1,
                    border: 'none',
                    fontWeight: 'bold'
                },
            },
            '&$focusVisible $thumb': {
                color: '#52d869',
                border: '6px solid #fff',
                fontWeight: 'bold'
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
            transition: theme.transitions.create(['background-color', 'border']),
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
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <img src={localData.image} style={{ padding: "1vw" }} />
            </Dialog>
            <div id="header-container">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <p style={{ fontSize: "1.5vw", marginLeft: "0.5vw", fontWeight: "bold", paddingTop: '0.5vw' }}>
                        {props.match.params.branch} Branch
                    </p>
                    <KeyboardDatePicker
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
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div style={{ display: 'flex', width: "25vw", justifyContent: 'space-around', marginBottom: "1vw" }}>
                <Button variant="contained" color="primary" style={{ marginRight: "0.2vw", marginLeft: "0.2vw", backgroundColor: '#43a047' }}>
                    Branch Open Time: {localData.open}
                </Button>
                <Button variant="contained" color="primary" style={{ marginRight: "0.2vw", marginLeft: "0.2vw", backgroundColor: '#43a047' }}>
                    Branch Close Time: {localData.close}
                </Button>
                <Button variant="contained" color="primary" style={{ marginRight: "0.2vw", marginLeft: "0.2vw", backgroundColor: '#43a047' }}
                    onClick={handleClickOpen}
                >
                    View Heatmap
      </Button>
            </div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Whatshot />
                            </CardIcon>
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>Fire Alert</p>
                            <h3 className={classes.cardTitle}>
                                {data.Fire}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/External_threat/fire/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
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
                                <span class="iconify" data-icon="whh:gun" data-inline="false"></span>
                            </CardIcon>
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>Weapon Alert</p>
                            <h3 className={classes.cardTitle}>
                                {data.Weapon}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/External_threat/weapon/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                                    {/* <DateRange /> */}
                  View More
                </div>
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>People Count</p>
                            <h3 className={classes.cardTitle}>
                                {data.People_count}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/External_threat/fire/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
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
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>Trespassing Alert</p>
                            <h3 className={classes.cardTitle}>
                                {data.Tresspassing}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/External_threat/trespassing/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
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
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>Total Alert</p>
                            <h3 className={classes.cardTitle}>
                                {data.Total_alert}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/null/null/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
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
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>
                                <span style={{ color: "red", fontSize: '1vw', marginRight: '0.5vw' }}>
                                    !
                                </span>
                                Vehicle Count</p>
                            <h3 className={classes.cardTitle}>
                                {data.Vehicle_count}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                {/* <DriveEta /> */}
                                <span class="iconify" data-icon="mdi-thermometer" data-inline="false"></span>
                            </CardIcon>
                            <p className={classes.cardCategory} style={{ fontWeight: 'bold', color: '#3C4858' }}>Temperature Alert</p>
                            <h3 className={classes.cardTitle}>
                                {data.High_temperature}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <a href={"http://192.168.1.6:8118/tickets/filter/?f=1&fs=" + props.match.params.branch + "&gp=5f8ae9bb5aa68a0011c36907"} target="_blank">
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
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
                            {/* <CardIcon color="primary">
                                <AddAlertSharp />
                            </CardIcon> */}
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }}>

                                <FormControlLabel
                                    control={<IOSSwitch checked={data.CameraStatus} name="checkedB" />}
                                    label="Camera Status"
                                />
                                <FormControlLabel
                                    control={<IOSSwitch checked={data.DvrStatus} name="checkedB" />}
                                    label="DVR Status"
                                />

                            </div>



                            {/* <h3 className={classes.cardTitle}>
                                {data.Total_alert}
                            </h3> */}

                        </CardHeader>
                        <CardFooter stats>

                        </CardFooter>
                    </Card>
                </GridItem>

            </GridContainer>



            <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <div style={{ width: '100%', height: '16vw' }}>
                            {/* <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.Covid_safety}
                                // segments={2222}
                                // startColor="#fb8c00"
                                // endColor="#e53935"
                                // customSegmentStops={[0, 1.5, 2.5, 3.5]}
                                // maxValue={3.5}
                                // minValue={0}
                                // segmentColors={['#9399ff', '#14ffec', '#00bbf0']}
                                currentValueText="Covid Safety"
                                // currentValueText="Covid Safety"
                                // maxValue={3.5}
                                // minValue={0}
                                // maxSegmentLabels={0}
                                customSegmentLabels={[
                                    {
                                        text: 'Very Bad',
                                        position: 'INSIDE',
                                        color: '#555',
                                    },
                                    {
                                        text: 'Bad',
                                        position: 'INSIDE',
                                        color: '#555',
                                    },
                                    {
                                        text: 'Ok',
                                        position: 'INSIDE',
                                        color: '#555',
                                        fontSize: '19px',
                                    },
                                    {
                                        text: 'Good',
                                        position: 'INSIDE',
                                        color: '#555',
                                    },
                                    {
                                        text: 'Very Good',
                                        position: 'INSIDE',
                                        color: '#555',
                                    },
                                    {
                                        text: 'Very Good',
                                        position: 'INSIDE',
                                        color: '#555',
                                    },
                                    {
                                        text: 'Very Good',
                                        position: 'INSIDE',
                                        color: '#555',
                                    },
                                ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'#a7ff83'}
                                textColor={'black'}
                            /> */}

                            <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.Covid_safety}
                                customSegmentStops={[0, 5, 10, 20]}
                                maxValue={20}
                                segmentColors={['#0B8500', '#fb8c00', '#FF4433']}
                                currentValueText="Covid Safety"
                                customSegmentLabels={[
                                    {
                                        text: 'Noraml',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'Medium',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'High',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'black'}
                                textColor={'black'}
                            />

                        </div>
                        <div style={{ textAlign: 'center', fontSize: "1.3vw", fontWeight: 'bold' }}>
                            {data.Covid_safety}
                        </div>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/Business_insights/covid/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                                    {/* <DateRange /> */}
                  View More
                </div>
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <div style={{ width: '100%', height: '16vw' }}>

                            {/* <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.ATM_performance}
                                // customSegmentStops={[0, 1.5, 2.5, 3.5]}
                                // segmentColors={['#9399ff', '#14ffec', '#00bbf0']}
                                // currentValueText="ATM Lobby Performance"
                                segments={5555}
                                startColor="green"
                                endColor="red"
                                currentValueText="ATM Lobby Performance"
                                maxValue={3.5}
                                minValue={0}
                                maxSegmentLabels={0}
                                // customSegmentLabels={[
                                //     {
                                //         text: 'Good',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Great',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Awesome!',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                // ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'#a7ff83'}
                                textColor={'black'}
                            /> */}
                            <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.ATM_performance}
                                customSegmentStops={[0, 5, 10, 20]}
                                maxValue={20}
                                segmentColors={['#0B8500', '#fb8c00', '#FF4433']}
                                currentValueText="ATM Lobby Performance"
                                customSegmentLabels={[
                                    {
                                        text: 'Noraml',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'Medium',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'High',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'black'}
                                textColor={'black'}
                            />
                        </div>
                        <div style={{ textAlign: 'center', fontSize: "1.3vw", fontWeight: 'bold' }}>
                            {data.ATM_performance}
                        </div>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/External_threats/atm/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                                    {/* <DateRange /> */}
                  View More
                </div>
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={4}>
                    <Card >
                        <div style={{ width: '100%', height: '16vw' }}>

                            {/* <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.UPS_DG}
                                segments={5555}
                                startColor="green"
                                endColor="red"
                                // customSegmentStops={[0, 1.5, 2.5, 3.5]}
                                // segmentColors={['#b48ead', '#14ffec', '#00bbf0']}
                                // currentValueText="UPS and DG Performance"
                                currentValueText="UPS and DG Performance"
                                maxValue={3.5}
                                minValue={0}
                                maxSegmentLabels={0}
                                // customSegmentLabels={[
                                //     {
                                //         text: 'Good',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Great',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Awesome!',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                // ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'#a7ff83'}
                                textColor={'black'}
                            /> */}
                            <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.UPS_DG}
                                customSegmentStops={[0, 1.5, 3,]}
                                maxValue={3}
                                segmentColors={['#0B8500', '#FF4433']}
                                currentValueText="UPS and DG Performance"
                                customSegmentLabels={[
                                    {
                                        text: 'ON',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'OFF',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },

                                ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'black'}
                                textColor={'black'}
                            />
                        </div>
                        <div style={{ textAlign: 'center', fontSize: "1.3vw", fontWeight: 'bold' }}>
                            {data.UPS_DG}
                        </div>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/Internal_compliance/ups/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                                    {/* <DateRange /> */}
                  View More
                </div>
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <div style={{ width: '100%', height: '16vw' }}>

                            {/* <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.Branch_performance}
                                segments={5555}
                                startColor="green"
                                endColor="red"
                                // customSegmentStops={[0, 1.5, 2.5, 3.5]}
                                // segmentColors={['#b48ead', '#14ffec', '#00bbf0']}
                                // currentValueText="Branch Lobby Performance"
                                currentValueText="Branch Lobby Performance"
                                maxValue={3.5}
                                minValue={0}
                                maxSegmentLabels={0}
                                // customSegmentLabels={[
                                //     {
                                //         text: 'Good',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Great',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Awesome!',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                // ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'#a7ff83'}
                                textColor={'black'}
                            /> */}

                            <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.Branch_performance}
                                customSegmentStops={[0, 5, 10, 20]}
                                maxValue={20}
                                segmentColors={['#0B8500', '#fb8c00', '#FF4433']}
                                currentValueText="Branch Lobby Performance"
                                customSegmentLabels={[
                                    {
                                        text: 'Noraml',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'Medium',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'High',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'black'}
                                textColor={'black'}
                            />

                        </div>
                        <div style={{ textAlign: 'center', fontSize: "1.3vw", fontWeight: 'bold' }}>
                            {data.Branch_performance}
                        </div>
                        <CardFooter stats>
                            <a href={"/admin/view/" + props.match.params.branch + "/Business_insights/branch/" + result}>
                                <div className={classes.stats} style={{ color: "#43a047", textAlign: 'center' }}>
                                    {/* <DateRange /> */}
                  View More
                </div>
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>

                        <div style={{ width: '100%', height: '16vw' }}>
                            {/* <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.Average_waiting_time}
                                // customSegmentStops={[0, 60]}
                                segments={5555}
                                startColor="green"
                                endColor="red"
                                // segmentColors={['#9399ff', '#14ffec', '#00bbf0']}
                                // currentValueText="Average Waiting Time"
                                currentValueText="Average Waiting Time"
                                maxSegmentLabels={0}
                                maxValue={60}
                                minValue={0}
                                // maxSegmentLabels={2}
                                // customSegmentLabels={[
                                //     {
                                //         text: 'Good',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Great',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                //     {
                                //         text: 'Awesome!',
                                //         position: 'INSIDE',
                                //         color: '#d8dee9',
                                //     },
                                // ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'#a7ff83'}
                                textColor={'black'}
                            /> */}

                            <ReactSpeedometer
                                paddingVertical={10}
                                fluidWidth={true}
                                height={200}
                                needleHeightRatio={0.7}
                                value={data.Average_waiting_time}
                                customSegmentStops={[0, 20, 40, 60]}
                                maxValue={60}
                                segmentColors={['#0B8500', '#fb8c00', '#FF4433']}
                                currentValueText="Average Waiting Time"
                                customSegmentLabels={[
                                    {
                                        text: 'Noraml',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'Medium',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                    {
                                        text: 'High',
                                        position: 'INSIDE',
                                        color: 'white',
                                    },
                                ]}
                                ringWidth={47}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={'black'}
                                textColor={'black'}
                            />

                        </div>
                        <div style={{ textAlign: 'center', fontSize: "1.3vw", fontWeight: 'bold' }}>
                            {data.Average_waiting_time}
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
                            <img src={data.Manager_image == null ? avatar : data.Manager_image} alt="..." />
                        </CardAvatar>
                        <CardBody profile>
                            <h4>{data.Manager_name} </h4>
                            <h4>{data.Manager_contact} </h4>
                        </CardBody>

                    </Card>
                </GridItem>
            </GridContainer>
            {/* 
            <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                    <Card >

                        
                    </Card>
                </GridItem>
            </GridContainer> */}

        </div >
    );
}
