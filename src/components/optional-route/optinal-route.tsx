import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface OptionalRouteProps {
  children: JSX.Element;
}

function OptionalRoute({ children }: OptionalRouteProps) {
  const { id } = useParams();
  const pageId = Number(id);

  const { products } = useAppSelector(({ DATA }) => DATA);

  return products.some((product) => product.id === pageId) ? children : <Navigate to={'*'} />;
}

export default OptionalRoute;
