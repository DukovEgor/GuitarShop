interface RatingStarsProps {
  RatingInt: number;
  className: string;
}

export default function RatingStars({
  RatingInt,
  className,
}: RatingStarsProps) {
  let width = 12;
  let height = 11;

  if (className !== 'product-card__rate') {
    width = 16;
    height = 16;
  }

  return (
    <>
      {Array.from({ length: RatingInt }).map(() => (
        <svg
          key={Math.random()}
          width={width}
          height={height}
          aria-hidden='true'
        >
          <use xlinkHref='#icon-full-star' />
        </svg>
      ))}
      {Array.from({ length: 5 - RatingInt }).map(() => (
        <svg
          key={Math.random()}
          width={width}
          height={height}
          aria-hidden='true'
        >
          <use xlinkHref='#icon-star' />
        </svg>
      ))}
    </>
  );
}
