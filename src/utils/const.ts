export enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}

export enum NameSpace {
  Data = 'DATA',
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
}

export const PRUDUCTS_TO_SHOW = 9;
export const REVIEWS_TO_SHOW = 3;
