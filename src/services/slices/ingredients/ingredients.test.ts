import { configureStore } from '@reduxjs/toolkit';
import ingredientSlice, {
  fetchIngredients,
  IngredientState
} from './ingredientSlice';

describe('Тест асинхронных экшенов ingredientsSlice', () => {
 
  const initialState: IngredientState = {
    ingredients: [],
    isLoading: false,
    error: null
  };
  const mokIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  it('Pending', () => {
    const state = ingredientSlice.reducer(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('Fulfilled', () => {
    const state = ingredientSlice.reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mokIngredients
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mokIngredients);
  });

  it('Rejected', () => {
    const state = ingredientSlice.reducer(initialState, {
      type: fetchIngredients.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error ingredients not found');
    expect(state.ingredients).toEqual([]);
  });
});
