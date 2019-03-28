import { houseActions } from "../constants/constants";

const initialState = {
  fetching: false,
  list: {},
  error: null,
  lastPageRequested: 0
};

export function houseReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case houseActions.HOUSES_FETCH_START:
      return { ...state, fetching: true, error: null };
    case houseActions.HOUSES_FETCH_SUCCESS:
      return { ...state, fetching: false, list: action.data.data };
    case houseActions.HOUSES_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      console.log("Failed to match action " + action.type + " from house reducer.");
      return state;
  }
}