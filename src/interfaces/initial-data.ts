import { IProduct, Products } from './product';

export interface InitialData {
  products: Products;
  productsCount: number;
  product: IProduct;
  isDataLoaded: boolean;
}

export interface InitialProcess {
  searchResult: Products;
  sortedProducts: Products;
}
