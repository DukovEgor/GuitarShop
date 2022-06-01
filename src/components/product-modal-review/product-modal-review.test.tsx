import { fireEvent, render, screen } from '@testing-library/react';
import ProductModalReview from './product-modal-review';
import userEvent from '@testing-library/user-event';
import { INITIAL_STATE } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const store = configureMockStore()(INITIAL_STATE);

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
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Закрыть/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Отправить/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('input')).toBeInTheDocument();
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

    await user.click(screen.getByLabelText(/Отправить/i));

    expect(handleSuccess).toBeCalled();
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

    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Ваша Оценка/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Ваше Имя/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Достоинства/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Недостатки/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Комментарий/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Закрыть/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Отправить/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('input')).not.toBeInTheDocument();
  });

  it('should close the modal when user click "close button"', () => {
    const handleClose = jest.fn();
    const handleSuccess = jest.fn();

    render(
      <Provider store={store}>
        <ProductModalReview isModalOpened isSuccess={false} onModalClose={handleClose} onSuccess={handleSuccess} name={'test'} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Закрыть'));

    expect(handleClose).toHaveBeenCalledTimes(1);

    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Оставить отзыв/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Ваша Оценка/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Ваше Имя/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Достоинства/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Недостатки/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Комментарий/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Закрыть/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Отправить/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('input')).not.toBeInTheDocument();
  });
});
