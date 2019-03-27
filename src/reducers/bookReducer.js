import { bookActions } from "../constants/constants";

const initialState = {
  fetching: false,
  list: [],
  error: null
};

export function bookReducer(state = initialState, action) {
  switch (action.type) {
    case bookActions.BOOKS_FETCH_START:
      return { ...state, fetching: true, error: null };
    case bookActions.BOOKS_FETCH_SUCCESS:
      return { ...state, fetching: false, list: action.books };
    case bookActions.BOOKS_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      console.log("Failed to match action " + action.type + " from book reducer.");
      return state;
  }
}