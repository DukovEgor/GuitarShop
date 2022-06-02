import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

describe('Component: Header', () => {
  test('should render correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
