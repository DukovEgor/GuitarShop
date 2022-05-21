import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps/breadcrumps';
import ProductReviews from '../../components/product-reviews/product-reviews';
import ProductTabs from '../../components/product-tabs/product-tabs';
import RatingStars from '../../components/rating-stars/rating-stars';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentstAction, fetchProductAction } from '../../store/api-actions';
import { RatingVocabulary } from '../../utils/vocabularies';
import LoadingScreen from '../loading-screen/loading-screen';

export default function Product() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductAction(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCommentstAction(Number(id)));
    setLoading(false);
  }, [dispatch, id]);

  const { product, comments } = useAppSelector(({ DATA }) => DATA);

  if (loading) {
    return <LoadingScreen />;
  }

  const { name, vendorCode, price, type, description, previewImg, stringCount, rating } = product;

  const ratingInt = Math.round(rating);

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>{name}</h1>
        <Breadcrumps name={name} />
        <div className='product-container'>
          <img className='product-container__img' src={`/img/content/${previewImg}`} width={90} height={235} alt={name} />
          <div className='product-container__info-wrapper'>
            <h2 className='product-container__title title title--big title--uppercase'>{name}</h2>
            <div className='rate product-container__rating'>
              <RatingStars RatingInt={ratingInt} className={'product-container__rating'} />
              <p className='visually-hidden'>Оценка: {RatingVocabulary[ratingInt]}</p>
            </div>
            <ProductTabs vendorCode={vendorCode} type={type} description={description} stringCount={stringCount} />
          </div>
          <div className='product-container__price-wrapper'>
            <p className='product-container__price-info product-container__price-info--title'>Цена:</p>
            <p className='product-container__price-info product-container__price-info--value'>{price?.toLocaleString('ru')} ₽</p>
            <a className='button button--red button--big product-container__button' href='/'>
              Добавить в корзину
            </a>
          </div>
        </div>
        <ProductReviews comments={comments} name={name} />
      </div>
    </main>
  );
}
