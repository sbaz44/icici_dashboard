import axios from "axios";

//get call
export const GET_BRANCH_DETAILS = "GET_BRANCH_DETAILS";
export const GET_BRANCH_REPORTS = "GET_BRANCH_REPORTS";
export const GET_DASHBOARD_COUNT = "GET_DASHBOARD_COUNT"; //dashboard/dashboard
export const GET_GRAPH_DATA = "GET_GRAPH_DATA";
export const GET_VIEW_BRANCH_DETAIL = "GET_VIEW_BRANCH_DETAIL";
export const GET_VIEW_BRANCH_CARD_DETAIL = "GET_VIEW_BRANCH_CARD_DETAIL";
export const GET_TYPE_DETAIL = "GET_TYPE_DETAIL";
export const GET_THREAT_DETAIL = "GET_THREAT_DETAIL";

//post call
export const POST_BRANCH_DETAILS = "POST_BRANCH_DETAILS";
export const POST_BRANCH_REPORTS = "POST_BRANCH_REPORTS";

export const URL = "http://13.127.202.106:8000/dashboard";

//get calls
export function getbranchDetails(date) {
  return (dispatch) => {
    axios
      .get(URL + "/branch/?Date=" + date)
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

export function viewBranchDetail(payload, payload2) {
  console.log(payload, payload2);
  return (dispatch) => {
    axios
      .post(URL + "/branch/" + payload + "/dashboard?Date=" + payload2)
      .then((res) =>
        dispatch({
          type: GET_VIEW_BRANCH_DETAIL,
          payload: res.data,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function viewDetail(payload, payload2, payload3, payload4, payload5) {
  console.log(payload, payload2);
  return (dispatch) => {
    axios
      .get(
        URL +
          "/alert/" +
          payload +
          "?Type=" +
          payload2 +
          "&Subtype=" +
          payload3 +
          "&Date=" +
          payload4 +
          "&page_no=" +
          payload5
      )
      .then((res) =>
        dispatch({
          type: GET_VIEW_BRANCH_CARD_DETAIL,
          payload: res.data,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function getTypeDetail(payload, payload2) {
  // console.log(payload);
  return (dispatch) => {
    axios
      .get(URL + "/alerts/groups?Type=" + payload + "&Date=" + payload2)
      .then((res) =>
        dispatch({
          type: GET_TYPE_DETAIL,
          payload: res.data,
        })
      )
      .catch((err) => console.log("error"));
  };
}

export function getThreatDetail(payload, payload2, payload3) {
  // console.log(payload);
  return (dispatch) => {
    axios
      .get(
        URL +
          "/alerts/branches?Message=" +
          payload +
          "&Type=" +
          payload3 +
          "&Date=" +
          payload2
      )
      .then((res) =>
        dispatch({
          type: GET_THREAT_DETAIL,
          payload: res.data,
        })
      )
      .catch((err) => console.log("error"));
  };
}
