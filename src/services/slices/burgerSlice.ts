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

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },

    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    clearIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  setBun,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} = burgerSlice.actions;
