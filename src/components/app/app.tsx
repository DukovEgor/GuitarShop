import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../../pages/404/404';
import Catalog from '../../pages/catalog/catalog';
import Main from '../../pages/main/main';
import Product from '../../pages/product/product';
import { AppRoutes } from '../../utils/const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path={AppRoutes.Root} element={<Catalog />} />
          <Route path={AppRoutes.Product} element={<Product />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
