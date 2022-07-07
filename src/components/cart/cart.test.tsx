import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { INITIAL_CART, INITIAL_DATA, INITIAL_PROCESS } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Cart from './cart';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore({ data: INITIAL_DATA, process: INITIAL_PROCESS, cart: INITIAL_CART });

const history = createMemoryHistory();

const fakeCart = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Cart />
    </HistoryRouter>
  </Provider>
);

describe('Application Cart', () => {
  it('should render correctly', () => {
    render(fakeCart);

    expect(screen.getAllByText(/Корзина/i)).toBeTruthy();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toBeTruthy();
    expect(screen.getAllByRole('link')).toBeTruthy();
  });

  it('is possible to enter a promocode and send it, receive a message in case of an error', async () => {
    render(fakeCart);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Введите промокод'), 'testCoupon');
    await user.click(screen.getByText('Применить'));
  });
});
