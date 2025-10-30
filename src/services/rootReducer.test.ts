// rootReducer.test.ts

import { rootReducer } from './store';
import { ingredientSlice } from './slices/ingredients/ingredientSlice';
import orderSlice from './slices/orders/orderSlice';
import burgerSlice from './slices/burger-constructor/burgerSlice';
import feedsSlice from './slices/feed/feedsSlice';
import userSlice from './slices/user/userSlice';

describe('rootReducer', () => {
  it('Проверка инициализации', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('burger');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('user');
    
    expect(initialState.ingredients).toEqual(ingredientSlice.getInitialState());
    expect(initialState.orders).toEqual(orderSlice.getInitialState());
    expect(initialState.burger).toEqual(burgerSlice.getInitialState());
    expect(initialState.feeds).toEqual(feedsSlice.getInitialState());
    expect(initialState.user).toEqual(userSlice.getInitialState());
  });
});
