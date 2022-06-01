import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeProduct } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ProductTabs from './product-tabs';

const product = makeFakeProduct();
const { vendorCode, type, description, stringCount } = product;
const history = createMemoryHistory();

describe('component: "ProductTabs"', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductTabs vendorCode={vendorCode} type={type} description={description} stringCount={stringCount} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('tabs-link-characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('tabs-link-description')).toBeInTheDocument();
  });
});
