import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { INITIAL_STATE, makeFakeProduct } from '../../utils/mocks';
import ProductList from './product-list';

const products = Array.from({ length: 10 }, makeFakeProduct);
const store = configureMockStore()(INITIAL_STATE);

describe('Component: ProductList', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <ProductList products={products} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
