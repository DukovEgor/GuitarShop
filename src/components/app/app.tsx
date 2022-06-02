import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NotFound from '../404/404';
import Catalog from '../catalog/catalog';
import LoadingScreen from '../loading-screen/loading-screen';
import Main from '../main/main';
import Product from '../product/product';
import Redirect from '../redirect/redirect';
import { AppRoutes } from '../../utils/const';

function App(): JSX.Element {
  const { isDataLoaded } = useAppSelector(({ data }) => data);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route index element={<Redirect />} />
        <Route path={`${AppRoutes.Catalog}${AppRoutes.Page}:counter`} element={<Catalog />} />
        <Route path={`${AppRoutes.Product}/:id/:tab/*`} element={<Product />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
