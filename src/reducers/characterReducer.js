import { characterActions } from "../constants/constants";

const initialState = {
  fetching: false,
  list: [],
  error: null,
  lastPageRequested: 0
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case characterActions.CHARACTERS_FETCH_START:
      return { ...state, fetching: true, error: null };
    case characterActions.CHARACTERS_FETCH_SUCCESS:
      return { ...state, fetching: false, list: action.data.data };
    case characterActions.CHARACTERS_FETCH_FAILURE:
      return { ...state, fetching: false, characters: [], error: action.error };
    default:
      console.log("Failed to match action: " + action.type + " from characterReducer");
      return state;
  }
};