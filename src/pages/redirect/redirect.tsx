import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../utils/const';

export default function Redirect() {
  return <Navigate to={`${AppRoutes.Catalog}${AppRoutes.Page}`} />;
}
