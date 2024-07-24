import { IOrderItem } from '@app/shared/models';

export default [
  {
    status: 'In Progress',
    orderNumber: 3301,
    productLine: 'Ready-Mix',
    product: '1-200-2-C-28-12-1-3-000',
    quantity: '12 m3',
    dateRequested: new Date('2022-10-20'),
  },
  {
    status: 'Pending',
    orderNumber: 3305,
    productLine: 'Cement',
    product: 'Gris CPC 30 R Monterrey Extra 50Kg.',
    quantity: '10 TN',
    dateRequested: new Date('2022-10-10'),
  },
  {
    status: 'Pending',
    orderNumber: 3290,
    productLine: 'Aggregates',
    product: 'Arena Triturada Caliza Malla 4',
    quantity: '2 TN',
    dateRequested: new Date('2022-09-29'),
  },
  {
    status: 'Completed',
    orderNumber: 3184,
    productLine: 'Aggregates',
    product: 'Arena Triturada Caliza Malla 4',
    quantity: '5 TN',
    dateRequested: new Date('2022-05-14'),
  },
  {
    status: 'Completed',
    orderNumber: 3295,
    productLine: 'Cement',
    product: 'Gris CPC30R Tolteca Extra 50Kg',
    quantity: '12 TN',
    dateRequested: new Date('2022-04-05'),
  },
  {
    status: 'Completed',
    orderNumber: 2994,
    productLine: 'Ready-Mix',
    product: '1-200-2-C-28-14-1-3-000',
    quantity: '15.5 m3',
    dateRequested: new Date('2022-03-10'),
  },
] as IOrderItem[];
