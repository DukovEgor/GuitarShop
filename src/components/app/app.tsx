import { Route, Routes } from 'react-router-dom';
import NotFound from '../404/404';
import Main from '../main/main';
import Product from '../product/product';
import { AppRoutes } from '../../utils/const';
import Catalog from '../catalog/catalog';
import Cart from '../cart/cart';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route index element={<Catalog />} />
        <Route path={`${AppRoutes.Catalog}${AppRoutes.Page}:counter`} element={<Catalog />} />
        <Route path={`${AppRoutes.Product}/:id/:tab/*`} element={<Product />} />
        <Route path={AppRoutes.Cart} element={<Cart />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
