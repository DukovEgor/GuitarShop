import { render } from '@testing-library/react';
import SvgSprite from './svg-sprite';

describe('Component: SvgSprite', () => {
  test('should render correctly', () => {
    const { container } = render(<SvgSprite />);

    expect(container).toMatchSnapshot();
  });
});
