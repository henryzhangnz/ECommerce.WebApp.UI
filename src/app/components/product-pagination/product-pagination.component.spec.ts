import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginationComponent } from './product-pagination.component';
import { ProductService } from '../../services/product.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { ProductPaginated } from '../../interfaces/productPaginated';

describe('ProductPaginationComponent', () => {
  let component: ProductPaginationComponent;
  let fixture: ComponentFixture<ProductPaginationComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let productPaginatedSubject: BehaviorSubject<ProductPaginated>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'setQueryParams',
    ]);

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
      imports: [ProductPaginationComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useValue: productServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
