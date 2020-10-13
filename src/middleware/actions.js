import axios from "axios";

//get call
export const GET_BRANCH_DETAILS = "GET_BRANCH_DETAILS";
export const GET_BRANCH_REPORTS = "GET_BRANCH_REPORTS";
export const GET_DASHBOARD_COUNT = "GET_DASHBOARD_COUNT"; //dashboard/dashboard
export const GET_GRAPH_DATA = "GET_GRAPH_DATA";

//post call
export const POST_BRANCH_DETAILS = "POST_BRANCH_DETAILS";
export const POST_BRANCH_REPORTS = "POST_BRANCH_REPORTS";

const URL = "http://10.11.0.4:8000/dashboard";

//get calls
export function getbranchDetails() {
  return (dispatch) => {
    axios
      .get(URL + "/branch")
      .then((res) =>
        dispatch({
          type: GET_BRANCH_DETAILS,
          payload: res.data.Data,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function getbranchReports(branch) {
  return (dispatch) => {
    axios
      .get(URL + "/reports/" + branch)
      .then((res) =>
        dispatch({
          type: GET_BRANCH_REPORTS,
          payload: res.data,
        })
      )
      .catch((err) => console.log("error"));
  };
}
//post calls

export function postBranchReports(payload) {
  return (dispatch) => {
    axios
      .post(URL + "/reports", payload)
      .then((res) =>
        dispatch({
          type: POST_BRANCH_REPORTS,
          payload: res.status,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function postBranchDetails(payload) {
  return (dispatch) => {
    axios
      .post(URL + "/branch", payload)
      .then((res) =>
        dispatch({
          type: POST_BRANCH_DETAILS,
          payload: res.status,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function dashboardCount(payload) {
  return (dispatch) => {
    axios
      .get(URL + "/dashboard ")
      .then((res) =>
        dispatch({
          type: GET_DASHBOARD_COUNT,
          payload: res.data.Data,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function graphData(payload) {
  return (dispatch) => {
    axios
      .get(URL + "/analytics")
      .then((res) =>
        dispatch({
          type: GET_GRAPH_DATA,
          payload: res.data,
        })
      )
      .catch((err) => console.log("error"));
  };
}
