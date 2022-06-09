import { memo } from 'react';
import { PRUDUCTS_TO_SHOW } from '../../utils/const';
import ProductItemLoader from '../product-item-loader/product-item-loader';

const loaderList = Array.from({ length: PRUDUCTS_TO_SHOW });
function ProductListLoader() {
  return (
    <div className='cards catalog__cards'>
      {loaderList.map(() => (
        <ProductItemLoader key={Math.random()} />
      ))}
    </div>
  );
}

export default memo(ProductListLoader);
