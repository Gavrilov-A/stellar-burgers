import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../../services/slices/burgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredientDown(index));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredientUp(index));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
