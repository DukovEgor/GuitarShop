import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../../utils/const';
import { makeFakeProduct } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagintation';

describe('Component: Pagination', () => {
  const history = createMemoryHistory();

  const products = Array.from({ length: 20 }, makeFakeProduct);

  it('should render correctly when user navigates to "/catalog/page_1"', () => {
    history.push(`/${AppRoutes.Catalog}/${AppRoutes.DefaultPage}`);
    render(
      <HistoryRouter history={history}>
        <Pagination products={products} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toBeTruthy();
  });
});
