import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment';
import { ProductCreateDto } from '../interfaces/productCreateDto';
import { QueryParameters } from '../interfaces/queryParameters';
import { ProductPaginated } from '../interfaces/productPaginated';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.productApiBaseUrl;

  private queryParamsSubject = new BehaviorSubject<QueryParameters>({
    search: '',
    sortBy: 'Name',
    isDescending: false,
    page: 1,
    pageSize: 4,
  });

  private productPaginatedSubject = new BehaviorSubject<ProductPaginated>({
    products: [],
    totalItems: 0,
    page: 1,
    pageSize: 4,
  });

  productPaginated$ = this.productPaginatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.queryParamsSubject
      .pipe(
        switchMap((params) => this.fetchProducts(params)),
        shareReplay(1),
        catchError((error) => {
          console.error('Error fetching products: ', error);
          return [];
        })
      )
      .subscribe();
  }

  private fetchProducts(params: QueryParameters): Observable<ProductPaginated> {
    return this.http
      .get<ProductPaginated>(
        this.baseUrl +
          '/api/v1/products?' +
          `search=${params.search}&` +
          `sortBy=${params.sortBy}&` +
          `isDescending=${params.isDescending}&` +
          `page=${params.page}&` +
          `pageSize=${params.pageSize}`
      )
      .pipe(
        tap((response) => {
          this.productPaginatedSubject.next(response);
        })
      );
  }

  setQueryParams(params: Partial<QueryParameters>) {
    this.queryParamsSubject.next({
      ...this.queryParamsSubject.value,
      ...params,
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `/api/v1/products/${id}`);
  }

  addProduct(product: ProductCreateDto) {
    return this.http
      .post<Product>(this.baseUrl + '/api/v1/products', product)
      .subscribe(() => {
        this.refreshProducts();
      });
  }

  updateProduct(id: string, product: ProductCreateDto) {
    return this.http
      .put<void>(this.baseUrl + `/api/v1/products/${id}`, product)
      .subscribe(() => {
        this.refreshProducts();
      });
  }

  deleteProduct(id: string) {
    return this.http
      .delete<void>(this.baseUrl + `/api/v1/products/${id}`)
      .subscribe(() => {
        this.refreshProducts();
      });
  }

  private refreshProducts() {
    this.setQueryParams({});
  }
}
