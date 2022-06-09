/* eslint-disable no-console */
import { useParams, useSearchParams } from 'react-router-dom';
import Breadcrumps from '../breadcrumps/breadcrumps';
import Pagination from '../pagination/pagintation';
import ProductList from '../product-list/product-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';
import { fetchProductsAction } from '../../store/api-actions';
import { memo, useEffect, useState } from 'react';
import ProductListLoader from '../product-list-loader/product-list-loader';

function Catalog() {
  const dispatch = useAppDispatch();

  const { counter } = useParams();
  const [sortParams, setSortParams] = useSearchParams();
  const { products, productsCount } = useAppSelector(({ data }) => data);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentFilterTypes = sortParams.getAll('type');
  const isDisabled = (strings: number) => {
    switch (strings) {
      case 4:
        return !currentFilterTypes?.includes('ukulele') && !currentFilterTypes?.includes('electric') && currentFilterTypes.length > 0;
      case 6:
        return !currentFilterTypes?.includes('electric') && !currentFilterTypes?.includes('acoustic') && currentFilterTypes.length > 0;
      case 7:
        return !currentFilterTypes?.includes('electric') && !currentFilterTypes?.includes('acoustic') && currentFilterTypes.length > 0;
      case 12:
        return !currentFilterTypes?.includes('acoustic') && currentFilterTypes.length > 0;
      default:
        return true;
    }
  };
  //const currentFilterStrings = sortParams.getAll('stringCount');

  const currentSortType = sortParams.get('_sort') ? `&_sort=${sortParams.get('_sort')}` : '';
  const currentSortDirection = sortParams.get('_order') ? `&_order=${sortParams.get('_order')}` : '';
  const sortStroke = `${currentSortType}${currentSortDirection}`;

  const currentTypeFilter = sortParams.get('type') ? `&type=${currentFilterTypes.join('&type=')}` : '';
  const currentStringFilter = sortParams.get('stringCount') ? `&stringCount=${sortParams.getAll('stringCount').join('&stringCount=')}` : '';
  const filterStroke = `${currentTypeFilter}${currentStringFilter}`;

  const pages = Math.ceil(productsCount / PRUDUCTS_TO_SHOW);
  const currentPage = () => {
    if (!counter) {
      return 1;
    }
    if (pages === 1) {
      return 1;
    }
    if (Number(counter) > pages) {
      return pages;
    }
    return Number(counter);
  };

  const lastIndex = currentPage() * PRUDUCTS_TO_SHOW;
  const firstIndex = lastIndex - PRUDUCTS_TO_SHOW;

  useEffect(() => {
    setIsLoaded(false);
    const params = `${currentTypeFilter}${currentStringFilter}${currentSortType}${currentSortDirection}`;

    dispatch(fetchProductsAction([firstIndex, lastIndex, params, setIsLoaded]));
  }, [currentSortDirection, currentSortType, currentStringFilter, currentTypeFilter, dispatch, firstIndex, lastIndex]);
  // const stringVocabulary = {
  //   acoustic: [6, 7, 12],
  //   electric: [4, 6, 7],
  //   ukulele: [4],
  // };

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
        <Breadcrumps />
        <div className='catalog'>
          <form
            className='catalog-filter'
            onChange={(evt) => {
              console.log(evt.currentTarget.querySelectorAll('input[checked]'));
            }}
          >
            <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Цена, ₽</legend>
              <div className='catalog-filter__price-range'>
                <div className='form-input'>
                  <label className='visually-hidden'>Минимальная цена</label>
                  <input type='number' placeholder='1 000' id='priceMin' name='от' />
                </div>
                <div className='form-input'>
                  <label className='visually-hidden'>Максимальная цена</label>
                  <input type='number' placeholder='30 000' id='priceMax' name='до' />
                </div>
              </div>
            </fieldset>
            <fieldset
              className='catalog-filter__block'
              onChange={(evt) => {
                const typeParams = `${Array.from(evt.currentTarget.querySelectorAll('input'))
                  .map((check) => (check.checked ? check.name : undefined))
                  .join('&')}`;
                setSortParams(`${currentStringFilter}${typeParams}${sortStroke}`);
              }}
            >
              <legend className='catalog-filter__block-title'>Тип гитар</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='acoustic' name='type=acoustic' defaultChecked={currentTypeFilter.includes('acoustic')} />
                <label htmlFor='acoustic'>Акустические гитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='electric' name='type=electric' defaultChecked={currentTypeFilter.includes('electric')} />
                <label htmlFor='electric'>Электрогитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='ukulele' name='type=ukulele' defaultChecked={currentTypeFilter.includes('ukulele')} />
                <label htmlFor='ukulele'>Укулеле</label>
              </div>
            </fieldset>
            <fieldset
              className='catalog-filter__block'
              onChange={(evt) => {
                const typeParams = `${Array.from(evt.currentTarget.querySelectorAll('input'))
                  .map((check) => (check.checked ? check.name : undefined))
                  .join('&')}`;
                setSortParams(`${currentTypeFilter}&${typeParams}${sortStroke}`);
              }}
            >
              <legend className='catalog-filter__block-title'>Количество струн</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='4-strings' name='stringCount=4' />
                <label htmlFor='4-strings'>4</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='6-strings' name='stringCount=6' />
                <label htmlFor='6-strings'>6</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='7-strings' name='stringCount=7' />
                <label htmlFor='7-strings'>7</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='12-strings' name='stringCount=12' />
                <label htmlFor='12-strings'>12</label>
              </div>
            </fieldset>
            <button className='catalog-filter__reset-btn button button--black-border button--medium' type='reset'>
              Очистить
            </button>
          </form>
          <div className='catalog-sort'>
            <h2 className='catalog-sort__title'>Сортировать:</h2>
            <div className='catalog-sort__type'>
              <button
                className={`catalog-sort__type-button ${sortParams.get('_sort') === 'price' && 'catalog-sort__type-button--active'}`}
                aria-label='по цене'
                onClick={() => {
                  if (!currentSortDirection) {
                    setSortParams(`${filterStroke}&_sort=price&_order=asc`);
                  } else {
                    setSortParams(`${filterStroke}&_sort=price${currentSortDirection}`);
                  }
                }}
              >
                по цене
              </button>
              <button
                className={`catalog-sort__type-button ${sortParams.get('_sort') === 'rating' && 'catalog-sort__type-button--active'}`}
                aria-label='по популярности'
                onClick={() => {
                  if (!currentSortDirection) {
                    setSortParams(`${filterStroke}&_sort=rating&_order=asc`);
                  } else {
                    setSortParams(`${filterStroke}&_sort=rating${currentSortDirection}`);
                  }
                }}
              >
                по популярности
              </button>
            </div>
            <div className='catalog-sort__order'>
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--up ${sortParams.get('_order') === 'asc' && 'catalog-sort__order-button--active'}`}
                aria-label='По возрастанию'
                onClick={() => {
                  if (!currentSortType) {
                    setSortParams(`${filterStroke}&_sort=price&_order=asc`);
                  } else {
                    setSortParams(`${filterStroke}&${currentSortType}&_order=asc`);
                  }
                }}
              />
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--down ${sortParams.get('_order') === 'desc' && 'catalog-sort__order-button--active'}`}
                aria-label='По убыванию'
                onClick={() => {
                  if (!currentSortType) {
                    setSortParams(`${filterStroke}&_sort=price&_order=desc`);
                  } else {
                    setSortParams(`${filterStroke}&${currentSortType}&_order=desc`);
                  }
                }}
              />
            </div>
          </div>
          {isLoaded ? <ProductList products={products} /> : <ProductListLoader />}
          <Pagination currentPage={currentPage()} pages={pages} />
        </div>
      </div>
    </main>
  );
}

export default memo(Catalog);
