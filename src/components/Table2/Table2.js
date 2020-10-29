import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  let [response, setResponse] = useState([
    {
      Type: "string",
      Message: "string",
      Branch: "string",
      Camera_id: "string",
      Image: "string",
    },
  ]);
  const [imageLink, setimageLink] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (link) => {
    setimageLink(link);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { tableHead, tableData, tableHeaderColor } = props;
  // useEffect(() => {
  //   setResponse(tableData)
  // }, [response])
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
                    style={{ fontWeight: "bold", fontSize: "0.93vw" }}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {/* {response!==null || response!==undefined ? } */}
          {tableData != null || tableData != undefined
            ? tableData.map((row, index) => {
                return (
                  <TableRow key={row.index} className={classes.tableBodyRow}>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.8vw",
                      }}
                    >
                      {row.Type}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.8vw",
                      }}
                    >
                      {row.Message}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.8vw",
                      }}
                    >
                      {row.Created.substring(0, 10)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.8vw",
                      }}
                    >
                      {row.Created.substring(11, 19)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.8vw",
                      }}
                    >
                      {row.Camera_id}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.8vw",
                      }}
                      onClick={() => handleClickOpen(row.Image)}
                    >
                      {row.Image && (
                        <img
                          src={row.Image}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <img src={imageLink} style={{ padding: "1vw" }} />
      </Dialog>
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
