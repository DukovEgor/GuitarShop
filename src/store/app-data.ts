import { createSlice } from '@reduxjs/toolkit';
import { InitialData } from '../interfaces/initial-data';
import { NameSpace } from '../utils/const';

const initialState: InitialData = {
  products: [],
  isDataLoaded: false,
};

export const appData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { loadProducts } = appData.actions;
