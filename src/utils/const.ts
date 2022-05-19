export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum NameSpace {
  data = 'DATA',
  app = 'APP',
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
  Product = '/product',
}
