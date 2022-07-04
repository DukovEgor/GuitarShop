/* eslint-disable no-console */
import { memo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCoupon } from '../../store/api-actions';
import { selectCartProducts, selectDiscount, selectSubtotal, selectTotal } from '../../store/cart-data/cart-selectors';
import Breadcrumps from '../breadcrumps/breadcrumps';
import CartItem from '../cart-item/cart-item';

function Cart() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>();

  const cartProducts = useAppSelector(selectCartProducts);
  const subtotal = useAppSelector(selectSubtotal);
  const discount = useAppSelector(selectDiscount);
  const total = useAppSelector(selectTotal);

  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const handleCouponSubmit: SubmitHandler<FieldValues> = ({ coupon }) => {
    dispatch(fetchCoupon([coupon.trim(), setError]));
    reset();
  };

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='title title--bigger page-content__title'>Корзина</h1>
        <Breadcrumps name='Корзина' />
        <div className='cart'>
          {cartProducts.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          <div className='cart__footer'>
            <div className='cart__coupon coupon'>
              <h2 className='title title--little coupon__title'>Промокод на скидку</h2>
              <p className='coupon__info'>Введите свой промокод, если он у вас есть.</p>
              <form className='coupon__form' id='coupon-form' method='post' onSubmit={handleSubmit(handleCouponSubmit)}>
                <div className='form-input coupon__input'>
                  <label className='visually-hidden'>Промокод</label>
                  <input type='text' placeholder='Введите промокод' id='coupon' {...register('coupon')} />
                  <p className={`form-input__message ${error === 'dismiss' && 'form-input__message--error'} ${error === 'success' && 'form-input__message--success'}`}>
                    {error === 'success' && 'Промокод принят'} {error === 'dismiss' && 'Неверный промокод'}
                  </p>
                </div>
                <button className='button button--big coupon__button' type='submit'>
                  Применить
                </button>
              </form>
            </div>
            <div className='cart__total-info'>
              <p className='cart__total-item'>
                <span className='cart__total-value-name'>Всего:</span>
                <span className='cart__total-value'>{subtotal.toLocaleString('ru-RU')} ₽</span>
              </p>
              <p className='cart__total-item'>
                <span className='cart__total-value-name'>Скидка:</span>
                <span className={`cart__total-value ${discount && 'cart__total-value--bonus '}`}>- {discount.toLocaleString('ru-RU')} ₽</span>
              </p>
              <p className='cart__total-item'>
                <span className='cart__total-value-name'>К оплате:</span>
                <span className='cart__total-value cart__total-value--payment'>{total.toLocaleString('ru-RU')} ₽</span>
              </p>
              <button className='button button--red button--big cart__order-button'>Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default memo(Cart);
