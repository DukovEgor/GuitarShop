import { render } from '@testing-library/react';
import Product from './product';
import { Provider } from 'react-redux';
import { INITIAL_STATE } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';

const store = configureMockStore()(INITIAL_STATE);

describe('Component: Product', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Product />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
