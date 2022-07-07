import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { INITIAL_CART, INITIAL_DATA, INITIAL_PROCESS, mockProduct } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';
import CartItem from './cart-item';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const product = { ...mockProduct, count: 2 };
const store = mockStore({ data: INITIAL_DATA, process: INITIAL_PROCESS, cart: { ...INITIAL_CART, cartProducts: [product] } });

const history = createMemoryHistory();

const fakeCart = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CartItem product={product} />
    </HistoryRouter>
  </Provider>
);

describe('Application CartItem', () => {
  it('should reduce counter', async () => {
    render(fakeCart);

    const input = screen.getByTestId('counter') as HTMLInputElement;
    const user = userEvent.setup();

    await user.click(screen.getByTestId('minus-btn'));
    await expect(input.value).toBe('1');
  });
  it('should increase counter', async () => {
    render(fakeCart);

    const input = screen.getByTestId('counter') as HTMLInputElement;
    const user = userEvent.setup();

    await user.click(screen.getByTestId('plus-btn'));
    await expect(input.value).toBe('3');
  });
});
