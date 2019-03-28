import { houseActions, characterActions, generalActions } from "../constants/constants";
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
      action.data.data.map(it => {return {...it, id: getIdFromUrlString(it.url)}}).forEach(it => newHouses[it.id] = it);
      return { ...state, fetching: false, list: { ...state.list, ...newHouses }, lastPageRequested: action.lastPageRequested };
    case houseActions.HOUSES_FETCH_FAILURE:
      console.log(action.error);
      return { ...state, fetching: false, error: action.error };
    case houseActions.FETCH_HOUSE_START:
      return { ...state, error: null };
    case houseActions.FETCH_HOUSE_SUCCESS:
      const newHouse = action.data.data;
      newHouse.id = getIdFromUrlString(newHouse.url);
      const houseList = state.list;
      houseList[newHouse.id] = newHouse;
      return { ...state, list: houseList };
    case houseActions.FETCH_HOUSE_FAILURE:
      console.log(action.error);
      return { ...state, error: action.error };
    case houseActions.BACK_SELECT_HOUSE:
      console.log("Back Selecting house", action);
    case houseActions.SELECT_HOUSE:
      let selectedHouse = state.list[action.payload.id];
      console.log(selectedHouse);
      return { ...state, selectedHouse };
    case characterActions.BACK_SELECT_CHARACTER:
    case generalActions.CLOSE_DRILL_DOWN:
    case characterActions.SELECT_CHARACTER:
      return { ...state, selectedHouse: null };
    default:
      // console.log("Failed to match action " + action.type + " from house reducer.");
      return state;
  }
}