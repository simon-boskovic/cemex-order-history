import { inject, Injectable } from '@angular/core';
import data from '@app/shared/data/raw-data';
import { OrderStatus, ProductLine } from '@app/shared/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppActions } from './app.actions';
import { AppFacade } from './app.facade';

@Injectable()
export class AppEffects {
  private _actions$ = inject(Actions);
  private _appFacade = inject(AppFacade);

  public loadData$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActions.loadOrders),
      tap(() => {
        this._appFacade.setIsLoading(true);
      }),
      switchMap(() => {
        return of(data).pipe(
          delay(500),
          map((orders) => AppActions.loadOrdersSuccess({ orders }))
        );
      })
    )
  );

  public formChanged$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActions.formChanged),
      tap(() => {
        this._appFacade.setIsLoading(true);
      }),
      withLatestFrom(this._appFacade.orders$),
      switchMap(([form, orders]) => {
        const filteredOrders = orders.filter((order) => {
          let hasRightStatus = true;
          let hasRightProductLine = true;
          let hasRightOrderNumber = true;
          let isAfter = true;
          let isBefore = true;

          if (form.status && form.status !== OrderStatus.Any) {
            hasRightStatus = order.status === form.status;
          }
          if (
            form.productLine &&
            form.productLine !== ProductLine.AllProductLines
          ) {
            hasRightProductLine = order.productLine === form.productLine;
          }
          if (form.orderNumber) {
            hasRightOrderNumber = order.orderNumber
              .toString()
              .includes(form.orderNumber.toString());
          }
          if (form.from) {
            const fromDate = new Date(form.from);
            const orderDate = new Date(order.dateRequested);
            fromDate.setHours(0, 0, 0, 0);
            orderDate.setHours(0, 0, 0, 0);
            isAfter = orderDate >= fromDate;
          }
          if (form.to) {
            const toDate = new Date(form.to);
            const orderDate = new Date(order.dateRequested);
            toDate.setHours(0, 0, 0, 0);
            orderDate.setHours(0, 0, 0, 0);
            isBefore = orderDate <= toDate;
          }
          return (
            hasRightStatus &&
            hasRightProductLine &&
            hasRightOrderNumber &&
            isAfter &&
            isBefore
          );
        });
        return of({}).pipe(
          delay(500),
          map(() => AppActions.dataFiltered({ filteredOrders }))
        );
      })
    )
  );
}
