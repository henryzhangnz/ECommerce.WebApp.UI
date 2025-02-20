import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { nonEmptyStringValidator } from '../../../Helpers/non-empty-string-validator';

@Component({
  selector: 'app-add-edit-product',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent {
  productForm!: FormGroup;

  selectProductId: string | null = '';
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.nullValidator,
          nonEmptyStringValidator(),
        ],
      ],
      description: ['', Validators.maxLength(100)],
      price: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]],
    });

    this.route.paramMap.subscribe((params) => {
      this.selectProductId = params.get('id');
      if (this.selectProductId) {
        this.isEditing = true;
        this.productService
          .getProductById(this.selectProductId)
          .subscribe((product) => {
            this.productForm.patchValue(product);
          });
      }
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.isEditing && this.selectProductId) {
        this.productService.updateProduct(this.selectProductId, product);
      } else {
        this.productService.addProduct(product);
      }
      this.router.navigate(['/']);
    }
  }

  isInputValid(controlName: string): boolean {
    return (
      (this.productForm.get(controlName)?.invalid &&
        this.productForm.get(controlName)?.touched) ??
      false
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
