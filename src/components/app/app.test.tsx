import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoutes } from '../../utils/const';
import App from './app';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { INITIAL_CART, INITIAL_DATA, INITIAL_PROCESS } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { State } from '../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore({ data: INITIAL_DATA, process: INITIAL_PROCESS, cart: INITIAL_CART });

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Catalog" when user navigate to "/"', () => {
    history.push(AppRoutes.Root);

    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/product/:id/:characteristics"', () => {
    history.push(`/${AppRoutes.Product}/1/${AppRoutes.Characteristics}`);

    render(fakeApp);

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should render "404 page" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('UH OH! You`re lost.')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
