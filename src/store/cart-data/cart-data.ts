import { createSlice } from '@reduxjs/toolkit';
import { InitialCart } from '../../interfaces/initial-data';
import { NameSpace } from '../../utils/const';

const initialState: InitialCart = {
  cartProducts: [],
  discount: 15,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
  },
});

export const { addToCart } = cartData.actions;
