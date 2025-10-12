import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<
  TFeedsResponse,
  void,
  { rejectValue: string }
>('feeds/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch feeds');
  }
});

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
  selectors: {
    getFeedsOrders: (state) => state.orders,
    getFeedsTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday,
    isFeedsLoading: (state) => state.isLoading,
    getFeedsError: (state) => state.error
  }
});

export const {
  getFeedsOrders,
  getFeedsTotal,
  getFeedsTotalToday,
  isFeedsLoading,
  getFeedsError
} = feedsSlice.selectors;

export default feedsSlice;
