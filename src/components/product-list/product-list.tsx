import { useAppSelector } from '../../hooks';
import { IProduct } from '../../interfaces/product';
import ProductItem from '../product-item/product-item';

export default function ProductList() {
  const { products } = useAppSelector(({ DATA }) => DATA);
  return (
    <div className='cards catalog__cards'>
      {products.map((product: IProduct) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}
