import { characterActions } from "../constants/constants";

const CHARACTER_CALL_REQUEST = "CHARACTER_CALL_REQUEST";
const CHARACTER_CALL_SUCCESS = "CHARACTER_CALL_SUCCESS";
const CHARACTER_CALL_FAILURE = "CHARACTER_CALL_FAILURE";

const initialState = {
  fetching: false,
  list: [],
  error: null
};

export function characterReducer(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case characterActions.CHARACTERS_FETCH_START:
      return { ...state, fetching: true, error: null };
    case characterActions.CHARACTERS_FETCH_SUCCESS:
      return { ...state, fetching: false, list: action.data.data };
    case characterActions.CHARACTERS_FETCH_FAILURE:
      console.log("From failure");;

      return { ...state, fetching: false, characters: [], error: action.error };
    default:
      console.log("Failed to match action: " + action.type + " from characterReducer");
      return state;
  }
};