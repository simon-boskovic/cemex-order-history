import { AppActions } from '@app-state';
import { IOrderItem } from '@app/shared/models';
import { createReducer, on } from '@ngrx/store';

export interface AppState {
  isLoading: boolean;
  orders: IOrderItem[];
  filteredOrders: IOrderItem[];
}

export const initialState: AppState = {
  isLoading: true,
  orders: [],
  filteredOrders: [],
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setLoading, (state, { value }) => ({
    ...state,
    isLoading: value,
  })),
  on(AppActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    isLoading: false,
    orders,
    filteredOrders: orders,
  })),
  on(AppActions.dataFiltered, (state, { filteredOrders }) => ({
    ...state,
    isLoading: false,
    filteredOrders,
  }))
);
