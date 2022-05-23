import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { api, store } from '.';
import { IReview } from '../interfaces/review';
import { errorHandle } from '../services/error-handle';
import { APIRoute } from '../utils/const';
import { addComment, loadComments, loadProduct, loadProducts } from './app-data';

export const fetchProductsAction = createAsyncThunk('data/fetchProducts', async () => {
  try {
    const { data } = await api.get(APIRoute.Products);
    store.dispatch(loadProducts(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchProductAction = createAsyncThunk('data/fetchProduct', async (id: number) => {
  try {
    const { data } = await api.get(`${APIRoute.Product}/${id}`);
    store.dispatch(loadProduct(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchCommentstAction = createAsyncThunk('data/fetchComments', async (id: number) => {
  try {
    const { data } = await api.get(`${APIRoute.Product}/${id}/comments`);
    store.dispatch(loadComments(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchReviewAction = createAsyncThunk('api/fetchReview', async ([formData, onSuccess]: [formData: IReview, onSuccess: Dispatch<SetStateAction<boolean>>]) => {
  const { rating, ...rest } = formData;

  try {
    const { data } = await api.post(`${APIRoute.Comments}`, { ...rest, rating: Number(rating) });
    store.dispatch(addComment(data));
    onSuccess(true);
  } catch (error) {
    errorHandle(error);
    onSuccess(false);
  }
});
