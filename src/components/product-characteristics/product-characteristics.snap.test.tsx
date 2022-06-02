import { render } from '@testing-library/react';
import ProductCharacteristics from './product-characteristics';

describe('Component: ProductCharacteristics', () => {
  test('should render correctly', () => {
    const { container } = render(<ProductCharacteristics vendorCode={'123f'} type={'electric'} description={'description'} stringCount={7} />);

    expect(container).toMatchSnapshot();
  });
});
