import { ChangeEvent, useState } from 'react';
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

  const [number, setNumber] = useState(count);

  const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (+evt.target.value < 1) {
      setNumber(1);

      return;
    }

    if (+evt.target.value > 99) {
      setNumber(99);

      return;
    }
    setNumber(Number(evt.target.value));
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
          disabled={number === 1}
          onClick={() => {
            setNumber((prev) => prev - 1);
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
          placeholder={String(number)}
          id='2-count'
          name='2-count'
          max={99}
          value={number}
          onBlur={handleNumberChange}
          onChange={handleNumberChange}
        />
        <button
          className='quantity__button'
          aria-label='Увеличить количество'
          disabled={number === 99}
          onClick={() => {
            setNumber((prev) => prev + 1);
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
