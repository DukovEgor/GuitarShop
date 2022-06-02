import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { INITIAL_STATE } from '../../utils/mocks';
import Product from './product';

const mockStore = configureMockStore();
const store = mockStore({ data: INITIAL_STATE });

describe('Component: Product', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Product />
      </Provider>
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
