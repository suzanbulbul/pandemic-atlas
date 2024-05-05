import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataRequest: (state, action) => {
        state.data = action.payload;
    },
  },
});

export const { fetchDataRequest } = dataSlice.actions;

export const selectData = (state) => state.data.data;

export default dataSlice.reducer;
