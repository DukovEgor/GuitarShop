import { InitialCart } from '../../interfaces/initial-data';
import { INITIAL_PRODUCT } from '../../utils/const';
import { mockProduct } from '../../utils/mocks';
import {
  addToCart,
  cartData,
  closeModalAdd,
  closeModalDelete,
  closeModalSuccessAdd,
  deleteFromCart,
  raiseProductQuantity,
  reduceProductQuantity,
  setDiscount,
  setProductQuantity,
  showModalAdd,
  showModalDelete,
} from './cart-data';

describe('Reducer: cartData', () => {
  const state: InitialCart = {
    cartProducts: [],
    productToAdd: INITIAL_PRODUCT,
    productToDelete: INITIAL_PRODUCT,
    discount: 0,
    showModalAdd: false,
    showModalDelete: false,
    showModalSuccess: false,
  };
  const product = mockProduct;

  it('without additional parameters should return initial state', () => {
    expect(cartData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should add product to cartProducts and showModalSuccess', () => {
    const changedState = { ...state, showModalAdd: true };

    expect(cartData.reducer(changedState, addToCart(product))).toEqual({ ...state, showModalSuccess: true, showModalAdd: false, cartProducts: [{ ...product, count: 1 }] });
  });

  it('should increase product count', () => {
    const changedState = { ...state, cartProducts: [product] };

    expect(cartData.reducer(changedState, raiseProductQuantity(product.id))).toEqual({ ...state, cartProducts: [{ ...product, count: 1 }] });
  });

  it('should reduce product count', () => {
    const changedState = { ...state, cartProducts: [{ ...product, count: 3 }] };

    expect(cartData.reducer(changedState, reduceProductQuantity({ id: product.id }))).toEqual({ ...state, cartProducts: [{ ...product, count: 2 }] });
  });

  it('should set product count', () => {
    const changedState = { ...state, cartProducts: [product] };

    expect(cartData.reducer(changedState, setProductQuantity({ id: product.id, count: 20 }))).toEqual({ ...state, cartProducts: [{ ...product, count: 20 }] });
  });

  it('should delete product from cart', () => {
    const changedState = { ...state, cartProducts: [product], showModalDelete: true };

    expect(cartData.reducer(changedState, deleteFromCart(product.id))).toEqual({ ...state, cartProducts: [], showModalDelete: false });
  });

  it('should set showModalAdd "true" and set productToAdd', () => {
    const changedState = { ...state, cartProducts: [] };

    expect(cartData.reducer(changedState, showModalAdd(product))).toEqual({ ...state, showModalAdd: true, productToAdd: product });
  });

  it('should set showModalDelete "true"', () => {
    const changedState = { ...state, cartProducts: [] };

    expect(cartData.reducer(changedState, showModalDelete(product))).toEqual({ ...state, showModalDelete: true, productToDelete: product });
  });

  it('should set showModalDelete "false"', () => {
    const changedState = { ...state, cartProducts: [] };

    expect(cartData.reducer(changedState, closeModalDelete())).toEqual({ ...state, showModalDelete: false });
  });

  it('should set showModalSuccess "false"', () => {
    const changedState = { ...state, showModalSuccess: true };

    expect(cartData.reducer(changedState, closeModalSuccessAdd())).toEqual({ ...state, showModalSuccess: false });
  });

  it('should set showModalAdd "false"', () => {
    const changedState = { ...state, showModalAdd: true };

    expect(cartData.reducer(changedState, closeModalAdd())).toEqual({ ...state, showModalAdd: false });
  });

  it('should set discount value', () => {
    const discount = 15;

    expect(cartData.reducer(state, setDiscount(discount))).toEqual({ ...state, discount });
  });
});
