import React from 'react';
import styles from './styles.module.css';
import { OrdersItem } from '../orders-item/orders-item'
import { IOrder } from "../../services/types/types";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { changeBurgerDetails } from '../../services/actions/modal'

export const OrdersList = () => {

  const dispatch = useDispatch();
    const orders = useSelector((state) => state.ordersReducer.orders);

    const handleOpenBurgerInfoModal = React.useCallback((item: number) => {
        dispatch(changeBurgerDetails(item))
    }, [dispatch]);

    return ( 
        <div className={`${styles.wrapper} mr-15`}>
              <ul className={`${styles.list} pt-6 pb-10 pr-4 pl-4`}>
                {
                  orders?.map((order: IOrder, idx: number) => (
                    <OrdersItem key={idx} isHistory={false} order={order} onClick={() => { handleOpenBurgerInfoModal(order.number) }}/>
                  ))
                }
              </ul>
        </div>
      );
    };
