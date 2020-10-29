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
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, date } = props;
  const [open, setOpen] = React.useState(false);
  const [imageLink, setimageLink] = React.useState("");
  const handleClickOpen = (link) => {
    setimageLink(link);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.tableResponsive}>
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
                    style={{ fontWeight: "bold" }}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={row.index} className={classes.tableBodyRow}>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                {row.Branch}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                {row.Camera_count}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                {row.People_count}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                {row.Alert_count}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(row.Open_time_image)}
              >
                {row.Open_time}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(row.Close_time_image)}
              >
                {row.Close_time}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{
                  fontWeight: "bold",
                  color: "#3C4858",
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(row.Image_link)}
              >
                {row.Image_link && (
                  <img
                    src={row.Image_link}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                {row.Created}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ fontWeight: "bold", color: "#3C4858" }}
              >
                <NavLink
                  to={"view/branch/" + row.Branch + "/" + date}
                  onClick={() => {
                    let data = {
                      image: row.Image_link,
                      open: row.Open_time,
                      close: row.Close_time,
                      open_image: row.Open_time_image,
                      close_image: row.Close_time_image,
                    };
                    localStorage.setItem("smData", JSON.stringify(data));
                  }}
                >
                  View
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <img src={imageLink} style={{ padding: "1vw" }} />
        </Dialog>
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
