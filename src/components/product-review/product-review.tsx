import { IComment } from '../../interfaces/comment';
import { RatingVocabulary } from '../../utils/vocabularies';
import RatingStars from '../rating-stars/rating-stars';

interface ProductReviewProps {
  review: IComment;
}

export default function ProductReview({ review }: ProductReviewProps) {
  const { userName, advantage, disadvantage, comment, rating, createAt } =
    review;

  const rawDate = new Date(createAt);

  const commentDate = rawDate.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  const ratingInt = Math.round(rating);
  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>
          {userName}
        </h4>
        <span className='review__date'>{commentDate}</span>
      </div>
      <div className='rate review__rating-panel'>
        <RatingStars RatingInt={ratingInt} className={'review__rating-panel'} />
        <p className='visually-hidden'>Оценка: {RatingVocabulary[ratingInt]}</p>
      </div>
      <h4 className='review__title title title--lesser'>Достоинства:</h4>
      <p className='review__value'>{advantage}</p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>{disadvantage}</p>
      <h4 className='review__title title title--lesser'>Комментарий:</h4>
      <p className='review__value'>{comment}</p>
    </div>
  );
}
