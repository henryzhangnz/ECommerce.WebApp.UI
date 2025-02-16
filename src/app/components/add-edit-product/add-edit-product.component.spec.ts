import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductComponent } from './add-edit-product.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct',
      'addProduct',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeSpy = {
      paramMap: of(convertToParamMap({ id: '123' })),
    } as any;

    await TestBed.configureTestingModule({
      imports: [AddEditProductComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.productForm.value).toEqual({
      name: '',
      description: '',
      price: 0,
      amount: 0,
    });
  });

  it('should validate required fields', () => {
    component.productForm.controls['name'].setValue('');
    component.productForm.controls['price'].setValue('');
    component.productForm.controls['amount'].setValue('');

    expect(component.productForm.controls['name'].valid).toBeFalse();
    expect(component.productForm.controls['price'].valid).toBeFalse();
    expect(component.productForm.controls['amount'].valid).toBeFalse();
  });

  it('should call ProductService.addProduct when adding a new product', () => {
    const productData = {
      name: 'New Product',
      description: 'Test',
      price: 100,
      amount: 5,
    };
    component.productForm.setValue(productData);
    component.isEditing = false;

    component.saveProduct();

    expect(productServiceSpy.addProduct).toHaveBeenCalledWith(productData);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call ProductService.updateProduct when editing a product', () => {
    const productData = {
      name: 'Updated Product',
      description: 'Test',
      price: 200,
      amount: 10,
    };
    component.productForm.setValue(productData);
    component.isEditing = true;
    component.selectProductId = '123';

    component.saveProduct();

    expect(productServiceSpy.updateProduct).toHaveBeenCalledWith(
      '123',
      productData
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to home page when cancel is called', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should disable the submit button when the form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(submitButton.disabled).toBeTrue();
  });

  it('should show validation error when name is empty', () => {
    component.productForm.controls['name'].setValue('');
    component.productForm.controls['name'].markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Name is required.');
  });
});
