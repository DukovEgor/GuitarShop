import { KeyboardEvent, useEffect, useRef } from 'react';
import browserHistory from '../../browser-history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModalSuccessAdd } from '../../store/cart-data/cart-data';
import { AppRoutes } from '../../utils/const';
import toggleBodyLock from '../../utils/utils';

function ModalSuccessAdd() {
  const { showModalSuccess } = useAppSelector(({ cart }) => cart);
  const dispatch = useAppDispatch();

  const refOuter = useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = useRef<HTMLElement | null>(null);
  const refLastFocusable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    toggleBodyLock(true);

    const focusableElements = Array.from<HTMLElement>(refOuter.current?.querySelectorAll('[tabindex]') ?? []);

    refFirstFocusable.current = focusableElements[0];
    refLastFocusable.current = focusableElements[focusableElements.length - 1];

    refFirstFocusable.current?.focus();
  }, []);

  const handleSuccessAdd = (route?: string) => {
    toggleBodyLock(false);
    dispatch(closeModalSuccessAdd());
    route && browserHistory.push(route);
  };

  const onKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleSuccessAdd();
      return;
    }
    if (document.activeElement === refLastFocusable.current && evt.key === 'Tab' && !evt.shiftKey) {
      evt.preventDefault();
      refFirstFocusable.current?.focus();
    }
    if (document.activeElement === refFirstFocusable.current && evt.key === 'Tab' && evt.shiftKey) {
      evt.preventDefault();
      refLastFocusable.current?.focus();
    }
  };

  return (
    <div className={`modal modal--success ${showModalSuccess && 'is-active'}`}>
      <div className='modal__wrapper'>
        <div className='modal__overlay' data-close-modal onClick={() => handleSuccessAdd()} />
        <div className='modal__content' ref={refOuter} onKeyDown={onKeyDown}>
          <svg className='modal__icon' width={26} height={20} aria-hidden='true'>
            <use xlinkHref='#icon-success' />
          </svg>
          <p className='modal__message'>Товар успешно добавлен в корзину</p>
          <div className='modal__button-container modal__button-container--add'>
            <button className='button button--small modal__button' tabIndex={0} onClick={() => handleSuccessAdd(`/${AppRoutes.Cart}`)}>
              Перейти в корзину
            </button>
            <button className='button button--black-border button--small modal__button modal__button--right' tabIndex={0} onClick={() => handleSuccessAdd('/')}>
              Продолжить покупки
            </button>
          </div>
          <button className='modal__close-btn button-cross' tabIndex={0} type='button' aria-label='Закрыть' onClick={() => handleSuccessAdd()}>
            <span className='button-cross__icon' />
            <span className='modal__close-btn-interactive-area' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessAdd;
