import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { INITIAL_STATE, makeFakeProduct } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ProductItem from './product-item';

const product = makeFakeProduct();
const mockStore = configureMockStore();
const store = mockStore({ data: INITIAL_STATE });
const history = createMemoryHistory();

describe('Component: ProductItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductItem product={product} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
