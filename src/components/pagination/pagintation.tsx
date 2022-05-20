import { Link, useParams } from 'react-router-dom';
import { Products } from '../../interfaces/product';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';

interface PaginationProps {
  products: Products;
}

export default function Pagination({ products }: PaginationProps) {
  const { counter } = useParams();

  const currentPage = counter ? Number(counter) : 1;

  const pages = Math.ceil(products.length / PRUDUCTS_TO_SHOW);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {currentPage !== 1 && (
          <li className='pagination__page pagination__page--prev' id='prev'>
            <Link
              className='link pagination__page-link'
              to={`/catalog/page_${currentPage - 1}`}
            >
              Назад
            </Link>
          </li>
        )}
        {Array.from({ length: pages }).map((product, index: number) => (
          <li
            key={Math.random()}
            className={`pagination__page ${
              currentPage === index + 1 && 'pagination__page--active'
            }`}
          >
            <Link
              className='link pagination__page-link'
              to={`/catalog/page_${index + 1}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        {pages !== currentPage && (
          <li className='pagination__page pagination__page--next' id='next'>
            <Link
              className='link pagination__page-link'
              to={`/catalog/page_${currentPage + 1}`}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
