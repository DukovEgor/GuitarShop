import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { appData } from './app-data/app-data';
import { cartData } from './cart-data/cart-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.Process]: userProcess.reducer,
  [NameSpace.Cart]: cartData.reducer,
});
