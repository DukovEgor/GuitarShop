import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';

const initialState = {};

export const appData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {},
});
