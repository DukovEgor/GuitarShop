import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { INITIAL_STATE } from '../../utils/mocks';
import Catalog from './catalog';

const mockStore = configureMockStore();
const store = mockStore({ data: INITIAL_STATE });

describe('Component: Catalog', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
