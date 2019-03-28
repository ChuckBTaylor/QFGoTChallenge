import { bookActions } from "../constants/constants";
import { takeEvery, put, call } from "redux-saga/effects";
import apiRequests from "../services/apiRequests";

function* fetchBooks() {  
  try {
    const data = yield call(apiRequests().books.fetchAll);
    yield put({ type: bookActions.BOOKS_FETCH_SUCCESS, data });
  } catch (error) {
    yield put({ type: bookActions.BOOKS_FETCH_FAILURE, error });
  }
}

export function* bookSagas() {
  yield takeEvery(bookActions.BOOKS_FETCH_START, fetchBooks);
}
