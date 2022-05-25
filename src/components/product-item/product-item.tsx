import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { IProduct } from '../../interfaces/product';
import { getComments } from '../../store/api-actions';
import { AppRoutes } from '../../utils/const';
import { RatingVocabulary } from '../../utils/vocabularies';
import RatingStars from '../rating-stars/rating-stars';

interface ProductItemProps {
  product: IProduct;
}

function ProductItem({ product }: ProductItemProps) {
  const { id, name, price, rating, previewImg } = product;

  const RatingInt = Math.round(rating);

  const [comments, setComments] = useState(0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getComments([id, setComments]));
  }, [dispatch, id]);

  return (
    <div className='product-card' key={id}>
      <img src={`/img/content/${previewImg}`} width={75} height={190} alt={name} />
      <div className='product-card__info'>
        <div className='rate product-card__rate'>
          <RatingStars RatingInt={RatingInt} className={'product-card__rate'} />
          <p className='visually-hidden'>Рейтинг:{RatingVocabulary[RatingInt]}</p>
          <p className='rate__count'>
            <span className='visually-hidden'>Всего оценок:</span>
            {comments}
          </p>
        </div>
        <p className='product-card__title'>{name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {price.toLocaleString('ru')} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <Link className='button button--mini' to={`/${AppRoutes.Product}/${id}`}>
          Подробнее
        </Link>
        <a className='button button--red button--mini button--add-to-cart' href='/'>
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductItem;
