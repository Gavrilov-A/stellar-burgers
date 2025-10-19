import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientSlice';
import { fetchOrderByNumber } from '../../services/slices/orderSlice';
import { useParams } from 'react-router-dom';
import { Modal } from '@components';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );

  const orderData = useSelector((state) => {
    if (!number) return null;
    let order = state.feeds.orders.find((item) => item.number === +number);
    if (order) {
      return order;
    }
    order = state.orders.orders.find((item) => item.number === +number);
    state.orders;
    if (order) {
      return order;
    }
    return state.orders.order;
  });

  useEffect(() => {
    if (number) {
      const num = +number;
      if (!isNaN(num)) {
        dispatch(fetchOrderByNumber(num));
      }
    }
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <Modal title={`Заказ №${number}`} onClose={() => {}}>
      <OrderInfoUI orderInfo={orderInfo} />
    </Modal>
  );
};
