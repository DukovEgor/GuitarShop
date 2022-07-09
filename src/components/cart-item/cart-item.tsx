import { ChangeEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { IProduct } from '../../interfaces/product';
import { raiseProductQuantity, reduceProductQuantity, setProductQuantity, showModalDelete } from '../../store/cart-data/cart-data';
import { capitalize } from '../../utils/utils';
import { GuitarTypeVocabulary } from '../../utils/vocabularies';

interface cartItemProps {
  product: IProduct;
}

function CartItem({ product }: cartItemProps) {
  const { id, name, vendorCode, stringCount, type, price, previewImg, count } = product;

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (+evt.target.value < 1) {
      evt.target.value = '1';
      dispatch(setProductQuantity({ id, count: 1 }));
      return;
    }

    if (+evt.target.value > 99) {
      return;
    }
    dispatch(setProductQuantity({ id, count: +evt.target.value }));
  };

  return (
    <div className='cart-item' key={id}>
      <button className='cart-item__close-button button-cross' type='button' aria-label='Удалить' onClick={() => dispatch(showModalDelete(product))}>
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
        <button
          className='quantity__button'
          aria-label='Уменьшить количество'
          data-testid='minus-btn'
          onClick={() => {
            if (Number(inputRef.current?.value) === 1) {
              dispatch(reduceProductQuantity(product));
              return;
            }
            if (inputRef.current?.value) {
              inputRef.current.value = `${count - 1}`;
            }
            dispatch(reduceProductQuantity(product));
          }}
        >
          <svg width={8} height={8} aria-hidden='true'>
            <use xlinkHref='#icon-minus' />
          </svg>
        </button>
        <input
          className='quantity__input'
          type='number'
          placeholder={String(count)}
          id='2-count'
          name='2-count'
          max={99}
          ref={inputRef}
          defaultValue={count}
          data-testid='counter'
          onBlur={handleNumberChange}
        />
        <button
          className='quantity__button'
          data-testid='plus-btn'
          aria-label='Увеличить количество'
          disabled={Number(inputRef.current?.value) === 99}
          onClick={() => {
            if (inputRef.current?.value) {
              inputRef.current.value = `${count + 1}`;
            }
            dispatch(raiseProductQuantity(id));
          }}
        >
          <svg width={8} height={8} aria-hidden='true'>
            <use xlinkHref='#icon-plus' />
          </svg>
        </button>
      </div>
      <div className='cart-item__price-total'>{(price * count).toLocaleString('ru-RU')} ₽</div>
    </div>
  );
}

export default CartItem;
