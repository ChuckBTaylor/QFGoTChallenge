import { houseActions } from "../constants/constants";
import { getIdFromUrlString } from "../utils/utils";

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
    let newHouses = {};
    action.data.data.forEach(it => newHouses[getIdFromUrlString(it.url)] = it);      
    return { ...state, fetching: false, list: {...state.list, ...newHouses}, lastPageRequested: action.lastPageRequested };
    case houseActions.HOUSES_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      // console.log("Failed to match action " + action.type + " from house reducer.");
      return state;
  }
}