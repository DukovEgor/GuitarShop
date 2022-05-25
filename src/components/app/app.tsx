import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NotFound from '../404/404';
import Catalog from '../catalog/catalog';
import LoadingScreen from '../loading-screen/loading-screen';
import Main from '../main/main';
import Product from '../product/product';
import Redirect from '../redirect/redirect';
import { AppRoutes } from '../../utils/const';
import OptionalRoute from '../optional-route/optinal-route';

function App(): JSX.Element {
  const { isDataLoaded } = useAppSelector(({ DATA }) => DATA);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index element={<Redirect />} />
          <Route path={`${AppRoutes.Catalog}${AppRoutes.Page}:counter`} element={<Catalog />} />
          <Route
            path={`${AppRoutes.Product}/:id`}
            element={
              <OptionalRoute>
                <Product />
              </OptionalRoute>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
