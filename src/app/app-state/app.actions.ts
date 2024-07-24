import { IFormData, IOrderItem } from '@app/shared/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Set loading': props<{ value: boolean }>(),
    'Load Orders': emptyProps(),
    'Load Orders Success': props<{ orders: IOrderItem[] }>(),
    'Form Changed': props<IFormData>(),
    'Data Filtered': props<{ filteredOrders: IOrderItem[] }>(),
  },
});
