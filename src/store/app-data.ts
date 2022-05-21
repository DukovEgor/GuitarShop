import { createSlice } from '@reduxjs/toolkit';
import { InitialData } from '../interfaces/initial-data';
import { NameSpace } from '../utils/const';

const initialState: InitialData = {
  products: [],
  product: {
    id: 0,
    name: '',
    vendorCode: '',
    type: '',
    description: '',
    previewImg: '',
    stringCount: 0,
    rating: 0,
    price: 0,
  },
  comments: [],
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
    loadProduct: (state, action) => {
      state.product = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { loadProducts, loadProduct, loadComments } = appData.actions;
