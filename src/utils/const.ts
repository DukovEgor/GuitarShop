export enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}

export enum NameSpace {
  Data = 'data',
}

export enum APIRoute {
  Products = '/guitars?_limit=27',
  Product = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum AppRoutes {
  Root = '/',
  Catalog = 'catalog',
  Product = 'product',
  Page = '/page_',
  DefaultPage = '/page_1',
  Characteristics = 'characteristics',
  Description = 'description',
}

export const PRUDUCTS_TO_SHOW = 9;
export const REVIEWS_TO_SHOW = 3;

export const INITIAL_PRODUCT = {
  id: 0,
  name: '',
  vendorCode: '',
  type: '',
  description: '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
};
