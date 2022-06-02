import { IProduct } from '../interfaces/product';
import { faker } from '@faker-js/faker';
import { IComment } from '../interfaces/comment';
import { IReview } from '../interfaces/review';
import { InitialData } from '../interfaces/initial-data';

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

export const INITIAL_STATE: InitialData = {
  products: Array.from({ length: 10 }, makeFakeProduct),
  product: makeFakeProduct(),
  comments: Array.from({ length: 10 }, makeFakeComment),
  isDataLoaded: true,
};
