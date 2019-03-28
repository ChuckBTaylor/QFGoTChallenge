import { characterActions, houseActions, generalActions } from "../constants/constants";
import { getIdFromUrlString } from "../utils/utils";

const initialState = {
  fetching: false,
  list: {},
  error: null,
  lastPageRequested: 0,
  selectedCharacter: null
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case characterActions.CHARACTERS_FETCH_START:
      return { ...state, fetching: true, error: null };
    case characterActions.CHARACTERS_FETCH_SUCCESS:
      let newCharacters = {};
      action.data.data.forEach(it => newCharacters[getIdFromUrlString(it.url)] = it);
      return { ...state, fetching: false, list: { ...state.list, ...newCharacters }, lastPageRequested: action.lastPageRequested };
    case characterActions.CHARACTERS_FETCH_FAILURE:
      console.log(action.error);
      return { ...state, fetching: false, error: action.error };
    case characterActions.FETCH_CHARACTER_START:
      return { ...state, error: null };
    case characterActions.FETCH_CHARACTER_SUCCESS:
      let newCharacter = {};
      newCharacter[getIdFromUrlString(action.data.data.url)] = action.data.data;
      return { ...state, list: { ...state.list, ...newCharacter } };
    case characterActions.FETCH_CHARACTER_FAILURE:
      console.log(action.error);
      return { ...state, error: action.error }
    case characterActions.SELECT_CHARACTER:
      let selectedCharacter = state.list[action.payload.id];
      return { ...state, selectedCharacter };
    case generalActions.CLOSE_DRILL_DOWN:
    case houseActions.SELECT_HOUSE:
      return { ...state, selectedCharacter: null };
    default:
      return state;
  }
};