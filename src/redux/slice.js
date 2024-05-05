import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem('allCountry');
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem('allCountry', serializedData);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState = loadFromLocalStorage() || {
  data: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataRequest: (state, action) => {
      state.data = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const { fetchDataRequest } = dataSlice.actions;

export const selectData = (state) => state.data.data;

export default dataSlice.reducer;
