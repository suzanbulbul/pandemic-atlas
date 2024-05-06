import { takeLatest, put } from 'redux-saga/effects';
import { fetchDataRequest } from './slice';
import { getData } from '../api/data'; 

function* fetchDataSaga() {
  try {
    const data = yield getData()
    yield put(fetchDataRequest(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default function* rootSaga() {
  yield takeLatest('FETCH_DATA', fetchDataSaga)
}
