import { useState } from 'react';
import useBodyLock from '../../hooks/useBodyLock';
import { Comments, IComment } from '../../interfaces/comment';
import { sortByDate } from '../../utils/utils';
import ProductModalReview from '../product-modal-review/product-modal-review';
import ProductReview from '../product-review/product-review';

interface ProductReviewsProps {
  comments: Comments;
  name: string;
}
export default function ProductReviews({ comments, name }: ProductReviewsProps) {
  const [commentsQuantity, setCommentsQuantity] = useState(3);
  const [isModalOpened, setIsModalOpened] = useState(false);

  useBodyLock(isModalOpened);
  const sortedComments = comments.slice().sort(sortByDate);

  const handleShowMore = () => {
    setCommentsQuantity((prevState) => prevState + 3);
  };

  const handleButtonUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>
      <button className='button button--red-border button--big reviews__sumbit-button' onClick={() => setIsModalOpened(true)}>
        Оставить отзыв
      </button>
      {sortedComments.slice(0, commentsQuantity).map((comment: IComment) => (
        <ProductReview key={comment.id} review={comment} />
      ))}
      {(commentsQuantity + 3 === sortedComments.length || commentsQuantity < sortedComments.length) && (
        <button className='button button--medium reviews__more-button' onClick={handleShowMore}>
          Показать еще отзывы
        </button>
      )}
      <button className='button button--up button--red-border button--big reviews__up-button' onClick={handleButtonUp}>
        Наверх
      </button>
      {<ProductModalReview isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} name={name} />}
    </section>
  );
}
