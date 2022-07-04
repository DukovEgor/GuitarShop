import { createSlice } from '@reduxjs/toolkit';
import { InitialCart } from '../../interfaces/initial-data';
import { INITIAL_PRODUCT, NameSpace } from '../../utils/const';

const initialState: InitialCart = {
  cartProducts: [],
  productToAdd: INITIAL_PRODUCT,
  productToDelete: INITIAL_PRODUCT,
  discount: 0,
  showModalAdd: false,
  showModalDelete: false,
  showModalSuccess: false,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.cartProducts.findIndex((product) => product.id === action.payload.id);

      if (productInCart < 0) {
        state.cartProducts.push({ ...action.payload, count: 1 });
      } else {
        state.cartProducts[productInCart].count += 1;
      }
      state.showModalAdd = false;
      state.showModalSuccess = true;
    },
    raiseProductQuantity: (state, action) => {
      const productInCart = state.cartProducts.findIndex((product) => product.id === action.payload);

      if (state.cartProducts[productInCart].count === 99) {
        return;
      }
      state.cartProducts[productInCart].count += 1;
    },
    setProductQuantity: (state, action) => {
      const productInCart = state.cartProducts.findIndex((product) => product.id === action.payload.id);

      state.cartProducts[productInCart].count = action.payload.count;
    },
    reduceProductQuantity: (state, action) => {
      const productInCart = state.cartProducts.findIndex((product) => product.id === action.payload.id);

      if (state.cartProducts[productInCart].count === 1) {
        state.showModalDelete = true;
        state.productToDelete = action.payload;
      } else {
        state.cartProducts[productInCart].count -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload);
      state.showModalDelete = false;
    },
    showModalAdd: (state, action) => {
      state.productToAdd = action.payload;
      state.showModalAdd = true;
    },
    showModalDelete: (state, action) => {
      state.productToDelete = action.payload;
      state.showModalDelete = true;
    },
    closeModalDelete: (state) => {
      state.showModalDelete = false;
    },
    closeModalSuccessAdd: (state) => {
      state.showModalSuccess = false;
    },
    closeModalAdd: (state) => {
      state.showModalAdd = false;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const {
  addToCart,
  showModalAdd,
  closeModalSuccessAdd,
  closeModalAdd,
  raiseProductQuantity,
  reduceProductQuantity,
  deleteFromCart,
  showModalDelete,
  closeModalDelete,
  setProductQuantity,
  setDiscount,
} = cartData.actions;
