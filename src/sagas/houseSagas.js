import { houseActions } from "../constants/constants";
import { takeEvery, put, call } from 'redux-saga/effects';
import apiRequests from "../services/apiRequests";

function* fetchHouses(action) {
  try{
    const data = yield call(apiRequests().houses.fetch, action.payload);
    const lastPageRequested = action.payload.page;
    yield put({type: houseActions.HOUSES_FETCH_SUCCESS, data, lastPageRequested});
  } catch (error){
    yield put({type: houseActions.HOUSES_FETCH_FAILURE, error});
  }
}

export function* houseSagas(){
  yield takeEvery(houseActions.HOUSES_FETCH_START, fetchHouses);
}