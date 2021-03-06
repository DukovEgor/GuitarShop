import { memo } from 'react';
import { IProduct, Products } from '../../interfaces/product';
import ProductItem from '../product-item/product-item';

interface ProudctsListProps {
  products: Products;
}
function ProductList({ products }: ProudctsListProps) {
  return (
    <div className='cards catalog__cards'>
      {products.map((product: IProduct) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}

export default memo(ProductList);
