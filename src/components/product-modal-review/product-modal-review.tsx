import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { IReview } from '../../interfaces/review';
import { fetchReviewAction } from '../../store/api-actions';
import toggleBodyLock from '../../utils/utils';

interface ProductModalReviewProps {
  isModalOpened: boolean;
  onModalClose: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  onSuccess: Dispatch<SetStateAction<boolean>>;
  name: string;
}

function ProductModalReview({ isModalOpened, onModalClose, isSuccess, onSuccess, name }: ProductModalReviewProps) {
  const { id } = useParams();

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
    };
  }, [handleEscape, isModalOpened]);

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
    <div className='modal__wrapper'>
      <div className='modal__overlay' data-close-modal onClick={() => onModalClose(false)} />
      <div className='modal__content'>
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
                {...register('userName', {
                  required: true,
                })}
              />
              {userName && <p className='form-review__warning'>Заполните поле</p>}
            </div>
            <div>
              <span className='form-review__label form-review__label--required'>Ваша Оценка</span>
              <div className='rate rate--reverse'>
                <input
                  className='visually-hidden'
                  id='star-5'
                  type='radio'
                  defaultValue={5}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label tabIndex={0} className='rate__label' htmlFor='star-5' title='Отлично' />
                <input
                  className='visually-hidden'
                  id='star-4'
                  type='radio'
                  defaultValue={4}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label tabIndex={0} className='rate__label' htmlFor='star-4' title='Хорошо' />
                <input
                  className='visually-hidden'
                  id='star-3'
                  type='radio'
                  defaultValue={3}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label tabIndex={0} className='rate__label' htmlFor='star-3' title='Нормально' />
                <input
                  className='visually-hidden'
                  id='star-2'
                  type='radio'
                  defaultValue={2}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label tabIndex={0} className='rate__label' htmlFor='star-2' title='Плохо' />
                <input
                  className='visually-hidden'
                  id='star-1'
                  type='radio'
                  defaultValue={1}
                  {...register('rating', {
                    required: true,
                  })}
                />
                <label tabIndex={0} className='rate__label' htmlFor='star-1' title='Ужасно' />
                {rating && <p className='rate__message'>Поставьте оценку</p>}
              </div>
            </div>
          </div>
          <label className='form-review__label form-review__label--required' htmlFor='adv'>
            Достоинства
          </label>
          <input
            {...register('advantage', {
              required: true,
            })}
            className='form-review__input'
            id='adv'
            type='text'
            autoComplete='off'
          />
          {advantage && <p className='form-review__warning'>Заполните поле</p>}
          <label className='form-review__label form-review__label--required' htmlFor='disadv'>
            Недостатки
          </label>
          <input
            {...register('disadvantage', {
              required: true,
            })}
            className='form-review__input'
            id='disadv'
            type='text'
            autoComplete='off'
          />
          {disadvantage && <p className='form-review__warning'>Заполните поле</p>}
          <label className='form-review__label form-review__label--required' htmlFor='comment'>
            Комментарий
          </label>
          <textarea
            {...register('comment', {
              required: true,
            })}
            className='form-review__input form-review__input--textarea'
            id='comment'
            rows={10}
            autoComplete='off'
            defaultValue={''}
          />
          {comment && <p className='form-review__warning'>Заполните поле</p>}
          <button tabIndex={0} className='button button--medium-20 form-review__button' type='submit' disabled={isDisabled}>
            Отправить отзыв
          </button>
        </form>
        <button tabIndex={0} className='modal__close-btn button-cross' type='submit' aria-label='Закрыть' onClick={() => onModalClose(false)}>
          <span className='button-cross__icon' />
          <span className='modal__close-btn-interactive-area' />
        </button>
      </div>
    </div>
  );
}

export default ProductModalReview;
