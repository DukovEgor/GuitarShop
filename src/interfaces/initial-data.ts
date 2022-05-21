import { IProduct, Products } from './product';

export interface InitialData {
  products: Products;
  product: IProduct;
  isDataLoaded: boolean;
}
