import { TIngredient } from '@utils-types';
import burgerSlice, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from './burgerSlice';

jest.mock('react-uuid', () => ({
  __esModule: true,
  default: jest.fn(() => 'mocked-uuid')
}));

const mockIngredient: TIngredient = {
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
};
const initialState = {
  bun: null,
  ingredients: [
    { ...mockIngredient, id: 'id-1' },
    { ...mockIngredient, id: 'id-2' },
    { ...mockIngredient, id: 'id-3' }
  ]
};

describe('Тесты экшенов burgerSlice', () => {
  it('Обработка экшена добавления ингредиента', () => {
    const initialData = { ...initialState, ingredients: [] };
    const action = addIngredient(mockIngredient);
    const result = burgerSlice.reducer(initialData, action);

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual({
      ...mockIngredient,
      id: 'mocked-uuid'
    });
  });

  it('Обработка экшена удаления ингредиента', () => {
    const action = removeIngredient(2);
    const result = burgerSlice.reducer(initialState, action);

    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients).toEqual([
      { ...mockIngredient, id: 'id-1' },
      { ...mockIngredient, id: 'id-2' }
    ]);
  });

  it('Обработка экшена поднятие вверх по списку', () => {
    const action = moveIngredientUp(2);
    const result = burgerSlice.reducer(initialState, action);

    expect(result.ingredients).toEqual([
      { ...mockIngredient, id: 'id-1' },
      { ...mockIngredient, id: 'id-3' },
      { ...mockIngredient, id: 'id-2' }
    ]);
  });
  it('Обработка экшена поднятие вниз по списку', () => {
    const action = moveIngredientDown(0);
    const result = burgerSlice.reducer(initialState, action);

    expect(result.ingredients).toEqual([
      { ...mockIngredient, id: 'id-2' },
      { ...mockIngredient, id: 'id-1' },
      { ...mockIngredient, id: 'id-3' }
    ]);
  });
});
