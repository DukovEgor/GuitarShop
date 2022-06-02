import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';
import Breadcrumps from './breadcrumps';
import { AppRoutes } from '../../utils/const';

const history = createMemoryHistory();

describe('Component: Breadcrumps', () => {
  it('should render correctly without additional props', () => {
    render(
      <HistoryRouter history={history}>
        <Breadcrumps />
      </HistoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render "Каталог" if PageLocation matches AppRoutes.Catalog/AppRoutes.Page:counter', () => {
    history.push(`${AppRoutes.Catalog}/${AppRoutes.Page}1`);
    render(
      <HistoryRouter history={history}>
        <Breadcrumps name='test' />
      </HistoryRouter>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toBeTruthy();
  });

  it('should render "pageName" if pageName passed as a parameter', () => {
    const pageName = 'mockGuitarName';

    render(
      <HistoryRouter history={history}>
        <Breadcrumps name={pageName} />
      </HistoryRouter>
    );

    expect(screen.getByText(new RegExp(pageName, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toBeTruthy();
  });

  it('should redirect to root url when user clicked to link', async () => {
    await history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<h1>This is main page</h1>} />
          <Route path='fake' element={<Breadcrumps />} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText('This is main page')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(/Главная/i));

    expect(screen.getByText('This is main page')).toBeInTheDocument();
  });
});
