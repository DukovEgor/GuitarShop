import { createSlice } from '@reduxjs/toolkit';
import { InitialData } from '../../interfaces/initial-data';
import { INITIAL_PRODUCT, NameSpace } from '../../utils/const';

const initialState: InitialData = {
  products: [],
  productsCount: 0,
  product: INITIAL_PRODUCT,
  comments: [],
  isDataLoaded: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload.data;
      state.productsCount = action.payload.headers['x-total-count'];
      state.isDataLoaded = true;
    },
    loadProduct: (state, action) => {
      state.product = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const { loadProducts, loadProduct, loadComments, addComment } = appData.actions;
