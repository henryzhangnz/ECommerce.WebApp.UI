import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../../services/product/product.service';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductPaginated } from '../../../interfaces/productPaginated';
import { Product } from '../../../interfaces/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let productPaginatedSubject: BehaviorSubject<ProductPaginated>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'setQueryParams',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    productPaginatedSubject = new BehaviorSubject<any>({
      totalItems: 0,
      pageSize: 0,
      page: 1,
      products: [],
    });

    Object.defineProperty(productServiceSpy, 'productPaginated$', {
      get: () => productPaginatedSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useValue: productServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct QueryParams when onSearchChanged', () => {
    const searchText = 'new test';
    component.onSearchChanged(searchText);
    expect(productServiceSpy.setQueryParams).toHaveBeenCalledWith({
      search: searchText,
      page: 1,
    });
  });

  it('should set correct QueryParams when onSortChange', () => {
    component.selectedSort = 'description-asc';
    component.onSortChange();
    expect(productServiceSpy.setQueryParams).toHaveBeenCalledWith({
      sortBy: 'Description',
      isDescending: false,
      page: 1,
    });
  });

  it('should navigate to /addProduct when addProduct is called', () => {
    component.addProduct();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/add-product']);
  });

  it('should show list of products', () => {
    let products: Product[] = [
      {
        id: '123',
        name: 'test 1 name',
        description: 'test 1 desc',
        price: 10,
        amount: 3,
        createdAt: new Date(),
      },
      {
        id: '234',
        name: 'test 2 name',
        description: 'test 2 desc',
        price: 20,
        amount: 1,
        createdAt: new Date(),
      },
    ];

    let paginatedProducts: ProductPaginated = {
      totalItems: 10,
      pageSize: 2,
      page: 1,
      products: products,
    };

    productPaginatedSubject.next(paginatedProducts);

    expect(productServiceSpy.setQueryParams).toHaveBeenCalledWith({
      search: '',
      page: 1,
    });

    productServiceSpy.setQueryParams({
      search: '',
      page: 1,
    });

    expect(component.products).toEqual(products);
  });
});
