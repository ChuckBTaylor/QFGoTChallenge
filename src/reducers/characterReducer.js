const CHARACTER_CALL_REQUEST = "CHARACTER_CALL_REQUEST";
const CHARACTER_CALL_SUCCESS = "CHARACTER_CALL_SUCCESS";
const CHARACTER_CALL_FAILURE = "CHARACTER_CALL_FAILURE";

const initialState = {
  fetching: false,
  characters: [],
  error: null
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case CHARACTER_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case CHARACTER_CALL_SUCCESS:
      return { ...state, fetching: false, characters: action.characters };
    case CHARACTER_CALL_FAILURE:
      return { ...state, fetching: false, characters: [], error: action.error };
    default:
      console.log("Failed to match action: " + action.type + " from characterReducer");
      return state;
  }
};