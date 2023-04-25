import React from 'react';
import styles from './styles.module.css';
import {NavLink, Route, Routes, useLocation } from "react-router-dom";
import { OrdersItem } from '../../components/orders-item/orders-item'
import { IOrder } from "../../services/types/types";
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { logout } from '../../services/actions/user';
import { useEffect, FC } from 'react';
// import { getUserInfo } from '../../services/actions/userActions';
import { wsStart, wsDisconnect, cleanOrderInfo } from '../../services/actions/orders';
import { changeBurgerDetails } from '../../services/actions/modal'
import { USER_ORDERS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';

export const ProfileFeedPage: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

//   const { orders, error } = useSelector((store) => store.socketReducer);
const orders = useSelector((state) => state.ordersReducer.orders);

  useEffect(() => {
    dispatch(wsStart(`${USER_ORDERS_URL}?token=${accessToken}`))
    return () => {
      dispatch(cleanOrderInfo());
      dispatch(wsDisconnect());
    
    };
  }, [])

  const setLogout = () => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken){
    dispatch(logout(refreshToken));
 
    }
  }

  const handleOpenBurgerInfoModal = React.useCallback((item: number) => {
    dispatch(changeBurgerDetails(item))
}, [dispatch]);

  return (
    <article className={styles.main}>
       <nav className={`${styles.navigation} mr-15 mt-30`}>
                <ul className={styles.list}>
                    <li className={styles.nav_item}>
                        <NavLink
                        to='/profile'
                        className={
                        `text text_type_main-medium ${styles.link}
                        ${pathname === '/profile' ? styles.link_active : 'text_color_inactive'}`
                          }
                          >
                        Профиль
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                        className={
                          `text text_type_main-medium ${styles.link}
                        ${pathname === '/profile/orders' ? styles.link_active : 'text_color_inactive'}`
                        } to='/profile/orders'
                        >
                        История заказов
                        </NavLink>
                    </li>
                    <li className={styles.nav_item}>
                        <NavLink
                        className={`${styles.link} text text_type_main-medium`}
                        onClick={setLogout} 
                        to='/'
                        >
                        Выход
                        </NavLink>
                    </li>
                </ul>
                <p
                className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
                >
                В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <div className={`${styles.wrapper} mr-15`}>
              <ul className={`${styles.list} pt-6 pb-10 pr-4 pl-4`}>
                {
                  orders?.map((order: IOrder, idx: number) => (
                    <OrdersItem key={idx} isHistory={true} order={order} onClick={() => { handleOpenBurgerInfoModal(order.number) }}/>
                  ))
                }
              </ul>
        </div>
    </article>
  )
};


