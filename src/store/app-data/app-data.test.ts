import { InitialData } from '../../interfaces/initial-data';
import { INITIAL_PRODUCT } from '../../utils/const';
import { makeFakeComment, makeFakeProduct } from '../../utils/mocks';
import { addComment, appData, loadProduct, loadProducts } from './app-data';

const products = Array.from({ length: 5 }, makeFakeProduct);
const product = makeFakeProduct();
const comment = makeFakeComment();

describe('Reducer: appData', () => {
  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      products: [],
      product: INITIAL_PRODUCT,
      isDataLoaded: false,
    });
  });

  it('should set isDataLoaded true after loading data', () => {
    const state: InitialData = {
      products: [],
      isDataLoaded: false,
      product: INITIAL_PRODUCT,

      productsCount: 0,
    };
    expect(appData.reducer(state, loadProducts(products))).toEqual({ products, isDataLoaded: true, comments: [], product: INITIAL_PRODUCT });
  });

  it('should replace initial Product to fetched Product', () => {
    const state: InitialData = {
      products: [],
      isDataLoaded: false,
      product: INITIAL_PRODUCT,

      productsCount: 0,
    };
    expect(appData.reducer(state, loadProduct(product))).toEqual({ products: [], isDataLoaded: false, comments: [], product });
  });

  it('should add fetched Comment to Comments', () => {
    const state: InitialData = {
      products: [],
      isDataLoaded: false,
      product: INITIAL_PRODUCT,
      productsCount: 0,
    };
    expect(appData.reducer(state, addComment(comment))).toEqual({ products: [], isDataLoaded: false, comments: [comment], product: INITIAL_PRODUCT });
  });
});
