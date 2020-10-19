import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      {console.log(tableData)}
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                    align="center"
                    style={{ fontWeight: 'bold', }}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {/* {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })} */}
          {tableData.map((row, index) => (
            <TableRow key={row.index} className={classes.tableBodyRow}>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.Branch}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.Camera_count}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.People_count}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.Alert_count}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }} >
                {row.Open_time}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.Close_time}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.Image_link && (
                  <a
                    style={{ color: "black" }}
                    href={row.Image_link}
                    target="_blank"
                    alt=""
                  >
                    <img
                      src={row.Image_link}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                )}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                {row.Created}
              </TableCell>
              <TableCell className={classes.tableCell} align="center" style={{ fontWeight: 'bold', color: '#3C4858' }}>
                <NavLink to={'view/branch/' + row.Branch}>
                  View
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
