import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Products } from '../../interfaces/product';
import { AppRoutes } from '../../utils/const';

function Search() {
  const [isEmpty, setIsEmpty] = useState(true);
  const { products } = useAppSelector(({ data }) => data);
  const [searchResult, setSearchResult] = useState<Products>([]);
  const searchRef = useRef<HTMLFormElement>(null);

  const resetSearch = () => {
    setIsEmpty(true);
    setSearchResult([]);
    searchRef.current?.reset();
  };

  const handleSearch = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setIsEmpty(!evt.currentTarget.value);
      setSearchResult(products.slice().filter((product) => product.name.toLowerCase().includes(evt.currentTarget.value.toLowerCase())));
    },
    [products]
  );

  return (
    <div className='form-search'>
      <form className='form-search__form' id='form-search' ref={searchRef}>
        <button className='form-search__submit' type='submit'>
          <svg className='form-search__icon' width={14} height={15} aria-hidden='true'>
            <use href='#icon-search' />
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>
        <input className='form-search__input' id='search' type='text' autoComplete='off' placeholder='что вы ищите?' onChange={handleSearch} />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      {!isEmpty && (
        <ul className='form-search__select-list list-opened'>
          {searchResult.map((res) => (
            <Link className='form-search__select-item' key={res.id} to={`/${AppRoutes.Product}/${res.id}/characteristics`} onClick={resetSearch}>
              <li className='form-search__select-item' tabIndex={0}>
                {res.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
      <button className='form-search__reset' type='reset' form='form-search' onClick={() => setIsEmpty(true)}>
        <svg className='form-search__icon' width={14} height={15} aria-hidden='true'>
          <use xlinkHref='#icon-close' />
        </svg>
        <span className='visually-hidden'>Сбросить поиск</span>
      </button>
    </div>
  );
}

export default Search;
