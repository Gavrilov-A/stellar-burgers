import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../utils/burger-api';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TNewOrderResponse } from '../../../utils/burger-api';
import { AppDispatch } from '../../store';
import { clearIngredients } from '../burger-constructor/burgerSlice';

export type OrderState = {
  order: TOrder | null;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  order: null,
  orders: [],
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'orders/fetchOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const createOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { dispatch: AppDispatch }
>('orders/createOrder', async (ingredients: string[], { dispatch }) => {
  const response = await orderBurgerApi(ingredients);
  dispatch(clearIngredients());
  return response;
});

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orders/fetchOrderByNumber',
  async (numberOrder: number) => {
    const response = await getOrderByNumberApi(numberOrder);
    return response.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- createOrder ---
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.isLoading = false;
          state.order = action.payload.order;
          state.error = null;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.order = null;
        state.isLoading = false;
        state.error = 'Error the order was not created';
      })

      // --- fetchOrders ---
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error orders not found';
      })

      // --- fetchOrderByNumber ---
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.order = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error order not found';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice;
