import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const idIngredient = useParams();
  const ingredient = ingredients.find((item) => item._id === idIngredient.id);

  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
