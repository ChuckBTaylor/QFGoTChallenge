import { takeEvery } from 'redux-saga/effects';
import apiRequests  from '../services/apiRequests';
import { characterActions } from '../constants/constants';
import { call, put } from 'redux-saga/effects';

export function* fetchCharacters() {
  try {
    const data = yield call(apiRequests().characters.fetchAll);
    console.log(data);    
    yield put({type: characterActions.CHARACTERS_FETCH_SUCCESS, data});
  } catch (error) {
    yield put({type: characterActions.CHARACTERS_FETCH_FAILURE, error});
  }
}

export function* characterRootSaga(){
  yield takeEvery(characterActions.CHARACTERS_FETCH_START, fetchCharacters);
}