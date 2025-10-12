import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  fetchIngredients,
  getIngredients
} from '../../services/slices/ingredientSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const bun = useSelector((state) => state.burger.bun);
  const burgerIngredients = useSelector((state) => state.burger.ingredients);

  const constructorItems = {
    bun: bun,
    ingredients: burgerIngredients
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
