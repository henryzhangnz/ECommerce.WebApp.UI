import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from '../../interfaces/order/order';
import { OrderStatus } from '../../interfaces/order/order-status';
import { OrderItem } from '../../interfaces/order/order-item';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { OrderCreateRequest } from '../../interfaces/order/order-create-request';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.orderServiceBaseUrl;

  private orderSubject = new BehaviorSubject<Order | null>(null);
  order$ = this.orderSubject.asObservable();

  constructor(private http: HttpClient) {}

  getOrdersById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/api/v1/orders/${id}`, {
      withCredentials: true,
    });
  }

  getOrdersByCustomerId(id: string) {
    return this.http
      .get<Order>(`${this.baseUrl}/api/v1/orders/customer/${id}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (order: Order) => this.orderSubject.next(order),
      });
  }

  createOrder(order: OrderCreateRequest) {
    return this.http
      .post<Order>(`${this.baseUrl}/api/v1/orders`, order, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (order: Order) => this.orderSubject.next(order),
        })
      );
  }

  updateOrder(id: string, order: OrderCreateRequest) {
    return this.http.put<Order>(`${this.baseUrl}/api/v1/orders/${id}`, order, {
      withCredentials: true,
    });
  }

  updateAndFetchOrder(id: string, order: OrderCreateRequest) {
    return this.updateOrder(id, order).pipe(
      switchMap(() => this.getOrdersById(id)),
      tap((updatedOrder: Order) => this.orderSubject.next(updatedOrder))
    );
  }

  updateOrderItemsAndFetchOrder(id: string, orderItems: OrderItem[]) {
    return this.updateOrderItems(id, orderItems).pipe(
      switchMap(() => this.getOrdersById(id)),
      tap((updatedOrder: Order) => this.orderSubject.next(updatedOrder))
    );
  }

  updateOrderItems(id: string, orderItems: OrderItem[]) {
    return this.http.put<Order>(
      `${this.baseUrl}/api/v1/orders/${id}/items`,
      orderItems,
      {
        withCredentials: true,
      }
    );
  }
}
