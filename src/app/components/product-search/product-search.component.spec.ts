import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'setQueryParams',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useValue: productServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
