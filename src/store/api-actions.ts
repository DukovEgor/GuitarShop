import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { api, store } from '.';
import browserHistory from '../browser-history';
import { IReview } from '../interfaces/review';
import { errorHandle } from '../services/error-handle';
import { APIRoute } from '../utils/const';
import { ApiActions } from '../utils/reducers';
import { addComment, loadComments, loadProduct, loadProducts } from './app-data/app-data';

export const fetchProductsAction = createAsyncThunk(ApiActions.Products, async ([start, end]: number[]) => {
  try {
    const { data, headers } = await api.get(`${APIRoute.Products}?_start=${start}&_end=${end}&_embed=comments`);
    store.dispatch(loadProducts({ data, headers }));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchProductDataAction = createAsyncThunk(ApiActions.ProductData, async (id: number) => {
  try {
    const product = await api.get(`${APIRoute.Product}/${id}`);
    const comments = await api.get(`${APIRoute.Product}/${id}${APIRoute.Comments}`);
    store.dispatch(loadProduct(product.data));
    store.dispatch(loadComments(comments.data));
  } catch (error) {
    errorHandle(error);
    browserHistory.push('/*');
  }
});

export const getComments = createAsyncThunk(ApiActions.Comments, async ([id, onLoad]: [id: number, onLoad: Dispatch<SetStateAction<number>>]) => {
  try {
    const { data } = await api.get(`${APIRoute.Product}/${id}${APIRoute.Comments}`);
    onLoad(data.length);
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchReviewAction = createAsyncThunk(ApiActions.NewReview, async ([formData, onSuccess]: [formData: IReview, onSuccess?: Dispatch<SetStateAction<boolean>>]) => {
  const { rating, ...rest } = formData;

  try {
    const { data } = await api.post(`${APIRoute.Comments}`, { ...rest, rating: Number(rating) });
    store.dispatch(addComment(data));
    onSuccess?.(true);
  } catch (error) {
    errorHandle(error);
    onSuccess?.(false);
  }
});
