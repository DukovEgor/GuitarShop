import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { IReview } from '../../interfaces/review';
import { fetchReviewAction } from '../../store/api-actions';
import toggleBodyLock from '../../utils/utils';
import './product-modal-review.css';

interface ProductModalReviewProps {
  isModalOpened: boolean;
  onModalClose: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  onSuccess: Dispatch<SetStateAction<boolean>>;
  name: string;
}

function ProductModalReview({ isModalOpened, onModalClose, isSuccess, onSuccess, name }: ProductModalReviewProps) {
  const { id } = useParams();
  const refOuter = useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = useRef<HTMLElement | null>(null);
  const refLastFocusable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    toggleBodyLock(isModalOpened);
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
      }
    },
    [isModalOpened, onModalClose]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>({ mode: 'onSubmit' });

  const { userName, advantage, disadvantage, comment, rating } = errors;

  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const handleReviewSubmit: SubmitHandler<IReview> = (data) => {
    setIsDisabled(false);
    dispatch(fetchReviewAction([{ ...data, guitarId: Number(id) }, onSuccess]));
    reset();
  };

  if (isSuccess) {
    return <span></span>;
  }

  return (
    <div className='modal__wrapper' onKeyDown={onKeyDown}>
      <div className='modal__overlay' data-close-modal aria-label='Скрыть' onClick={() => onModalClose(false)} />
      <div className='modal__content' ref={refOuter}>
        <h2 className='modal__header modal__header--review title title--medium'>Оставить отзыв</h2>
        <h3 className='modal__product-name title title--medium-20 title--uppercase'>{name}</h3>
        <form className='form-review' onSubmit={handleSubmit(handleReviewSubmit)}>
          <div className='form-review__wrapper'>
            <div className='form-review__name-wrapper'>
              <label className='form-review__label form-review__label--required' htmlFor='user-name'>
                Ваше Имя
              </label>
              <input
                className='form-review__input form-review__input--name'
                id='user-name'
                type='text'
                autoComplete='off'
                tabIndex={0}
                {...register('userName', {
                  required: true,
                })}
              />
              <p className={`form-review__warning ${userName && 'form-review__warning--active'}`}>Заполните поле</p>
            </div>
            <div>
              <span className='form-review__label form-review__label--required'>Ваша Оценка</span>
              <div className='rate rate--reverse'>
                <input
                  data-testid='test-star'
                  className='visually-hidden'
                  id='star-5'
                  type='radio'
                  defaultValue={5}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label className='rate__label' htmlFor='star-5' title='Отлично' tabIndex={0} />
                <input
                  className='visually-hidden'
                  id='star-4'
                  type='radio'
                  defaultValue={4}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label className='rate__label' htmlFor='star-4' title='Хорошо' tabIndex={0} />
                <input
                  className='visually-hidden'
                  id='star-3'
                  type='radio'
                  defaultValue={3}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label className='rate__label' htmlFor='star-3' title='Нормально' tabIndex={0} />
                <input
                  className='visually-hidden'
                  id='star-2'
                  type='radio'
                  defaultValue={2}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label className='rate__label' htmlFor='star-2' title='Плохо' tabIndex={0} />
                <input
                  className='visually-hidden'
                  id='star-1'
                  type='radio'
                  defaultValue={1}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label className='rate__label' htmlFor='star-1' title='Ужасно' tabIndex={0} />
                <p className={`rate__message ${rating && 'form-review__warning--active'}`}>Поставьте оценку</p>
              </div>
            </div>
          </div>
          <label className='form-review__label form-review__label--required' htmlFor='adv'>
            Достоинства
          </label>
          <input
            tabIndex={0}
            {...register('advantage', {
              required: true,
            })}
            className='form-review__input'
            id='adv'
            type='text'
            autoComplete='off'
          />
          <p className={`form-review__warning ${advantage && 'form-review__warning--active'}`}>Заполните поле</p>
          <label className='form-review__label form-review__label--required' htmlFor='disadv'>
            Недостатки
          </label>
          <input
            tabIndex={0}
            {...register('disadvantage', {
              required: true,
            })}
            className='form-review__input'
            id='disadv'
            type='text'
            autoComplete='off'
          />
          <p className={`form-review__warning ${disadvantage && 'form-review__warning--active'}`}>Заполните поле</p>
          <label className='form-review__label form-review__label--required' htmlFor='comment'>
            Комментарий
          </label>
          <textarea
            tabIndex={0}
            {...register('comment', {
              required: true,
            })}
            className='form-review__input form-review__input--textarea'
            id='comment'
            rows={10}
            autoComplete='off'
            defaultValue={''}
          />
          <p className={`form-review__warning ${comment && 'form-review__warning--active'}`}>Заполните поле</p>
          <button className='button button--medium-20 form-review__button' type='submit' data-testid='Отправить' disabled={isDisabled} tabIndex={0}>
            Отправить отзыв
          </button>
        </form>
        <button className='modal__close-btn button-cross' type='submit' aria-label='Закрыть' tabIndex={0} onClick={() => onModalClose(false)}>
          <span className='button-cross__icon' />
          <span className='modal__close-btn-interactive-area' />
        </button>
      </div>
    </div>
  );
}

export default ProductModalReview;
