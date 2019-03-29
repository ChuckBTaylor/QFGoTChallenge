import { characterActions, houseActions } from "../constants/constants";

const initialState = {
  drillDownHistory: []
}

export function appReducer(state = initialState, action) {
  let drillDownHistory;
  switch (action.type) {
    case characterActions.SELECT_CHARACTER:
      let newCharacterHistory = { domain: "character", id: action.payload.id }
      drillDownHistory = state.drillDownHistory;
      drillDownHistory.unshift(newCharacterHistory);
      drillDownHistory = drillDownHistory.slice(0, 20);
      return { ...state, drillDownHistory };
    case houseActions.SELECT_HOUSE:
      let newHouseHistory = { domain: "house", id: action.payload.id }
      drillDownHistory = state.drillDownHistory;
      drillDownHistory.unshift(newHouseHistory);
      drillDownHistory = drillDownHistory.slice(0, 20);
      return { ...state, drillDownHistory };
    case houseActions.BACK_SELECT_HOUSE:
    case characterActions.BACK_SELECT_CHARACTER:
      drillDownHistory = state.drillDownHistory;
      drillDownHistory.shift();
      return {...state, drillDownHistory};
    default:
      return state;
  }
}