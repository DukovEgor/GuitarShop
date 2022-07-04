import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectCartProducts } from '../../store/cart-data/cart-selectors';
import { AppRoutes } from '../../utils/const';
import Search from '../search/search';

function Header() {
  const cartProducts = useAppSelector(selectCartProducts);
  const cartProductsCount = cartProducts.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <header className='header' id='header'>
      <div className='container header__wrapper'>
        <a className='header__logo logo' href='/'>
          <img className='logo__img' width={70} height={70} src='/img/svg/logo.svg' alt='Логотип' />
        </a>
        <nav className='main-nav'>
          <ul className='main-nav__list'>
            <li>
              <a className='link main-nav__link link--current' href='/'>
                Каталог
              </a>
            </li>
            <li>
              <a className='link main-nav__link' href='/'>
                Где купить?
              </a>
            </li>
            <li>
              <a className='link main-nav__link' href='/'>
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <Search />
        <Link className='header__cart-link' to={AppRoutes.Cart} aria-label='Корзина'>
          <svg className='header__cart-icon' width={14} height={14} aria-hidden='true'>
            <use xlinkHref='#icon-basket' />
          </svg>
          <span className='visually-hidden'>Перейти в корзину</span>
          {cartProducts && <span className={`header__cart-count ${!cartProducts.length && 'visually-hidden'}`}>{cartProductsCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
