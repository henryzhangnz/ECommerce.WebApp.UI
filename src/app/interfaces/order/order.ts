import { OrderItem } from './order-item';
import { OrderStatus } from './order-status';

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  createdAt: Date;
  items: OrderItem[];
  totalItems: number;
  totalOrderPrice: number;
}
