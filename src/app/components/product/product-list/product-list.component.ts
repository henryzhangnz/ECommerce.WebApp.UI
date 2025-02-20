import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/product';
import { ProductCreateDto } from '../../../interfaces/productCreateDto';
import { NgFor, NgIf } from '@angular/common';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { Router } from '@angular/router';
import { ProductPaginationComponent } from '../product-pagination/product-pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Role } from '../../../interfaces/auth/role';
import { LoginButtonComponent } from '../../login/login-button/login-button.component';

@Component({
  selector: 'app-product-list',
  imports: [
    NgFor,
    NgIf,
    ProductSearchComponent,
    ProductPaginationComponent,
    ProductCardComponent,
    FormsModule,
    LoginButtonComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  newProduct: ProductCreateDto = {
    name: '',
    description: '',
    price: 0,
    amount: 0,
  };
  currentPage = 1;
  selectedSort: string = 'name-asc';
  userRole = Role;
  currentUserRole: Role = Role.NoRole;

  sortOptions = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low-High' },
    { value: 'price-desc', label: 'Price High-Low' },
    { value: 'amount-asc', label: 'Amount Low-High' },
    { value: 'amount-desc', label: 'Amount High-Low' },
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productService.setQueryParams({ search: '', page: 1 });
    this.productService.productPaginated$.subscribe((productPaginated) => {
      this.products = productPaginated.products;
    });
    this.authService.user$.subscribe((user) => {
      this.currentUserRole = user === null ? Role.NoRole : user.role;
    });
  }

  onSearchChanged(searchText: string) {
    this.currentPage = 1;
    this.productService.setQueryParams({
      search: searchText,
      page: this.currentPage,
    });
  }

  onSortChange() {
    const [sortBy, order] = this.selectedSort.split('-');
    this.productService.setQueryParams({
      sortBy: sortBy.charAt(0).toUpperCase() + sortBy.slice(1),
      isDescending: order === 'desc',
      page: 1,
    });
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }
}
