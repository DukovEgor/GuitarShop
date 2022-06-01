import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import ProductReview from './product-review';

const review = makeFakeComment();

describe('component: "ProductReview"', () => {
  it('should render correctly', () => {
    render(<ProductReview review={review} />);

    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
});
