import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { INITIAL_STATE, makeFakeComment } from '../../utils/mocks';
import ProductReviews from './product-reviews';

const reviews = Array.from({ length: 10 }, makeFakeComment);
const mockStore = configureMockStore();
const store = mockStore({ data: INITIAL_STATE });

describe('component: "ProductReviews"', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ProductReviews comments={reviews} name={''} />
      </Provider>
    );

    expect(screen.getByTestId('review-button-close')).toBeInTheDocument();
    expect(screen.getByTestId('review-button-more')).toBeInTheDocument();
    expect(screen.getByTestId('review-button-up')).toBeInTheDocument();
  });
});
