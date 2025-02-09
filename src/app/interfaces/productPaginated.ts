import { Product } from './product';

export interface ProductPaginated {
  products: Product[];
  totalItems: number;
  page: number;
  pageSize: number;
}
