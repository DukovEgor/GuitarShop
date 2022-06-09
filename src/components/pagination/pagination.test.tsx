import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../../utils/const';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagintation';

describe('Component: Pagination', () => {
  const history = createMemoryHistory();

  it('should render correctly when user navigates to "/catalog/page_1"', () => {
    history.push(`/${AppRoutes.Catalog}/${AppRoutes.DefaultPage}`);
    render(
      <HistoryRouter history={history}>
        <Pagination currentPage={1} pages={2} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toBeTruthy();
  });
});
