import { Comments } from './comment';
import { IProduct, Products } from './product';

export interface InitialData {
  products: Products;
  product: IProduct;
  comments: Comments;
  isDataLoaded: boolean;
}
