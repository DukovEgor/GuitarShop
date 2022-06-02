import { fireEvent, render, screen } from '@testing-library/react';
import ProductModalReview from './product-modal-review';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mockProducts, mockProduct, mockComments } from '../../utils/mocks';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore({
  data: {
    products: mockProducts,
    product: mockProduct,
    comments: mockComments,
    isDataLoaded: true,
  },
});

describe('component: "ProductModalReview"', () => {
  it('should render correctly', () => {
    const handleClose = jest.fn();
    const handleSuccess = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalReview isModalOpened isSuccess={false} onModalClose={handleClose} onSuccess={handleSuccess} name={'test'} />
      </Provider>
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByTestId('Отправить')).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Закрыть/i)).toBeInTheDocument();
    expect(screen.getByTestId('Отправить')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).not.toBeFalsy();
  });

  it('rendering and submitting a form', async () => {
    const handleClose = jest.fn();
    const handleSuccess = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalReview isModalOpened isSuccess={false} onModalClose={handleClose} onSuccess={handleSuccess} name={'test'} />
      </Provider>
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Ваше Имя/i), 'testName');
    await user.type(screen.getByLabelText(/Достоинства/i), 'testAdv');
    await user.type(screen.getByLabelText(/Недостатки/i), 'testDis');
    await user.type(screen.getByLabelText(/Комментарий/i), 'testCom');

    await user.click(screen.getByTestId('test-star'));

    await user.click(screen.getByTestId('Отправить'));
  });

  it('should close the modal when user click outside', () => {
    const handleClose = jest.fn();
    const handleSuccess = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalReview isModalOpened isSuccess={false} onModalClose={handleClose} onSuccess={handleSuccess} name={'test'} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Скрыть'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when user click "close button"', async () => {
    const handleClose = jest.fn();
    const handleSuccess = jest.fn();

    await render(
      <Provider store={store}>
        <ProductModalReview isModalOpened isSuccess={false} onModalClose={handleClose} onSuccess={handleSuccess} name={'test'} />
      </Provider>
    );

    await fireEvent.click(screen.getByLabelText('Закрыть'));

    await expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
