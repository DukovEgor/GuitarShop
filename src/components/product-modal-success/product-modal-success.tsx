import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef } from 'react';
import toggleBodyLock from '../../utils/utils';

interface ProductModalSuccessProps {
  isModalOpened: boolean;
  onModalClose: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  onModalRemove: Dispatch<SetStateAction<boolean>>;
}

function ProductModalSuccess({ isModalOpened, onModalClose, isSuccess, onModalRemove }: ProductModalSuccessProps): JSX.Element {
  const refOuter = useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = useRef<HTMLElement | null>(null);
  const refLastFocusable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(refOuter.current?.querySelectorAll('[tabindex]') ?? []);

    refFirstFocusable.current = focusableElements[0];
    refLastFocusable.current = focusableElements[focusableElements.length - 1];

    refFirstFocusable.current?.focus();
  });

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (document.activeElement === refLastFocusable.current && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        refFirstFocusable.current?.focus();
      }
      if (document.activeElement === refFirstFocusable.current && e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        refLastFocusable.current?.focus();
      }

      if (e.key === 'Escape') {
        onModalClose(false);
        toggleBodyLock(isModalOpened);
        onModalRemove(false);
      }
    },
    [isModalOpened, onModalClose, onModalRemove]
  );

  if (!isSuccess) {
    return <span></span>;
  }

  return (
    <div className='modal__wrapper' onKeyDown={onKeyDown}>
      <div
        className='modal__overlay'
        data-close-modal
        aria-label='Скрыть'
        onClick={() => {
          onModalClose(false);
        }}
      />
      <div className='modal__content' ref={refOuter}>
        <svg className='modal__icon' width={26} height={20} aria-hidden='true'>
          <use xlinkHref='#icon-success' />
        </svg>
        <p className='modal__message'>Спасибо за ваш отзыв!</p>
        <div className='modal__button-container modal__button-container--review'>
          <button
            className='button button--small modal__button modal__button--review'
            aria-label='Каталог'
            tabIndex={0}
            onClick={async () => {
              await onModalClose(false);
              onModalRemove(false);
            }}
          >
            К покупкам!
          </button>
        </div>
        <button
          className='modal__close-btn button-cross'
          type='button'
          aria-label='Закрыть'
          tabIndex={0}
          onClick={async () => {
            await onModalClose(false);
            onModalRemove(false);
          }}
        >
          <span className='button-cross__icon' />
          <span className='modal__close-btn-interactive-area' />
        </button>
      </div>
    </div>
  );
}
export default ProductModalSuccess;
