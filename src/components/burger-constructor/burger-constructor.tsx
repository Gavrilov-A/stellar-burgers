import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  fetchIngredients,
  getIngredients
} from '../../services/slices/ingredientSlice';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, fetchOrders } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { getOrdersApi } from '@api';
import { loadUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients } = useSelector((state) => state.burger);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const orderRequest = useSelector((state) => state.orders.isLoading);
  const orderModalData = useSelector((state) => state.orders.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsBurger = [
      constructorItems.bun,
      ...constructorItems.ingredients,
      constructorItems.bun
    ];
    const totalBurger = ingredientsBurger.map((item) => item._id);

    if (isAuthenticated) {
      dispatch(createOrder(totalBurger));
    } else navigate('/login');
  };
  const closeOrderModal = () => {};

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
