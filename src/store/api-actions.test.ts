import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../utils/const';
import { makeFakeComment, makeFakeProduct, makeFakeReview } from '../utils/mocks';
import { fetchProductDataAction, fetchProductsAction, fetchReviewAction } from './api-actions';
import { addComment, loadProduct, loadProducts } from './app-data/app-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch loadProducts when GET /products', async () => {
    const mockProducts = Array.from({ length: 5 }, makeFakeProduct);

    mockAPI.onGet(APIRoute.Products).reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(fetchProductsAction([0, 9, '', '', '']));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(`${loadProducts.toString()}/fulfilled`);
  });

  it('should dispatch loadProduct when GET /comments', async () => {
    const mockComments = Array.from({ length: 5 }, makeFakeComment);
    const mockId = 1;

    mockAPI.onGet(`${APIRoute.Product}/${mockId}${APIRoute.Comments}`).reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchProductDataAction(mockId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(`${loadProduct.toString()}/fulfilled`);
  });

  it('should dispatch addComment when POST /comments', async () => {
    const mockReview = makeFakeReview();
    const mockComment = makeFakeComment();

    mockAPI.onPost(APIRoute.Comments).reply(201, mockComment);

    const store = mockStore();
    await store.dispatch(fetchReviewAction([{ ...mockReview }]));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(`${addComment.toString()}/fulfilled`);
  });
});
