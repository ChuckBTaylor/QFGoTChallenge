import { bookActions } from "../constants/constants";
import { getIdFromUrlString } from "../utils/utils";

const initialState = {
  fetching: false,
  list: {},
  error: null,
  lastPageRequest: 0
};

export function bookReducer(state = initialState, action) {
  switch (action.type) {
    case bookActions.BOOKS_FETCH_START:
      return { ...state, fetching: true, error: null };
    case bookActions.BOOKS_FETCH_SUCCESS:
      const books = action.data.data.map(book => {return {...book, id: getIdFromUrlString(book.url)}});
      return { ...state, fetching: false, list: books };
    case bookActions.BOOKS_FETCH_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      // console.log("Failed to match action " + action.type + " from book reducer.");
      return state;
  }
}