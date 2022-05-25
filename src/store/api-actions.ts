import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { api, store } from '.';
import { IReview } from '../interfaces/review';
import { errorHandle } from '../services/error-handle';
import { APIRoute } from '../utils/const';
import { ApiActions } from '../utils/reducers';
import { addComment, loadComments, loadProduct, loadProducts } from './app-data';

export const fetchProductsAction = createAsyncThunk(ApiActions.Products, async () => {
  try {
    const { data } = await api.get(APIRoute.Products);
    store.dispatch(loadProducts(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchProductAction = createAsyncThunk(ApiActions.Product, async ([id, onBadRequest]: [id: number, onBadRequest: NavigateFunction]) => {
  try {
    const { data } = await api.get(`${APIRoute.Product}/${id}`);
    store.dispatch(loadProduct(data));
  } catch (error) {
    errorHandle(error);
    onBadRequest('*', { replace: true });
  }
});

export const fetchCommentstAction = createAsyncThunk(ApiActions.Comments, async (id: number) => {
  try {
    const { data } = await api.get(`${APIRoute.Product}/${id}${APIRoute.Comments}`);
    store.dispatch(loadComments(data));
  } catch (error) {
    errorHandle(error);
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

export const fetchReviewAction = createAsyncThunk(ApiActions.NewReview, async ([formData, onSuccess]: [formData: IReview, onSuccess: Dispatch<SetStateAction<boolean>>]) => {
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
