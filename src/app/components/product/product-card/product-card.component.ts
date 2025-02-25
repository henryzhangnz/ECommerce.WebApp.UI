import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { NgIf } from '@angular/common';
import { Role } from '../../../interfaces/auth/role';
import { AuthService } from '../../../services/auth/auth.service';
import { UserDto } from '../../../interfaces/auth/user-dto';
import { OrderService } from '../../../services/order/order.service';
import { OrderCreateRequest } from '../../../interfaces/order/order-create-request';
import { Order } from '../../../interfaces/order/order';
import { OrderItemCreateRequest } from '../../../interfaces/order/order-item-create-request';
import { OrderStatus } from '../../../interfaces/order/order-status';

@Component({
  selector: 'app-product-card',
  imports: [NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  user?: UserDto | null;
  order?: Order | null;
  userRole = Role;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => (this.user = user));
    this.orderService.order$.subscribe((order) => (this.order = order));
  }

  editProduct(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  addToCart() {
    if (this.user) {
      const order: OrderCreateRequest = {
        customerId: this.user.id,
        status: OrderStatus.Pending,
        items: [
          {
            productId: this.product.id,
            quantity: 1,
            unitPrice: this.product.price,
            productName: this.product.name,
            totalPrice: this.product.price,
          } as OrderItemCreateRequest,
        ],
      };
      if (this.order || this.order !== null) {
        order.status = this.order!.status;
        this.orderService
          .updateAndFetchOrder(this.order!.id, order)
          .subscribe();
      } else {
        this.orderService.createOrder(order).subscribe();
      }
    }
  }
}
