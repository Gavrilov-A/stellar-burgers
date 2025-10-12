import {
  combineReducers,
  combineSlices,
  configureStore,
  createReducer,
  Slice
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientSlice } from './slices/ingredientSlice';
import { orderSlice } from './slices/orderSlice';
import { burgerSlice } from './slices/burgerSlice';
import { feedsSlice } from './slices/feedsSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineSlices({
  ingredients: ingredientSlice.reducer,
  orders: orderSlice.reducer,
  burger: burgerSlice.reducer,
  feeds: feedsSlice.reducer,
  user: userSlice.reducer
});

// Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
