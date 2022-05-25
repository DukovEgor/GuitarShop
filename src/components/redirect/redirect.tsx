import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../utils/const';

function Redirect() {
  return <Navigate to={`${AppRoutes.Catalog}${AppRoutes.DefaultPage}`} />;
}

export default Redirect;
