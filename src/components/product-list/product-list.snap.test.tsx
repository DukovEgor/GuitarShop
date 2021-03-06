import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { mockProduct, mockProducts } from '../../utils/mocks';
import ProductList from './product-list';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore({
  data: {
    products: mockProducts,
    product: mockProduct,
  },
});

describe('Component: ProductList', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductList products={[]} />
        </BrowserRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
