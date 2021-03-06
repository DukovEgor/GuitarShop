import { useState } from 'react';
import { Comments, IComment } from '../../interfaces/comment';
import { REVIEWS_TO_SHOW } from '../../utils/const';
import { sortByDate } from '../../utils/utils';
import ProductModalReview from '../product-modal-review/product-modal-review';
import ProductModalSuccess from '../product-modal-success/product-modal-success';
import ProductReview from '../product-review/product-review';

interface ProductReviewsProps {
  comments: Comments;
  name: string;
}
function ProductReviews({ comments, name }: ProductReviewsProps) {
  const [commentsQuantity, setCommentsQuantity] = useState(REVIEWS_TO_SHOW);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sortedComments = comments.slice().sort(sortByDate);

  const handleShowMore = () => {
    setCommentsQuantity((prevState) => prevState + REVIEWS_TO_SHOW);
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
      <button className='button button--red-border button--big reviews__sumbit-button' data-testid='review-button-close' onClick={() => setIsModalOpened(true)}>
        Оставить отзыв
      </button>
      {sortedComments.slice(0, commentsQuantity).map((comment: IComment) => (
        <ProductReview key={comment.id} review={comment} />
      ))}
      {(commentsQuantity + REVIEWS_TO_SHOW === sortedComments.length || commentsQuantity < sortedComments.length) && (
        <button className='button button--medium reviews__more-button' data-testid='review-button-more' onClick={handleShowMore}>
          Показать еще отзывы
        </button>
      )}
      <button className='button button--up button--red-border button--big reviews__up-button' data-testid='review-button-up' onClick={handleButtonUp}>
        Наверх
      </button>
      <div className={`modal ${isSuccess ? 'modal--success' : 'modal--review'} ${isModalOpened && 'is-active'}`}>
        <ProductModalReview isModalOpened={isModalOpened} onModalClose={setIsModalOpened} onSuccess={setIsSuccess} name={name} isSuccess={isSuccess} />
        <ProductModalSuccess isModalOpened={isModalOpened} onModalClose={setIsModalOpened} isSuccess={isSuccess} onModalRemove={setIsSuccess} />
      </div>
    </section>
  );
}

export default ProductReviews;
