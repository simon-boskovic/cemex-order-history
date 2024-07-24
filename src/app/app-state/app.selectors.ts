import { AppState } from '@app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState = createFeatureSelector<AppState>('app');

export const isLoading = createSelector(
  getState,
  (state: AppState) => state.isLoading
);
export const filteredOrders = createSelector(
  getState,
  (state: AppState) => state.filteredOrders
);
export const orders = createSelector(
  getState,
  (state: AppState) => state.orders
);

// export const data = createSelector(getState, (state: AppState) => state.);
