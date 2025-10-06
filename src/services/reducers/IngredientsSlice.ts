import { getIngredientsApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IngredientListState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: IngredientListState = {
  ingredients: [],
  isLoading: false
};

export const fetchIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { getIngredients } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
