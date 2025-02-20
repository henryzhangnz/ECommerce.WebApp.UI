import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product-pagination',
  imports: [NgFor],
  templateUrl: './product-pagination.component.html',
  styleUrl: './product-pagination.component.scss',
})
export class ProductPaginationComponent {
  constructor(private productService: ProductService) {}
  products: Product[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 4;
  pages: number[] = [];

  ngOnInit() {
    this.productService.productPaginated$.subscribe((productPaginated) => {
      this.totalPages = Math.ceil(productPaginated.totalItems / this.pageSize);
      this.calculatePages();
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.productService.setQueryParams({ page: this.currentPage });
    }
  }

  calculatePages() {
    const totalPages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.pages = totalPages;
  }
}
