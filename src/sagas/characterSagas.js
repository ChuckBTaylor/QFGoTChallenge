import apiRequests  from '../services/apiRequests';
import { characterActions } from '../constants/constants';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchCharacters() {
  try {
    const data = yield call(apiRequests().characters.fetchAll);
    console.log(data);    
    yield put({type: characterActions.CHARACTERS_FETCH_SUCCESS, data});
  } catch (error) {
    yield put({type: characterActions.CHARACTERS_FETCH_FAILURE, error});
  }
}

export function* characterSagas(){
  yield takeEvery(characterActions.CHARACTERS_FETCH_START, fetchCharacters);
}