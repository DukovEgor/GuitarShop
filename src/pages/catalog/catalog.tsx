import { useParams } from 'react-router-dom';
import Breadcrumps from '../../components/breadcrumps/breadcrumps';
import Pagination from '../../components/pagination/pagintation';
import ProductList from '../../components/product-list/product-list';
import { useAppSelector } from '../../hooks';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';

export default function Catalog() {
  const { products } = useAppSelector(({ DATA }) => DATA);

  const { counter } = useParams();
  const currentPage = Number(counter ? counter : 1);

  const lastIndex = currentPage * PRUDUCTS_TO_SHOW;

  const firstIndex = lastIndex - PRUDUCTS_TO_SHOW;

  const currentProducts = products.slice(firstIndex, lastIndex);

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
              <button className='catalog-sort__type-button' aria-label='по цене'>
                по цене
              </button>
              <button className='catalog-sort__type-button' aria-label='по популярности'>
                по популярности
              </button>
            </div>
            <div className='catalog-sort__order'>
              <button className='catalog-sort__order-button catalog-sort__order-button--up' aria-label='По возрастанию' />
              <button className='catalog-sort__order-button catalog-sort__order-button--down' aria-label='По убыванию' />
            </div>
          </div>
          <ProductList products={currentProducts} />
          <Pagination products={products} />
        </div>
      </div>
    </main>
  );
}
