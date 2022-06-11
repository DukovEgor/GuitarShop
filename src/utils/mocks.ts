import { IProduct } from '../interfaces/product';
import { faker } from '@faker-js/faker';
import { IComment } from '../interfaces/comment';
import { IReview } from '../interfaces/review';
import { InitialData, InitialProcess } from '../interfaces/initial-data';

export const makeFakeProduct = (): IProduct => ({
  id: Number(faker.random.numeric(2)),
  name: faker.commerce.product(),
  vendorCode: faker.random.alphaNumeric(),
  type: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  previewImg: faker.internet.avatar(),
  stringCount: Number(faker.random.numeric(1)),
  rating: Number(faker.random.numeric(1)),
  price: Number(faker.commerce.price(100, 200, 0)),
  comments: [makeFakeComment()],
});

export const makeFakeComment = (): IComment => ({
  id: faker.random.numeric(2),
  userName: faker.name.firstName(),
  advantage: faker.commerce.productDescription(),
  disadvantage: faker.commerce.productDescription(),
  comment: faker.commerce.productDescription(),
  rating: Number(faker.random.numeric(1)),
  createAt: faker.date.future(),
  guitarId: Number(faker.random.numeric(2)),
});
export const makeFakeReview = (): IReview => ({
  guitarId: Number(faker.random.numeric(2)),
  userName: faker.commerce.product(),
  advantage: faker.commerce.productDescription(),
  disadvantage: faker.commerce.productDescription(),
  comment: faker.commerce.productDescription(),
  rating: Number(faker.random.numeric(1)),
});

export const INITIAL_DATA: InitialData = {
  products: Array.from({ length: 10 }, makeFakeProduct),
  product: makeFakeProduct(),
  productsCount: 10,
};

export const INITIAL_PROCESS: InitialProcess = {
  searchResult: Array.from({ length: 10 }, makeFakeProduct),
  sortedProducts: Array.from({ length: 10 }, makeFakeProduct),
};

export const mockComment = {
  id: '1211',
  userName: 'faker.name.firstName()',
  advantage: 'faker.commerce.productDescription()',
  disadvantage: 'faker.commerce.productDescription()',
  comment: 'faker.commerce.productDescription()',
  rating: 4,
  createAt: 'Thu Jun 02 2022 15:45:34 GMT+0300 (Moscow Standard Time)',
  guitarId: 2323,
};

export const mockComments = [mockComment];

export const mockProduct = {
  id: 1,
  name: 'Chester',
  vendorCode: '12312cfadf',
  type: 'electric',
  description: 'test',
  previewImg: 'https://assets.htmlacademy.ru/img/logo.v2.svg',
  stringCount: 6,
  rating: 4,
  price: 400,
  comments: [mockComment],
};

export const mockProducts = [mockProduct];
