import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../utils/const';

interface BreadcrumbsProps {
  name?: string;
}

function Breadcrumbs({ name }: BreadcrumbsProps) {
  const { search } = useLocation();
  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link className='link' to={`/${search}`} data-testid='to-main-page'>
          Главная
        </Link>
      </li>

      <li className='breadcrumbs__item'>
        <Link className='link' to={`/${AppRoutes.Catalog}${AppRoutes.DefaultPage}${search}`}>
          Каталог
        </Link>
      </li>

      {name && (
        <li className='breadcrumbs__item'>
          <a href='/' className='link'>
            {name}
          </a>
        </li>
      )}
    </ul>
  );
}

export default memo(Breadcrumbs);
