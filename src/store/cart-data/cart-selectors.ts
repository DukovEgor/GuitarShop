import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';

export const selectCartProducts = (state: State) => state.cart.cartProducts;
const selectTaxPercent = (state: State) => state.cart.discount;

export const selectSubtotal = createSelector(selectCartProducts, (items) => items.reduce((subtotal, item) => subtotal + item.price, 0));

export const selectDiscount = createSelector(selectSubtotal, selectTaxPercent, (subtotal, discountPercent) => subtotal * (discountPercent / 100));

export const selectTotal = createSelector(selectSubtotal, selectDiscount, (subtotal, discount) => subtotal - discount);
