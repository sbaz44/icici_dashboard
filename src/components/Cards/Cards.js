
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import './card.css'
// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import InfoOutlined from "@material-ui/icons/InfoOutlined";


const useStyles = makeStyles(styles);

export default function Cards(props) {
    const classes = useStyles();
    return (
        <div id="card" style={{ backgroundColor: props.color }}>
            {console.log(props.color)}
            <div id='card-data'>
                <p
                    className={classes.cardCategory}
                    style={{ fontWeight: "bold", color: "white" }}
                >
                    {props.text}
                </p>
                <h3 className={classes.cardTitle} style={{ fontWeight: "bold", color: "white" }}>
                    {props.count}
                </h3>
            </div>
            <div id="card-icon">
                {/* <InfoOutlined htmlColor="white" className="svg_icons" /> */}
                {props.icon}
            </div>
        </div>
    )
}
