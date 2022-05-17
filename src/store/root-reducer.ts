import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { appData } from './app-data';
import { appProcess } from './app-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: appData.reducer,
  [NameSpace.app]: appProcess.reducer,
});
