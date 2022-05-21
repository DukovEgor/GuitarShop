import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps/breadcrumps';
import RatingStars from '../../components/rating-stars/rating-stars';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction } from '../../store/api-actions';
import {
  GuitarTypeVocabulary,
  RatingVocabulary,
} from '../../utils/vocabularies';
import LoadingScreen from '../loading-screen/loading-screen';

export default function Product() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductAction(Number(id)));
    setLoading(false);
  }, [dispatch, id]);

  const { product } = useAppSelector(({ DATA }) => DATA);

  if (loading) {
    return <LoadingScreen />;
  }

  const {
    name,
    vendorCode,
    price,
    type,
    description,
    previewImg,
    stringCount,
    rating,
  } = product;

  const ratingInt = Math.round(rating);

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>{name}</h1>
        <Breadcrumps name={name} />
        <div className='product-container'>
          <img
            className='product-container__img'
            src={`/img/content/${previewImg}`}
            width={90}
            height={235}
            alt={name}
          />
          <div className='product-container__info-wrapper'>
            <h2 className='product-container__title title title--big title--uppercase'>
              {name}
            </h2>
            <div className='rate product-container__rating'>
              <RatingStars
                RatingInt={ratingInt}
                className={'product-container__rating'}
              />
              <p className='visually-hidden'>
                Оценка: {RatingVocabulary[ratingInt]}
              </p>
            </div>
            <div className='tabs'>
              <a
                className='button button--medium tabs__button'
                href='#characteristics'
              >
                Характеристики
              </a>
              <a
                className='button button--black-border button--medium tabs__button'
                href='#description'
              >
                Описание
              </a>
              <div className='tabs__content' id='characteristics'>
                <table className='tabs__table'>
                  <tbody>
                    <tr className='tabs__table-row'>
                      <td className='tabs__title'>Артикул:</td>
                      <td className='tabs__value'>{vendorCode}</td>
                    </tr>
                    <tr className='tabs__table-row'>
                      <td className='tabs__title'>Тип:</td>
                      <td className='tabs__value'>
                        {GuitarTypeVocabulary[type]}
                      </td>
                    </tr>
                    <tr className='tabs__table-row'>
                      <td className='tabs__title'>Количество струн:</td>
                      <td className='tabs__value'>{stringCount} струнная</td>
                    </tr>
                  </tbody>
                </table>
                <p className='tabs__product-description hidden'>
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div className='product-container__price-wrapper'>
            <p className='product-container__price-info product-container__price-info--title'>
              Цена:
            </p>
            <p className='product-container__price-info product-container__price-info--value'>
              {price?.toLocaleString('ru')} ₽
            </p>
            <a
              className='button button--red button--big product-container__button'
              href='/'
            >
              Добавить в корзину
            </a>
          </div>
        </div>
        <section className='reviews'>
          <h3 className='reviews__title title title--bigger'>Отзывы</h3>
          <a
            className='button button--red-border button--big reviews__sumbit-button'
            href='/'
          >
            Оставить отзыв
          </a>
          <div className='review'>
            <div className='review__wrapper'>
              <h4 className='review__title review__title--author title title--lesser'>
                Иванов Максим
              </h4>
              <span className='review__date'>12 декабря</span>
            </div>
            <div className='rate review__rating-panel'>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-star' />
              </svg>
              <p className='visually-hidden'>Оценка: Хорошо</p>
            </div>
            <h4 className='review__title title title--lesser'>Достоинства:</h4>
            <p className='review__value'>
              Хороший корпус, чистый звук, стурны хорошего качества
            </p>
            <h4 className='review__title title title--lesser'>Недостатки:</h4>
            <p className='review__value'>Тугие колонки</p>
            <h4 className='review__title title title--lesser'>Комментарий:</h4>
            <p className='review__value'>
              У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
              чехла и ремня.
            </p>
          </div>
          <div className='review'>
            <div className='review__wrapper'>
              <h4 className='review__title review__title--author title title--lesser'>
                Перова Ольга
              </h4>
              <span className='review__date'>12 декабря</span>
            </div>
            <div className='rate review__rating-panel'>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-star' />
              </svg>
              <p className='visually-hidden'>Оценка: Хорошо</p>
            </div>
            <h4 className='review__title title title--lesser'>Достоинства:</h4>
            <p className='review__value'>
              Хороший корпус, чистый звук, стурны хорошего качества
            </p>
            <h4 className='review__title title title--lesser'>Недостатки:</h4>
            <p className='review__value'>Тугие колонки</p>
            <h4 className='review__title title title--lesser'>Комментарий:</h4>
            <p className='review__value'>
              У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
              чехла и ремня.
            </p>
          </div>
          <div className='review'>
            <div className='review__wrapper'>
              <h4 className='review__title review__title--author title title--lesser'>
                Преображенская Ксения
              </h4>
              <span className='review__date'>12 декабря</span>
            </div>
            <div className='rate review__rating-panel'>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-full-star' />
              </svg>
              <svg width={16} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-star' />
              </svg>
              <p className='visually-hidden'>Оценка: Хорошо</p>
            </div>
            <h4 className='review__title title title--lesser'>Достоинства:</h4>
            <p className='review__value'>
              Хороший корпус, чистый звук, стурны хорошего качества
            </p>
            <h4 className='review__title title title--lesser'>Недостатки:</h4>
            <p className='review__value'>Тугие колонки</p>
            <h4 className='review__title title title--lesser'>Комментарий:</h4>
            <p className='review__value'>
              У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
              чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в
              компдлекте неть чехла и ремня. У гитары отличный цвет, хороше
              дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары
              отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
              ремня.
            </p>
          </div>
          <button className='button button--medium reviews__more-button'>
            Показать еще отзывы
          </button>
          <a
            className='button button--up button--red-border button--big reviews__up-button'
            href='#header'
          >
            Наверх
          </a>
        </section>
      </div>
    </main>
  );
}
