import { TOrderStatus } from './order-item.model';

export interface IFormData {
  status: TOrderStatus | null;
  productLine: string | null;
  from: Date | null;
  to: Date | null;
  orderNumber: number | null;
}
