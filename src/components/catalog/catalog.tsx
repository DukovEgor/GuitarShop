import { useParams, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../breadcrumps/breadcrumps';
import Pagination from '../pagination/pagintation';
import ProductList from '../product-list/product-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import ProductListLoader from '../product-list-loader/product-list-loader';
import { fetchProductsAction } from '../../store/api-actions';
import { getCurrentPage } from '../../utils/utils';
import { stringVocabulary } from '../../utils/vocabularies';

function Catalog() {
  const dispatch = useAppDispatch();

  const { products, productsCount } = useAppSelector(({ data }) => data);

  const { counter } = useParams();
  const [params, setParams] = useSearchParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const pages = Math.ceil(productsCount / PRUDUCTS_TO_SHOW);
  const currentPage = getCurrentPage(counter, pages);

  const lastIndex = currentPage * PRUDUCTS_TO_SHOW;
  const firstIndex = lastIndex - PRUDUCTS_TO_SHOW;

  const currentTypeFilter = params.get('type') ? `&type=${params.getAll('type').join('&type=')}` : '';
  const currentStringFilter = params.get('stringCount') ? `&stringCount=${params.getAll('stringCount').join('&stringCount=')}` : '';

  useEffect(() => {
    setIsLoaded(false);
    dispatch(fetchProductsAction([firstIndex, lastIndex, params.toString(), `${currentTypeFilter}${currentStringFilter}`, setIsLoaded]));
  }, [currentStringFilter, currentTypeFilter, dispatch, firstIndex, lastIndex, params]);

  const currentSortType = params.get('_sort') ? `&_sort=${params.get('_sort')}` : '';
  const currentSortDirection = params.get('_order') ? `&_order=${params.get('_order')}` : '';
  const sortStroke = `${currentSortType}${currentSortDirection}`;
  const currentMinFilter = params.get('price_gte') ? `&price_gte=${params.get('price_gte')}` : '';
  const currentMaxFilter = params.get('price_lte') ? `&price_lte=${params.get('price_lte')}` : '';
  const currentPriceFilter = `${currentMinFilter}${currentMaxFilter}`;

  const currentAvailableStrings = (strings: number) => {
    if (params.getAll('type').length) {
      return !params
        .getAll('type')
        .map((type) => stringVocabulary?.[type])
        .flat()
        .includes(strings);
    }
    return false;
  };
  const filterStroke = `${currentTypeFilter}${currentStringFilter}${currentPriceFilter}`;

  const { sortedProducts } = useAppSelector(({ process }) => process);

  const handlePriceFilter = useCallback(
    (evt: { currentTarget: HTMLInputElement }, filter = 'price_gte') => {
      const input = evt.currentTarget;
      const currentMin = Number(params.get('price_gte'));

      if (+input.value < 0) {
        input.value = '0';
      }
      if (+input.value < sortedProducts[0].price) {
        input.value = `${sortedProducts[0].price}`;
      }
      if (+input.value > sortedProducts[sortedProducts.length - 1].price) {
        input.value = `${sortedProducts[sortedProducts.length - 1].price}`;
      }
      if (filter === 'price_lte' && +input.value < currentMin) {
        input.value = `${currentMin}`;
      }
      params.set(filter, input.value);

      setParams(params);
    },
    [params, setParams, sortedProducts]
  );

  const handleFilter = useCallback(
    (evt: FormEvent) => {
      const searchInput = evt.target as HTMLInputElement;
      if (searchInput.type === 'number') {
        return;
      }
      const inputs = Array.from(evt.currentTarget.querySelectorAll('input'));

      const availableStringsCount = new Set(inputs.map((input) => (input.checked ? stringVocabulary[input.id] : null)).flat());

      availableStringsCount.delete(null);
      availableStringsCount.delete(undefined);

      setParams(
        `${currentPriceFilter}${inputs
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
          .join('&')}${sortStroke}`
      );
    },
    [currentPriceFilter, setParams, sortStroke]
  );

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
        <Breadcrumbs />
        <div className='catalog'>
          <form className='catalog-filter' onChange={handleFilter}>
            <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Цена, ₽</legend>
              <div className='catalog-filter__price-range'>
                <div className='form-input'>
                  <label className='visually-hidden'>Минимальная цена</label>
                  <input
                    type='number'
                    placeholder={`${sortedProducts[0] ? sortedProducts[0].price : 0}`}
                    id='priceMin'
                    name='от'
                    min={sortedProducts[0]?.price || 0}
                    max={sortedProducts[sortedProducts.length - 1]?.price || 0}
                    defaultValue={params ? `${params?.get('price_gte')}` : ''}
                    onBlur={handlePriceFilter}
                    onKeyDown={(evt) => {
                      if (evt.key === 'Enter') {
                        handlePriceFilter(evt);
                      }
                    }}
                  />
                </div>
                <div className='form-input'>
                  <label className='visually-hidden'>Максимальная цена</label>
                  <input
                    type='number'
                    placeholder={`${sortedProducts[sortedProducts.length - 1] ? sortedProducts[sortedProducts.length - 1]?.price : 0}`}
                    id='priceMax'
                    name='до'
                    min={0}
                    defaultValue={params.get('price_lte') || ''}
                    onBlur={(evt) => handlePriceFilter(evt, 'price_lte')}
                    onKeyDown={(evt) => {
                      if (evt.key === 'Enter') {
                        handlePriceFilter(evt, 'price_lte');
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
            <button className='catalog-filter__reset-btn button button--black-border button--medium' type='reset' onClick={() => setParams(`${sortStroke}`)}>
              Очистить
            </button>
          </form>
          <div className='catalog-sort'>
            <h2 className='catalog-sort__title'>Сортировать:</h2>
            <div className='catalog-sort__type'>
              <button
                className={`catalog-sort__type-button ${params.get('_sort') === 'price' && 'catalog-sort__type-button--active'}`}
                aria-label='по цене'
                onClick={() => {
                  if (!currentSortDirection) {
                    setParams(`${filterStroke}&_sort=price&_order=asc`);
                  } else {
                    setParams(`${filterStroke}&_sort=price${currentSortDirection}`);
                  }
                }}
              >
                по цене
              </button>
              <button
                className={`catalog-sort__type-button ${params.get('_sort') === 'rating' && 'catalog-sort__type-button--active'}`}
                aria-label='по популярности'
                onClick={() => {
                  if (!currentSortDirection) {
                    setParams(`${filterStroke}&_sort=rating&_order=asc`);
                  } else {
                    setParams(`${filterStroke}&_sort=rating${currentSortDirection}`);
                  }
                }}
              >
                по популярности
              </button>
            </div>
            <div className='catalog-sort__order'>
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--up ${params.get('_order') === 'asc' && 'catalog-sort__order-button--active'}`}
                aria-label='По возрастанию'
                onClick={() => {
                  if (!currentSortType) {
                    setParams(`${filterStroke}&_sort=price&_order=asc`);
                  } else {
                    setParams(`${filterStroke}&${currentSortType}&_order=asc`);
                  }
                }}
              />
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--down ${params.get('_order') === 'desc' && 'catalog-sort__order-button--active'}`}
                aria-label='По убыванию'
                onClick={() => {
                  if (!currentSortType) {
                    setParams(`${filterStroke}&_sort=price&_order=desc`);
                  } else {
                    setParams(`${filterStroke}&${currentSortType}&_order=desc`);
                  }
                }}
              />
            </div>
          </div>
          {isLoaded ? <ProductList products={products} /> : <ProductListLoader />}
          <Pagination currentPage={currentPage} pages={pages} />
        </div>
      </div>
    </main>
  );
}

export default memo(Catalog);
