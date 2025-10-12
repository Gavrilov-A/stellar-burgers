import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

type TBurgerState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },

    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },

    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, clearIngredients, setBun } =
  burgerSlice.actions;
