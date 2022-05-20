import axios from 'axios';
import { useEffect } from 'react';
import { IProduct } from '../../interfaces/product';
import { errorHandle } from '../../services/error-handle';
import { RatingVocabulary } from '../../utils/vocabularies';
import RatingStars from '../rating-stars/rating-stars';

interface ProductItemProps {
  product: IProduct;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { id, name, price, rating, previewImg } = product;

  const RatingInt = Math.round(rating);

  let comments = [];

  const getComments = () => {
    axios
      .get('https://guitar-shop.accelerator.pages.academy/guitars/1/comments')
      .then((response) => {
        comments = response.data;
      })
      .catch((error) => {
        errorHandle(error);
      });
  };

  useEffect(() => {
    getComments();
  });

  return (
    <div className='product-card' key={id}>
      <img
        src={`img/content/${previewImg}`}
        width={75}
        height={190}
        alt={name}
      />
      <div className='product-card__info'>
        <div className='rate product-card__rate'>
          <RatingStars RatingInt={RatingInt} className={'product-card__rate'} />
          <p className='visually-hidden'>
            Рейтинг:{RatingVocabulary[RatingInt]}
          </p>
          <p className='rate__count'>
            <span className='visually-hidden'>Всего оценок:</span>
            {comments.length}
          </p>
        </div>
        <p className='product-card__title'>{name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {price.toLocaleString('ru')} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <a className='button button--mini' href='/'>
          Подробнее
        </a>
        <a
          className='button button--red button--mini button--add-to-cart'
          href='/'
        >
          Купить
        </a>
      </div>
    </div>
  );
}
