import { Injectable, inject } from '@angular/core';
import { AppActions } from '@app-state';
import { IFormData } from '@app/shared/models';
import { Store, select } from '@ngrx/store';
import * as AppSelectors from './app.selectors';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  private _store = inject(Store);

  public readonly isLoading$ = this._store.pipe(select(AppSelectors.isLoading));
  public readonly filteredOrders$ = this._store.pipe(
    select(AppSelectors.filteredOrders)
  );
  public readonly orders$ = this._store.pipe(select(AppSelectors.orders));

  setIsLoading(value: boolean) {
    this._store.dispatch(AppActions.setLoading({ value }));
  }

  loadOrders() {
    this._store.dispatch(AppActions.loadOrders());
  }

  formChanged(data: IFormData) {
    this._store.dispatch(AppActions.formChanged(data));
  }
}
