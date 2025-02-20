import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { ProductService } from '../../../services/product/product.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'setQueryParams',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useValue: productServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = {
      id: '123',
      name: 'test 1 name',
      description: 'test 1 desc',
      price: 10,
      amount: 3,
      createdAt: new Date(),
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
