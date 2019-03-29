import apiRequests from '../services/apiRequests';
import { characterActions } from '../constants/constants';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchCharacters(action) {
  try {
    const data = yield call(apiRequests().characters.fetch, action.payload);
    const lastPageRequested = action.payload.page;
    yield put({ type: characterActions.CHARACTERS_FETCH_SUCCESS, data, lastPageRequested });
  } catch (error) {
    yield put({ type: characterActions.CHARACTERS_FETCH_FAILURE, error });
  }
}

function* characterFetch(action) {
  try {    
    const data = yield call(apiRequests().characters.fetchOne, action.payload);
    yield put({type: characterActions.FETCH_CHARACTER_SUCCESS, data});
  } catch (error) {
    yield put({type: characterActions.FETCH_CHARACTER_FAILURE, error})
  }
}

export function* characterSagas() {
  yield takeEvery(characterActions.CHARACTERS_FETCH_START, fetchCharacters);
  yield takeEvery(characterActions.FETCH_CHARACTER_START, characterFetch);
}