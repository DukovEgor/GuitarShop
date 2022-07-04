import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModalDelete, deleteFromCart } from '../../store/cart-data/cart-data';
import toggleBodyLock, { capitalize } from '../../utils/utils';
import { GuitarTypeVocabulary } from '../../utils/vocabularies';

function ModalDelete() {
  const { productToDelete } = useAppSelector(({ cart }) => cart);
  const dispatch = useAppDispatch();
  const { name, price, previewImg, type, vendorCode, stringCount, id } = productToDelete;

  const refOuter = useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = useRef<HTMLElement | null>(null);
  const refLastFocusable = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    toggleBodyLock(false);
    dispatch(closeModalDelete());
  }, [dispatch]);

  const onKeyDown = useCallback(
    (evt: { key: string; shiftKey: unknown; preventDefault: () => void }) => {
      if (evt.key === 'Escape') {
        handleClose();
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
    },
    [handleClose]
  );

  useEffect(() => {
    toggleBodyLock(true);
    const focusableElements = Array.from<HTMLElement>(refOuter.current?.querySelectorAll('[tabindex]') ?? []);
    refFirstFocusable.current = focusableElements[0];
    refFirstFocusable.current && refFirstFocusable.current?.focus();
    refLastFocusable.current = focusableElements[focusableElements.length - 1];
  }, []);

  return (
    <div className='modal is-active modal-for-ui-kit'>
      <div className='modal__wrapper' onKeyDown={onKeyDown}>
        <div className='modal__overlay' data-close-modal onClick={handleClose} />
        <div className='modal__content' ref={refOuter}>
          <h2 className='modal__header title title--medium title--red'>Удалить этот товар?</h2>
          <div className='modal__info'>
            <img className='modal__img' src={`/img/content/${previewImg}`} width={67} height={137} alt={name} />
            <div className='modal__info-wrapper'>
              <h3 className='modal__product-name title title--little title--uppercase'>Гитара {name}</h3>
              <p className='modal__product-params modal__product-params--margin-11'>Артикул: {vendorCode}</p>
              <p className='modal__product-params'>
                {GuitarTypeVocabulary[capitalize(type)]}, {stringCount} струнная
              </p>
              <p className='modal__price-wrapper'>
                <span className='modal__price'>Цена:</span>
                <span className='modal__price'>{price?.toLocaleString('ru-RU')} ₽</span>
              </p>
            </div>
          </div>
          <div className='modal__button-container'>
            <button
              className='button button--small modal__button'
              tabIndex={0}
              onClick={() => {
                dispatch(deleteFromCart(id));
                toggleBodyLock(false);
              }}
            >
              Удалить товар
            </button>
            <button className='button button--black-border button--small modal__button modal__button--right' tabIndex={0} onClick={() => handleClose()}>
              Продолжить покупки
            </button>
          </div>
          <button className='modal__close-btn button-cross' type='button' aria-label='Закрыть' tabIndex={0} onClick={() => handleClose()}>
            <span className='button-cross__icon' />
            <span className='modal__close-btn-interactive-area' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
