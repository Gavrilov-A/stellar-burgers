import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TNewOrderResponse } from '../../utils/burger-api';

type OrderState = {
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

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orders/fetchOrderByNumber',
  async (numberOrder: number) => {
    const response = await getOrderByNumberApi(numberOrder);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
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
        state.error = 'Error not found';
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
        state.error = 'Error not found';
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
        state.error = 'Error not found';
      });
  }
});

export default orderSlice;
