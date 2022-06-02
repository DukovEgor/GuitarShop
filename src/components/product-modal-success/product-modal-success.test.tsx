import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { INITIAL_STATE } from '../../utils/mocks';
import ProductModalSuccess from './product-modal-success';

const mockStore = configureMockStore();
const store = mockStore({ data: INITIAL_STATE });

describe('component: "ProductModalSuccess"', () => {
  it('should render correctly', () => {
    const handleClose = jest.fn();
    const handleRemove = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalSuccess isModalOpened isSuccess onModalClose={handleClose} onModalRemove={handleRemove} />
      </Provider>
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('should close the modal when user click outside', () => {
    const handleClose = jest.fn();
    const handleRemove = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalSuccess isModalOpened isSuccess onModalClose={handleClose} onModalRemove={handleRemove} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Скрыть'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when user click "close button"', () => {
    const handleClose = jest.fn();
    const handleRemove = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalSuccess isModalOpened isSuccess onModalClose={handleClose} onModalRemove={handleRemove} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Закрыть'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when user click "К покупкам"', () => {
    const handleClose = jest.fn();
    const handleRemove = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalSuccess isModalOpened isSuccess onModalClose={handleClose} onModalRemove={handleRemove} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Каталог'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
