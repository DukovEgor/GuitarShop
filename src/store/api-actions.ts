import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { api, store } from '.';
import browserHistory from '../browser-history';
import { IReview } from '../interfaces/review';
import { errorHandle } from '../services/error-handle';
import { APIRoute } from '../utils/const';
import { ApiActions } from '../utils/reducers';
import { addComment, loadProduct, loadProducts } from './app-data/app-data';
import { setDiscount } from './cart-data/cart-data';
import { setSearchResult, setSortedProducts } from './user-process/user-process';

export const fetchProductsAction = createAsyncThunk(
  ApiActions.Products,
  async ([start, end, params, filter, onLoad]: [number, number, string, string, Dispatch<SetStateAction<boolean>>?]) => {
    try {
      const { data, headers } = await api.get(`${APIRoute.Products}?_start=${start}&_end=${end}&${params}&_embed=comments`);
      const sortedProducts = await api.get(`${APIRoute.Products}?_sort=price&${filter}`);
      await store.dispatch(loadProducts({ data, headers }));
      await store.dispatch(setSortedProducts(sortedProducts.data));
      onLoad?.(true);
    } catch (error) {
      errorHandle(error);
      toast.error('Не удалось загрузить товары, попробуйте позднее');
      onLoad?.(false);
    }
  }
);

export const fetchProductDataAction = createAsyncThunk(ApiActions.ProductData, async (id: number) => {
  try {
    const { data } = await api.get(`${APIRoute.Product}/${id}?_embed=comments`);

    store.dispatch(loadProduct(data));
  } catch (error) {
    errorHandle(error);
    toast.error('Не удалось загрузить товар, попробуйте позднее');
    browserHistory.push('/*');
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
    toast.error('Не удалось отправить отзыв, попробуйте позднее');
    onSuccess?.(false);
  }
});

export const fetchSearchRequest = createAsyncThunk(ApiActions.SearchRequest, async ([request, onSuccess]: [string, Dispatch<SetStateAction<boolean>>?]) => {
  try {
    const { data } = await api.get(`${APIRoute.Products}?name_like=${request}`);
    store.dispatch(setSearchResult(data));
    onSuccess?.(false);
  } catch (error) {
    errorHandle(error);
    toast.error('Сервер не отвечает, попробуйте позднее');
    onSuccess?.(true);
  }
});

export const fetchCoupon = createAsyncThunk(ApiActions.Coupon, async ([coupon, onSuccess]: [string, Dispatch<SetStateAction<string | undefined>>?]) => {
  try {
    const { data } = await api.post(APIRoute.Coupons, { coupon });

    store.dispatch(setDiscount(data));
    onSuccess?.('success');
  } catch (error) {
    errorHandle(error);
    toast.dismiss('Данный купон устарел или не может быть применен');
    onSuccess?.('dismiss');
  }
});
