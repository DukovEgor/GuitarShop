import { InitialProcess } from '../../interfaces/initial-data';
import { makeFakeProduct } from '../../utils/mocks';
import { setSearchResult, setSortedProducts, userProcess } from './user-process';

describe('Reducer: userProcess', () => {
  const mockProducts = [makeFakeProduct()];

  const state: InitialProcess = {
    searchResult: [],
    sortedProducts: [],
  };

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set search result to searchResult', () => {
    expect(userProcess.reducer(state, setSearchResult(mockProducts))).toEqual({ ...state, searchResult: mockProducts });
  });

  it('should set sorted products to sortedProducts', () => {
    expect(userProcess.reducer(state, setSortedProducts(mockProducts))).toEqual({ ...state, sortedProducts: mockProducts });
  });
});
