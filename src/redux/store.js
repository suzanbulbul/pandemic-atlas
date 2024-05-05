import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './slice';

const store = configureStore({
  reducer: {
    data: dataSlice, 
  },
});

export default store;
