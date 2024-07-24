import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IOrderItem, OrderStatus } from '@app/shared/models';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.scss'],
  imports: [MatTableModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class OrderHistoryListComponent {
  orders = input.required<IOrderItem[]>();
  displayedColumns: string[] = [
    'status',
    'orderNumber',
    'productLine',
    'product',
    'quantity',
    'dateRequested',
  ];
  statusBadgeHandler: {
    [x: string]: string;
  } = {
    [OrderStatus.Completed]: 'completed',
    [OrderStatus.InProgress]: 'in-progress',
    [OrderStatus.Pending]: 'pending',
  };
}
