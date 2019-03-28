import { houseActions, characterActions } from "../constants/constants";
import { getIdFromUrlString } from "../utils/utils";

const initialState = {
  fetching: false,
  list: {},
  error: null,
  lastPageRequested: 0,
  selectedHouse: null
};

export function houseReducer(state = initialState, action) {
  switch (action.type) {
    case houseActions.HOUSES_FETCH_START:
      return { ...state, fetching: true, error: null };
    case houseActions.HOUSES_FETCH_SUCCESS:
      let newHouses = {};
      action.data.data.forEach(it => newHouses[getIdFromUrlString(it.url)] = it);
      return { ...state, fetching: false, list: { ...state.list, ...newHouses }, lastPageRequested: action.lastPageRequested };
    case houseActions.HOUSES_FETCH_FAILURE:
      console.log(action.error);
      return { ...state, fetching: false, error: action.error };
    case houseActions.FETCH_HOUSE_START:
      return { ...state, error: null };
    case houseActions.FETCH_HOUSE_SUCCESS:
      let newHouse = {};
      newHouse[getIdFromUrlString(action.data.data.url)] = action.data.data;
      return { ...state, list: { ...state.list, ...newHouse } };
    case houseActions.FETCH_HOUSE_FAILURE:
      console.log(action.error);
      return { ...state, error: action.error };
    case houseActions.SELECT_HOUSE:
      let selectedHouse = state.list[action.payload.id];
      return { ...state, selectedHouse };
    case characterActions.SELECT_CHARACTER:
      return { ...state, selectedHouse: null };
    default:
      // console.log("Failed to match action " + action.type + " from house reducer.");
      return state;
  }
}