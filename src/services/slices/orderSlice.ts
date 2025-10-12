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

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const data = await getOrdersApi();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string }
>('orders/createOrder', async (ingredients, { rejectWithValue }) => {
  try {
    const data = await orderBurgerApi(ingredients);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orders/fetchOrderByNumber', async (numberOrder, { rejectWithValue }) => {
  try {
    const order = await getOrderByNumberApi(numberOrder);
    return order.orders[0];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const orderSlice = createSlice({
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
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unknown error';
      })

      // --- fetchOrders ---
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unknown error';
      })

      // --- fetchOrderByNumber ---
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getOrderByNumber: (state) => state.order
  }
});

export const { clearOrder } = orderSlice.actions;
export const { getOrders, getOrderByNumber } = orderSlice.selectors;
export default orderSlice.reducer;
