import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private productService: ProductService, private router: Router) {}

  editProduct(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
