import { useSelector } from "../../services/hooks/hooks";
import styles from './styles.module.css';
import { OrdersItem } from '../orders-item/orders-item'
import { IOrder } from "../../services/types/types";
export const OrdersList = () => {

    const orders = useSelector((state) => state.ordersReducer.orders);

    return (
        <div className={styles.wrapper}>
          <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
          <div
            className={`${styles.orders_container} mt-10`}>
          
            
                <ul className={`${styles.list} pt-6 pb-10 pr-4 pl-4`}>
                  {
                    orders?.map((order: IOrder, idx: number) => (
                      <OrdersItem key={idx} isHistory={false} order={order}/>
                    ))
                  }
                </ul>
            
          </div>
        </div>
      );
    };
