import { OrderItemCreateRequest } from './order-item-create-request';
import { OrderStatus } from './order-status';

export interface OrderCreateRequest {
  customerId: string;
  status: OrderStatus;
  items: OrderItemCreateRequest[];
}
