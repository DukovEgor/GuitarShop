import { Link, useMatch } from 'react-router-dom';
import { AppRoutes } from '../../utils/const';

interface BreadcrumpsProps {
  name?: string;
}

function Breadcrumps({ name }: BreadcrumpsProps) {
  const catalogLocation = useMatch(`${AppRoutes.Catalog}${AppRoutes.Page}:counter`);

  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link className='link' to='/' data-testid='to-main-page'>
          Главная
        </Link>
      </li>
      {(catalogLocation || name) && (
        <li className='breadcrumbs__item'>
          <Link className='link' to={`/${AppRoutes.Catalog}${AppRoutes.DefaultPage}`}>
            Каталог
          </Link>
        </li>
      )}
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

export default Breadcrumps;
