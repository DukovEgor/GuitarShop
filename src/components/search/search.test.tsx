import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { INITIAL_DATA, INITIAL_PROCESS } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Search from './search';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const history = createMemoryHistory();

describe('Component: Breadcrumps', () => {
  it('should render correctly without additional props', () => {
    const store = mockStore({ data: INITIAL_DATA, process: INITIAL_PROCESS });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should reset search input when user click reset button', async () => {
    const store = mockStore({ data: INITIAL_DATA, process: INITIAL_PROCESS });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>
    );

    const user = userEvent.setup();

    await user.type(screen.getByTestId('search-input'), 'testName');

    await expect(screen.getByTestId('search-input')).toHaveValue('testName');

    await user.click(screen.getByTestId('reset-search'));

    await expect(screen.queryByText('testName')).not.toBeInTheDocument();
  });
});
