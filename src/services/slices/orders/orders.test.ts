import { TOrder } from '@utils-types';
import orderSlice, { createOrder, fetchOrderByNumber, fetchOrders, OrderState } from './orderSlice';
const initialState: OrderState = {
  order: null,
  orders: [],
  isLoading: false,
  error: null
};
const mokOrder = {
  _id: '6900e07ca0c0a9001c2f1cbc',
  ingredients: ['643d69a5c3f7b9001cfa093c'],
  status: 'done',
  name: 'Краторный space антарианский бургер',
  createdAt: '2025-10-28T15:25:48.375Z',
  updatedAt: '2025-10-28T15:26:02.575Z',
  number: 92506
};
const mockCreateOrderPayload = {
    success: true,
    order: mokOrder,
    name: mokOrder.name 
  };

const mokOrders = [
  {
    _id: '6900ef707a0974001c8bdb55',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-10-28T16:29:36.657Z',
    updatedAt: '2025-10-28T16:29:36.940Z',
    number: 92507
  },
  {
    _id: '6900e07ca0c0a9001c2f1cbc',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный space антарианский бургер',
    createdAt: '2025-10-28T15:25:48.375Z',
    updatedAt: '2025-10-28T15:26:02.575Z',
    number: 92506
  }
];

describe('Тест ordersSlice экшена fetchOrders', () => {
  it('Pending', () => {
    const state = orderSlice.reducer(initialState, {
      type: fetchOrders.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  it('Fulfilled', () => {
    const state = orderSlice.reducer(initialState, {
      type: fetchOrders.fulfilled.type,
      payload: mokOrders
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mokOrders);
  });

  it('Rejected', () => {
    const state = orderSlice.reducer(initialState, {
      type: fetchOrders.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error orders not found');
    expect(state.orders).toEqual([]);
  });
});

describe('Тест ordersSlice экшена createOrder', () => {
  it('Pending', () => {
    const state = orderSlice.reducer(initialState, {
      type: createOrder.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(null);
  });

  it('Fulfilled', () => {
    const state = orderSlice.reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: mockCreateOrderPayload
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(mockCreateOrderPayload.order);
  });

  it('Rejected', () => {
    const state = orderSlice.reducer(initialState, {
      type: createOrder.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error the order was not created');
    expect(state.order).toEqual(null);
  });
});

describe('Тест ordersSlice экшена fetchOrderByNumber', () => {
  it('Pending', () => {
    const state = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(null);
  });

  it('Fulfilled', () => {
    const state = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mokOrder
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.order).toEqual(mokOrder);
  });

  it('Rejected', () => {
    const state = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error order not found');
    expect(state.order).toEqual(null);
  });
});