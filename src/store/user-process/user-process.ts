import { createSlice } from '@reduxjs/toolkit';
import { InitialProcess } from '../../interfaces/initial-data';
import { NameSpace } from '../../utils/const';

const initialState: InitialProcess = {
  searchResult: [],
  sortedProducts: [],
};

export const userProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setSortedProducts: (state, action) => {
      state.sortedProducts = action.payload;
    },
  },
});

export const { setSearchResult, setSortedProducts } = userProcess.actions;
