import { useParams, useSearchParams } from 'react-router-dom';
import Breadcrumps from '../breadcrumps/breadcrumps';
import Pagination from '../pagination/pagintation';
import ProductList from '../product-list/product-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';
import { fetchProductsAction } from '../../store/api-actions';
import { memo, useEffect, useRef, useState } from 'react';
import ProductListLoader from '../product-list-loader/product-list-loader';
import { stringVocabulary } from '../../utils/vocabularies';

function Catalog() {
  const dispatch = useAppDispatch();

  const { counter } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, productsCount } = useAppSelector(({ data }) => data);
  const { sortedProducts } = useAppSelector(({ process }) => process);
  const [isLoaded, setIsLoaded] = useState(false);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const currentSortType = searchParams.get('_sort') ? `&_sort=${searchParams.get('_sort')}` : '';
  const currentSortDirection = searchParams.get('_order') ? `&_order=${searchParams.get('_order')}` : '';
  const sortStroke = `${currentSortType}${currentSortDirection}`;

  const currentMinFilter = searchParams.get('price_gte') ? `&price_gte=${searchParams.get('price_gte')}` : '';
  const currentMaxFilter = searchParams.get('price_lte') ? `&price_lte=${searchParams.get('price_lte')}` : '';
  const currentPriceFilter = `${currentMinFilter}${currentMaxFilter}`;
  const currentTypeFilter = searchParams.get('type') ? `&type=${searchParams.getAll('type').join('&type=')}` : '';
  const currentStringFilter = searchParams.get('stringCount') ? `&stringCount=${searchParams.getAll('stringCount').join('&stringCount=')}` : '';
  const currentAvailableStrings = (strings: number) => {
    if (searchParams.getAll('type').length) {
      return !searchParams
        .getAll('type')
        .map((type) => stringVocabulary?.[type])
        .flat()
        .includes(strings);
    }
    return false;
  };
  const filterStroke = `${currentTypeFilter}${currentStringFilter}${currentPriceFilter}`;

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
    const filterParams = `${currentTypeFilter}${currentStringFilter}`;
    const sortParams = `${currentSortType}${currentSortDirection}`;

    dispatch(fetchProductsAction([firstIndex, lastIndex, filterParams, sortParams, currentPriceFilter, setIsLoaded]));
  }, [currentPriceFilter, currentSortDirection, currentSortType, currentStringFilter, currentTypeFilter, dispatch, firstIndex, lastIndex]);

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
        <Breadcrumps />
        <div className='catalog'>
          <form
            className='catalog-filter'
            onChange={(evt) => {
              const minFilter = minRef.current?.value ? `&price_gte=${Math.abs(Number(minRef.current.value))}` : '';
              const maxFilter = maxRef.current?.value ? `&price_lte=${Math.abs(Number(maxRef.current.value))}` : '';

              const availableStringsCount = new Set(
                Array.from(evt.currentTarget.querySelectorAll('input'))
                  .map((input) => (input.checked ? stringVocabulary[input.id] : null))
                  .flat()
              );
              availableStringsCount.delete(null);
              availableStringsCount.delete(undefined);
              setSearchParams(
                `${sortStroke}${Array.from(evt.currentTarget.querySelectorAll('input'))
                  .map((input) => {
                    if (!input.checked) {
                      return '';
                    }
                    if (availableStringsCount.size === 0) {
                      return input.name;
                    }
                    if (availableStringsCount.has(parseInt(input.id, 10))) {
                      return input.name;
                    }
                    return input.name.includes('type=') ? input.name : '';
                  })
                  .join('&')}${minFilter}${maxFilter}`
              );
            }}
          >
            <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Цена, ₽</legend>
              <div className='catalog-filter__price-range'>
                <div className='form-input'>
                  <label className='visually-hidden'>Минимальная цена</label>
                  <input
                    ref={minRef}
                    type='number'
                    placeholder={`${sortedProducts[0] ? sortedProducts[0].price : 0}`}
                    id='priceMin'
                    name='от'
                    min={sortedProducts[0]?.price || 0}
                    max={sortedProducts[sortedProducts.length - 1]?.price || 0}
                    onChange={(evt) => {
                      if (Number(evt.target.value) < 0) {
                        evt.target.value = String(0);
                      }
                      if (Number(evt.target.value) > sortedProducts[sortedProducts.length - 1]?.price) {
                        evt.target.value = String(sortedProducts[sortedProducts.length - 1]?.price);
                      }
                      if (Number(evt.target.value) < sortedProducts[0]?.price) {
                        evt.target.value = String(sortedProducts[0]?.price);
                      }
                    }}
                  />
                </div>
                <div className='form-input'>
                  <label className='visually-hidden'>Максимальная цена</label>
                  <input
                    ref={maxRef}
                    type='number'
                    placeholder={`${sortedProducts[sortedProducts.length - 1] ? sortedProducts[sortedProducts.length - 1]?.price : 0}`}
                    id='priceMax'
                    name='до'
                    min={0}
                    onChange={(evt) => {
                      if (Number(evt.target.value) < 0) {
                        evt.target.value = String(0);
                      }
                      if (Number(evt.target.value) < sortedProducts[0]?.price) {
                        evt.target.value = String(sortedProducts[0]?.price);
                      }
                      if (Number(evt.target.value) > sortedProducts[sortedProducts.length - 1]?.price) {
                        evt.target.value = String(sortedProducts[sortedProducts.length - 1]?.price);
                      }
                    }}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className='catalog-filter__block'>
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
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Количество струн</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input
                  className='visually-hidden'
                  type='checkbox'
                  id='4-strings'
                  name='stringCount=4'
                  defaultChecked={currentStringFilter.includes('stringCount=4')}
                  disabled={currentAvailableStrings(4)}
                />
                <label htmlFor='4-strings'>4</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input
                  className='visually-hidden'
                  type='checkbox'
                  id='6-strings'
                  name='stringCount=6'
                  defaultChecked={currentStringFilter.includes('stringCount=6')}
                  disabled={currentAvailableStrings(6)}
                />
                <label htmlFor='6-strings'>6</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input
                  className='visually-hidden'
                  type='checkbox'
                  id='7-strings'
                  name='stringCount=7'
                  defaultChecked={currentStringFilter.includes('stringCount=7')}
                  disabled={currentAvailableStrings(7)}
                />
                <label htmlFor='7-strings'>7</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input
                  className='visually-hidden'
                  type='checkbox'
                  id='12-strings'
                  name='stringCount=12'
                  defaultChecked={currentStringFilter.includes('stringCount=12')}
                  disabled={currentAvailableStrings(12)}
                />
                <label htmlFor='12-strings'>12</label>
              </div>
            </fieldset>
            <button className='catalog-filter__reset-btn button button--black-border button--medium' type='reset' onClick={() => setSearchParams(`${sortStroke}`)}>
              Очистить
            </button>
          </form>
          <div className='catalog-sort'>
            <h2 className='catalog-sort__title'>Сортировать:</h2>
            <div className='catalog-sort__type'>
              <button
                className={`catalog-sort__type-button ${searchParams.get('_sort') === 'price' && 'catalog-sort__type-button--active'}`}
                aria-label='по цене'
                onClick={() => {
                  if (!currentSortDirection) {
                    setSearchParams(`${filterStroke}&_sort=price&_order=asc`);
                  } else {
                    setSearchParams(`${filterStroke}&_sort=price${currentSortDirection}`);
                  }
                }}
              >
                по цене
              </button>
              <button
                className={`catalog-sort__type-button ${searchParams.get('_sort') === 'rating' && 'catalog-sort__type-button--active'}`}
                aria-label='по популярности'
                onClick={() => {
                  if (!currentSortDirection) {
                    setSearchParams(`${filterStroke}&_sort=rating&_order=asc`);
                  } else {
                    setSearchParams(`${filterStroke}&_sort=rating${currentSortDirection}`);
                  }
                }}
              >
                по популярности
              </button>
            </div>
            <div className='catalog-sort__order'>
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--up ${searchParams.get('_order') === 'asc' && 'catalog-sort__order-button--active'}`}
                aria-label='По возрастанию'
                onClick={() => {
                  if (!currentSortType) {
                    setSearchParams(`${filterStroke}&_sort=price&_order=asc`);
                  } else {
                    setSearchParams(`${filterStroke}&${currentSortType}&_order=asc`);
                  }
                }}
              />
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--down ${searchParams.get('_order') === 'desc' && 'catalog-sort__order-button--active'}`}
                aria-label='По убыванию'
                onClick={() => {
                  if (!currentSortType) {
                    setSearchParams(`${filterStroke}&_sort=price&_order=desc`);
                  } else {
                    setSearchParams(`${filterStroke}&${currentSortType}&_order=desc`);
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
