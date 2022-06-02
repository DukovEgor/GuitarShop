import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import browserHistory from '../../browser-history';
import { AppRoutes } from '../../utils/const';
import toggleBodyLock from '../../utils/utils';

interface ProductModalSuccessProps {
  isModalOpened: boolean;
  onModalClose: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  onModalRemove: Dispatch<SetStateAction<boolean>>;
}

function ProductModalSuccess({ isModalOpened, onModalClose, isSuccess, onModalRemove }: ProductModalSuccessProps): JSX.Element {
  const handleEscape = useCallback(
    (event: { keyCode: number }) => {
      if (event.keyCode === 27) {
        onModalClose(false);
      }
    },
    [onModalClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    toggleBodyLock(isModalOpened);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      toggleBodyLock(isModalOpened);
      onModalRemove(false);
    };
  }, [handleEscape, isModalOpened, onModalRemove]);

  if (!isSuccess) {
    return <span></span>;
  }

  return (
    <div className='modal__wrapper'>
      <div
        className='modal__overlay'
        data-close-modal
        aria-label='Скрыть'
        onClick={() => {
          onModalClose(false);
        }}
      />
      <div className='modal__content'>
        <svg className='modal__icon' width={26} height={20} aria-hidden='true'>
          <use xlinkHref='#icon-success' />
        </svg>
        <p className='modal__message'>Спасибо за ваш отзыв!</p>
        <div className='modal__button-container modal__button-container--review'>
          <button
            className='button button--small modal__button modal__button--review'
            aria-label='Каталог'
            onClick={async () => {
              await onModalClose(false);
              browserHistory.push(`/${AppRoutes.Catalog}${AppRoutes.DefaultPage}`);
            }}
          >
            К покупкам!
          </button>
        </div>
        <button
          className='modal__close-btn button-cross'
          type='button'
          aria-label='Закрыть'
          onClick={() => {
            onModalClose(false);
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
