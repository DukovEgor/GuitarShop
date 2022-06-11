import { InitialData } from '../../interfaces/initial-data';
import { INITIAL_PRODUCT } from '../../utils/const';
import { makeFakeComment, makeFakeProduct } from '../../utils/mocks';
import { addComment, appData, loadProduct, loadProducts } from './app-data';

describe('Reducer: appData', () => {
  const product = makeFakeProduct();
  const products = [makeFakeProduct()];
  const headers = { 'x-total-count': 1 };
  const comment = makeFakeComment();

  const state: InitialData = {
    products: [],
    product: INITIAL_PRODUCT,
    productsCount: 0,
  };

  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set fetched Products to Products', () => {
    const data = { data: products, headers };

    expect(appData.reducer(state, loadProducts(data))).toEqual({
      products: products,
      product: INITIAL_PRODUCT,
      productsCount: 1,
    });
  });

  it('should replace initial Product to fetched Product', () => {
    expect(appData.reducer(state, loadProduct(product))).toEqual({ products: [], productsCount: 0, product });
  });

  it('should add created Comment to Comments in Product', () => {
    expect(appData.reducer(state, addComment(comment))).toEqual({ products: [], productsCount: 0, product: { ...INITIAL_PRODUCT, comments: [comment] } });
  });
});
