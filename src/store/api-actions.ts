import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '.';
import { errorHandle } from '../services/error-handle';
import { APIRoute } from '../utils/const';
import { loadProducts } from './app-data';

export const fetchProductsAction = createAsyncThunk(
  'data/fetchProducts',
  async () => {
    try {
      const { data } = await api.get(APIRoute.Products);
      store.dispatch(loadProducts(data));
    } catch (error) {
      errorHandle(error);
    }
  }
);
