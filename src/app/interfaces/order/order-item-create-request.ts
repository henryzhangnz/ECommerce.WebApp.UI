export interface OrderItemCreateRequest {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
  totalPrice: number;
}
