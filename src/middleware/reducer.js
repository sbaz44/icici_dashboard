import {
  GET_BRANCH_DETAILS,
  GET_BRANCH_REPORTS,
  POST_BRANCH_DETAILS,
  POST_BRANCH_REPORTS,
  GET_DASHBOARD_COUNT,
  GET_GRAPH_DATA,
} from "./actions";

const initialState = {
  branches: [],
  dashboard_Count: [],
  graph_data: [],
  postBranchResponse: {
    statusCode: 10,
  },
  postBranchDetailsResponse: {
    statusCode: 10,
  },
  branchReport: {
    Branch: "Demo",
    Image: "image1.jpg",
    People_count: 10,
  },
};

export default function (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_BRANCH_DETAILS:
      return {
        ...state,
        branches: action.payload,
      };
    case GET_BRANCH_REPORTS:
      return {
        ...state,
        branchReport: action.payload,
      };
    case POST_BRANCH_DETAILS:
      return {
        ...state,
        postBranchResponse: { statusCode: action.payload },
      };
    case POST_BRANCH_REPORTS:
      return {
        ...state,
        postBranchDetailsResponse: { statusCode: action.payload },
      };
    case GET_DASHBOARD_COUNT:
      return {
        ...state,
        dashboard_Count: action.payload,
      };
    case GET_GRAPH_DATA:
      return {
        ...state,
        graph_data: action.payload,
      };

    default:
      return state;
  }
}
