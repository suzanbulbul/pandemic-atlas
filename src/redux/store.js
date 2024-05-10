import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import dataReducer from './slice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
