import { createSlice } from '@reduxjs/toolkit';
import { InitialCart } from '../../interfaces/initial-data';
import { INITIAL_PRODUCT, NameSpace } from '../../utils/const';

const initialState: InitialCart = {
  cartProducts: [],
  productToAdd: INITIAL_PRODUCT,
  discount: 15,
  showModalAdd: false,
  showModalSuccess: false,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts.push(action.payload);
      state.showModalAdd = false;
      state.showModalSuccess = true;
    },
    showModalAdd: (state, action) => {
      state.productToAdd = action.payload;
      state.showModalAdd = true;
    },
    closeModalSuccessAdd: (state) => {
      state.showModalSuccess = false;
    },
    closeModalAdd: (state) => {
      state.showModalAdd = false;
    },
  },
});

export const { addToCart, showModalAdd, closeModalSuccessAdd, closeModalAdd } = cartData.actions;
