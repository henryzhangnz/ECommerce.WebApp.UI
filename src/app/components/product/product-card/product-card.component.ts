import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { AsyncPipe, NgIf } from '@angular/common';
import { Role } from '../../../interfaces/auth/role';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserDto } from '../../../interfaces/auth/user-dto';

@Component({
  selector: 'app-product-card',
  imports: [NgIf, AsyncPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  user$?: Observable<UserDto | null>;
  userRole = Role;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  editProduct(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
