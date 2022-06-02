import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import NotFound from './404';

const history = createMemoryHistory();
describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404');
    const linkElement = screen.getByText('Home');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
