import { takeLatest, put } from 'redux-saga/effects';
import { fetchDataRequest } from './slice'; 

import { dummyData } from '../api/data'; 

function* fetchData() {
  try {
    const response = dummyData; 
    yield put(fetchDataRequest(response));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default function* rootSaga() {
  yield takeLatest('FETCH_DATA', fetchData);
}
