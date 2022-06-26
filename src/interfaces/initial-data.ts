import { IProduct, Products } from './product';

export interface InitialData {
  products: Products;
  productsCount: number;
  product: IProduct;
}

export interface InitialProcess {
  searchResult: Products;
  sortedProducts: Products;
}

export interface InitialCart {
  cartProducts: Products;
  discount: number;
}
