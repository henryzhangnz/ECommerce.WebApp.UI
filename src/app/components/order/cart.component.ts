import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../interfaces/order/order';
import { OrderItem } from '../../interfaces/order/order-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  order: Order | null = null;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.order$.subscribe((order) => (this.order = order));
  }

  updateOrder() {
    if (!this.order) return;
    this.orderService
      .updateOrderItemsAndFetchOrder(this.order.id, this.order.items)
      .subscribe();

    this.router.navigate(['/']);
  }

  updateQuantity(item: OrderItem, change: number) {
    if (!this.order) return;

    item.quantity += change;

    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }
}
