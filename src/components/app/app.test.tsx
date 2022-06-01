import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoutes } from '../../utils/const';
import App from './app';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: { isDataLoaded: true },
});

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
    history.push(`${AppRoutes.Product}/1/${AppRoutes.Characteristics}`);

    render(fakeApp);

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should render "404 page" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('UH OH! You`re lost.')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
