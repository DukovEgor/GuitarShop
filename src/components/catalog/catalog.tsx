import { useParams, useSearchParams } from 'react-router-dom';
import Breadcrumps from '../breadcrumps/breadcrumps';
import Pagination from '../pagination/pagintation';
import ProductList from '../product-list/product-list';
import { useAppSelector } from '../../hooks';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';
import { IProduct } from '../../interfaces/product';

function Catalog() {
  const { products } = useAppSelector(({ data }) => data);
  const { counter } = useParams();
  const [sortParams, setSortParams] = useSearchParams();

  const currentSortType = sortParams.get('_sort');
  const currentSortDirection = sortParams.get('_order');

  const currentPage = Number(counter ? counter : 1);

  const lastIndex = currentPage * PRUDUCTS_TO_SHOW;
  const firstIndex = lastIndex - PRUDUCTS_TO_SHOW;

  const sortedProducts = () => {
    const productsSlice = products.slice();

    if (!currentSortType) {
      return products;
    }

    switch (currentSortDirection) {
      case 'asc':
        return productsSlice.sort((a: IProduct, b: IProduct) => a[currentSortType] - b[currentSortType]);
      case 'desc':
        return productsSlice.sort((a: IProduct, b: IProduct) => b[currentSortType] - a[currentSortType]);
      default:
        return productsSlice.sort((a: IProduct, b: IProduct) => a[currentSortType] - b[currentSortType]);
    }
  };

  const currentProducts = sortedProducts().slice(firstIndex, lastIndex);

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
        <Breadcrumps />
        <div className='catalog'>
          <form className='catalog-filter'>
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
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Тип гитар</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='acoustic' name='acoustic' />
                <label htmlFor='acoustic'>Акустические гитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='electric' name='electric' defaultChecked />
                <label htmlFor='electric'>Электрогитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='ukulele' name='ukulele' defaultChecked />
                <label htmlFor='ukulele'>Укулеле</label>
              </div>
            </fieldset>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Количество струн</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='4-strings' name='4-strings' defaultChecked />
                <label htmlFor='4-strings'>4</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='6-strings' name='6-strings' defaultChecked />
                <label htmlFor='6-strings'>6</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='7-strings' name='7-strings' />
                <label htmlFor='7-strings'>7</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='12-strings' name='12-strings' disabled />
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
                className={`catalog-sort__type-button ${currentSortType === 'price' && 'catalog-sort__type-button--active'}`}
                aria-label='по цене'
                onClick={() => {
                  if (!currentSortDirection) {
                    setSortParams('_sort=price&_order=asc');
                  } else {
                    setSortParams(`_sort=price&_order=${currentSortDirection}`);
                  }
                }}
              >
                по цене
              </button>
              <button
                className={`catalog-sort__type-button ${currentSortType === 'rating' && 'catalog-sort__type-button--active'}`}
                aria-label='по популярности'
                onClick={() => {
                  if (!currentSortDirection) {
                    setSortParams('_sort=rating&_order=asc');
                  } else {
                    setSortParams(`_sort=rating&_order=${currentSortDirection}`);
                  }
                }}
              >
                по популярности
              </button>
            </div>
            <div className='catalog-sort__order'>
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--up ${currentSortDirection === 'asc' && 'catalog-sort__order-button--active'}`}
                aria-label='По возрастанию'
                onClick={() => {
                  if (!currentSortType) {
                    setSortParams('_sort=price&_order=asc');
                  } else {
                    setSortParams(`_sort=${currentSortType}&_order=asc`);
                  }
                }}
              />
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--down ${currentSortDirection === 'desc' && 'catalog-sort__order-button--active'}`}
                aria-label='По убыванию'
                onClick={() => {
                  if (!currentSortType) {
                    setSortParams('_sort=price&_order=desc');
                  } else {
                    setSortParams(`_sort=${currentSortType}&_order=desc`);
                  }
                }}
              />
            </div>
          </div>
          <ProductList products={currentProducts} />
          <Pagination products={products} />
        </div>
      </div>
    </main>
  );
}

export default Catalog;
