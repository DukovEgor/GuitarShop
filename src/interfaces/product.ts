import { Comments } from './comment';

export interface IProductTabs {
  vendorCode: string;
  type: string;
  description: string;
  stringCount: number;
}

export interface IProduct extends IProductTabs {
  id: number;
  name: string;
  previewImg: string;
  rating: number;
  price: number;
  comments: Comments;
  count: number;
}

export type Products = IProduct[];
