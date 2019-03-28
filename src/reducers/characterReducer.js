import { characterActions } from "../constants/constants";
import { getIdFromUrl } from "../utils/utils";

const initialState = {
  fetching: false,
  list: {},
  error: null,
  lastPageRequested: 0
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case characterActions.CHARACTERS_FETCH_START:
      return { ...state, fetching: true, error: null };
    case characterActions.CHARACTERS_FETCH_SUCCESS:
      let newCharacters = {};
      action.data.data.forEach(it => newCharacters[getIdFromUrl(it)] = it);      
      return { ...state, fetching: false, list: {...state.list, ...newCharacters}, lastPageRequested: action.lastPageRequested };
    case characterActions.CHARACTERS_FETCH_FAILURE:
      return { ...state, fetching: false, characters: [], error: action.error };
    default:
      // console.log("Failed to match action: " + action.type + " from characterReducer");
      return state;
  }
};