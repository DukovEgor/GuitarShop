import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../breadcrumps/breadcrumps';
import ProductReviews from '../product-reviews/product-reviews';
import ProductTabs from '../product-tabs/product-tabs';
import RatingStars from '../rating-stars/rating-stars';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductDataAction } from '../../store/api-actions';
import { RatingVocabulary } from '../../utils/vocabularies';
import LoadingScreen from '../loading-screen/loading-screen';
import { showModalAdd } from '../../store/cart-data/cart-data';

function Product() {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector(({ data }) => data);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProductDataAction(Number(id)));
    setLoading(false);
  }, [dispatch, id]);

  const { name, vendorCode, price, type, description, previewImg, stringCount, rating, comments } = product;

  const ratingInt = Math.round(rating);

  if (loading) {
    return <LoadingScreen />;
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

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
              <p className='rate__count'>
                <span className='visually-hidden'>Всего оценок:</span>
                {comments.length}
              </p>
            </div>
            <ProductTabs vendorCode={vendorCode} type={type} description={description} stringCount={stringCount} />
          </div>
          <div className='product-container__price-wrapper'>
            <p className='product-container__price-info product-container__price-info--title'>Цена:</p>
            <p className='product-container__price-info product-container__price-info--value'>{price?.toLocaleString('ru')} ₽</p>
            <button
              className='button button--red button--big product-container__button'
              onClick={() => {
                dispatch(showModalAdd(product));
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
        <ProductReviews comments={comments} name={name} />
      </div>
    </main>
  );
}

export default Product;
