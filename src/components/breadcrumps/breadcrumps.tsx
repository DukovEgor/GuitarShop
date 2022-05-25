import { Link, useMatch } from 'react-router-dom';
import { AppRoutes } from '../../utils/const';

interface BreadcrumpsProps {
  name?: string;
}

function Breadcrumps({ name }: BreadcrumpsProps) {
  const productLocation = useMatch(`${AppRoutes.Product}/:id`);
  const catalogLocation = useMatch(`${AppRoutes.Catalog}${AppRoutes.Page}:counter`);

  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link className='link' to='/'>
          Главная
        </Link>
      </li>
      {(catalogLocation || productLocation) && (
        <li className='breadcrumbs__item'>
          <Link className='link' to={`/${AppRoutes.Catalog}${AppRoutes.DefaultPage}`}>
            Каталог
          </Link>
        </li>
      )}
      {productLocation && (
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
