import { Platform } from '@angular/cdk/platform';
import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AppFacade } from '@app/app-state';
import {
  IFormData,
  OrderStatus,
  ProductLine,
  TOrderStatus,
  TProductLine,
} from '@app/shared/models';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const year = date.getFullYear();
    return days + '.' + months + '.' + year;
  }
}

@Component({
  selector: 'order-history-filters',
  templateUrl: './order-history-filters.component.html',
  styleUrls: ['./order-history-filters.component.scss'],
  imports: [
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    JsonPipe,
    KeyValuePipe,
    AsyncPipe,
    MatIconModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class OrderHistoryFiltersComponent {
  private _appFacade = inject(AppFacade);
  orderStatus = OrderStatus;
  productLine = ProductLine;
  orderHistoryForm = new FormGroup({
    status: new FormControl<TOrderStatus>(OrderStatus.Any),
    productLine: new FormControl<TProductLine>(ProductLine.AllProductLines),
    from: new FormControl<Date | null>(null),
    to: new FormControl<Date | null>(null),
    orderNumber: new FormControl<number | null>(null),
  });
  formChange$ = this.orderHistoryForm.valueChanges.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    tap((form) => {
      this._appFacade.formChanged(form as IFormData);
    })
  );
}
