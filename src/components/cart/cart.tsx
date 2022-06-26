import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectCartProducts, selectDiscount, selectSubtotal, selectTotal } from '../../store/cart-data/cart-selectors';
import { capitalize } from '../../utils/utils';
import { GuitarTypeVocabulary } from '../../utils/vocabularies';
import Breadcrumps from '../breadcrumps/breadcrumps';

function Cart() {
  const cartProducts = useAppSelector(selectCartProducts);
  const subtotal = useAppSelector(selectSubtotal);
  const discount = useAppSelector(selectDiscount);
  const total = useAppSelector(selectTotal);

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='title title--bigger page-content__title'>Корзина</h1>
        <Breadcrumps name='Корзина' />
        <div className='cart'>
          {cartProducts.map((product) => {
            const { id, name, vendorCode, stringCount, type, price, previewImg } = product;
            return (
              <div className='cart-item' key={id}>
                <button className='cart-item__close-button button-cross' type='button' aria-label='Удалить'>
                  <span className='button-cross__icon' />
                  <span className='cart-item__close-button-interactive-area' />
                </button>
                <div className='cart-item__image'>
                  <img src={`/img/content/${previewImg}`} width={55} height={130} alt='ЭлектроГитара Честер bass' />
                </div>
                <div className='product-info cart-item__info'>
                  <p className='product-info__title'>{name}</p>
                  <p className='product-info__info'>Артикул: {vendorCode}</p>
                  <p className='product-info__info'>
                    {GuitarTypeVocabulary[capitalize(type)]}, {stringCount} струнная
                  </p>
                </div>
                <div className='cart-item__price'>{price.toLocaleString('ru-RU')} ₽</div>
                <div className='quantity cart-item__quantity'>
                  <button className='quantity__button' aria-label='Уменьшить количество'>
                    <svg width={8} height={8} aria-hidden='true'>
                      <use xlinkHref='#icon-minus' />
                    </svg>
                  </button>
                  <input className='quantity__input' type='number' placeholder='1' id='2-count' name='2-count' max={99} />
                  <button className='quantity__button' aria-label='Увеличить количество'>
                    <svg width={8} height={8} aria-hidden='true'>
                      <use xlinkHref='#icon-plus' />
                    </svg>
                  </button>
                </div>
                <div className='cart-item__price-total'>17 500 ₽</div>
              </div>
            );
          })}
          <div className='cart__footer'>
            <div className='cart__coupon coupon'>
              <h2 className='title title--little coupon__title'>Промокод на скидку</h2>
              <p className='coupon__info'>Введите свой промокод, если он у вас есть.</p>
              <form className='coupon__form' id='coupon-form' method='post' action='/'>
                <div className='form-input coupon__input'>
                  <label className='visually-hidden'>Промокод</label>
                  <input type='text' placeholder='Введите промокод' id='coupon' name='coupon' />
                  <p className='form-input__message form-input__message--success'>Промокод принят</p>
                </div>
                <button className='button button--big coupon__button'>Применить</button>
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
