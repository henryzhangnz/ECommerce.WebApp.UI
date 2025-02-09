import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent {
  constructor(private productService: ProductService) {}

  searchText: string = '';

  onSearchChange() {
    this.productService.setQueryParams({
      search: this.searchText,
      page: 1,
    });
  }
}
