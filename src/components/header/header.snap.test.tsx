import { render } from '@testing-library/react';
import Header from './header';

describe('Component: Header', () => {
  test('should render correctly', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
