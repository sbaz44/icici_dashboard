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
                    style={{ fontWeight: "bold", fontSize: "1.03em" }}
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
                        fontSize: "0.9em",
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
                        fontSize: "0.9em",
                      }}
                    >
                      {(() => {
                        if (row.Group === "Business insights") {
                          if (
                            row.Message ===
                            "Social Distancing not maintained in Branch"
                          ) {
                            return "Crowd detected in Branch";
                          } else if (
                            row.Message ===
                            "Social Distancing not maintained in Vault"
                          ) {
                            return "Crowd detected in Vault";
                          } else if (
                            row.Message === "Social Distancing not maintained"
                          ) {
                            return "Crowd detected in Branch";
                          } else {
                            return row.Message;
                          }
                        } else {
                          return row.Message;
                        }
                      })()}
                      {/* {row.Group === "Business insights"
                        ? row.Message ===
                          "Social Distancing not maintained in Branch"
                          ? "Crowd detected in Branch"
                          : row.Message
                        : row.Message} */}
                      {/* {row.Message === "Person exceeded in ATM" ?
                        "Crowd detected in ATM"} */}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.9em",
                      }}
                    >
                      {row.Group}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.9em",
                      }}
                    >
                      {row.Branch}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{
                        fontWeight: "bold",
                        color: "#3C4858",
                        fontSize: "0.9em",
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
                        fontSize: "0.9em",
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
                        fontSize: "0.9em",
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
                        fontSize: "0.9em",
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
