export interface IOrderItem {
  status: TOrderStatus;
  orderNumber: number;
  productLine: TOrderStatus;
  product: string;
  quantity: string;
  dateRequested: Date;
}

export const OrderStatus = {
  Any: 'Any',
  InProgress: 'In Progress',
  Pending: 'Pending',
  Completed: 'Completed',
};

export type TOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const ProductLine = {
  ReadyMix: 'Ready-Mix',
  Cement: 'Cement',
  Aggregates: 'Aggregates',
  AllProductLines: 'All Product Lines',
};

export type TProductLine = (typeof ProductLine)[keyof typeof ProductLine];
