import { render } from '@testing-library/react';
import RatingStars from './rating-stars';

describe('Component: RatingStars', () => {
  test('should render correctly without additional props', () => {
    const { container } = render(<RatingStars RatingInt={0} />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly 3 red stars of 5 because rating is 3', () => {
    const ratingInt = 3;

    const { container } = render(<RatingStars RatingInt={ratingInt} />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly width of stars with different className', () => {
    const ratingInt = 3;

    const { container } = render(<RatingStars RatingInt={ratingInt} className='review__rating-panel' />);
    expect(container).toMatchSnapshot();
  });
});
