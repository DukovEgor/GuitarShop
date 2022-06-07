import { Link, useLocation, useParams } from 'react-router-dom';
import { AppRoutes, PRUDUCTS_TO_SHOW } from '../../utils/const';

interface PaginationProps {
  productsCount: number;
}

function Pagination({ productsCount }: PaginationProps) {
  const { counter } = useParams();
  const { search } = useLocation();

  const currentPage = counter ? Number(counter) : 1;

  const pages = Math.ceil(productsCount / PRUDUCTS_TO_SHOW);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {currentPage !== 1 && (
          <li className='pagination__page pagination__page--prev' id='prev'>
            <Link className='link pagination__page-link' to={`/${AppRoutes.Catalog}${AppRoutes.Page}${currentPage - 1}${search}`}>
              Назад
            </Link>
          </li>
        )}
        {Array.from({ length: pages }).map((product, index: number) => (
          <li key={Math.random()} className={`pagination__page ${currentPage === index + 1 && 'pagination__page--active'}`}>
            <Link className='link pagination__page-link' to={`/${AppRoutes.Catalog}${AppRoutes.Page}${index + 1}${search}`}>
              {index + 1}
            </Link>
          </li>
        ))}
        {pages !== currentPage && (
          <li className='pagination__page pagination__page--next' id='next'>
            <Link className='link pagination__page-link' to={`/${AppRoutes.Catalog}${AppRoutes.Page}${currentPage + 1}${search}`}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
