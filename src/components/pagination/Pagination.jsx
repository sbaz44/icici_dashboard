import React, { Component } from "react";
import "./pagination.css";
import arrow from "./arrow.png";
import arrow2 from "./arrow2.png";
class Pagination extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.lastPage);
  }
  render() {
    return (
      <div
        className={
          this.props.className
            ? "paginationContainer " + this.props.className
            : "paginationContainer"
        }
      >
        <img
          src={this.props.currentPage === 1 ? arrow2 : arrow}
          className={
            this.props.currentPage === 1 ? "leftArrowDisabled" : "leftArrow"
          }
          onClick={
            this.props.currentPage === 1 ? "" : () => this.props.prevPage()
          }
          alt=""
        />
        <div className="pageStart">
          {this.props.currentPage < 9 ? "0" : ""}
          {this.props.currentPage}
        </div>
        <p>of</p>
        <div className="pageEnd">
          {this.props.lastPage < 9 ? "0" : ""}
          {this.props.lastPage}
        </div>
        <img
          src={this.props.currentPage === this.props.lastPage ? arrow2 : arrow}
          className={
            this.props.currentPage === this.props.lastPage
              ? "rightArrowDisabled"
              : "rightArrow"
          }
          onClick={
            this.props.currentPage === this.props.lastPage
              ? ""
              : () => this.props.nextPage()
          }
          alt=""
        />
      </div>
    );
  }
}

export default Pagination;
