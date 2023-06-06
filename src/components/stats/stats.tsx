import {useSelector} from "../../services/hooks/hooks";
import { IOrder } from "../../services/types/types";
import styles from './styles.module.css';
export const Stats = () => {

    const total = useSelector((state) => state.ordersReducer.total)
    const totalToday = useSelector((state) => state.ordersReducer.totalToday)
    const orders = useSelector((state) => state.ordersReducer.orders)

    const {ordersDone, ordersPending} = {
      ordersDone: orders?.filter((order: IOrder) => order.status === 'done'),
      ordersPending: orders?.filter((order: IOrder) => order.status === 'pending')
     }
  
    return (
      <div className={styles.wrapper}>
      
              <>
                <div className={styles.orders}>
                  
                      <div className={`${styles.ready} mr-9`}>
                        <p className="text text_type_main-medium pb-6">
                          Готовы:
                        </p>
                        <div className={styles.orders_container}>
                          <ul className={styles.list_ready}>
                            {
                              ordersDone?.map((order: IOrder, idx: number) => {
                                if (idx < 10 && order.status === 'done') {
                                  return (<li key={idx} className="text text_type_digits-default pb-2">
                                    {order.number}
                                  </li>)
                                }
                                return null
                              })
                            }
                          </ul>
                          <ul className={styles.list_ready}>
                            {
                              ordersDone?.map((order: IOrder, idx: number) => {
                                if (idx >= 10 && idx < 20 && order.status === 'done') {
                                  return (<li key={idx} className="text text_type_digits-default pb-2">
                                    {order.number}
                                  </li>)
                                }
                                return null
                              })
                            }
                          </ul>
                        </div>
                      </div>
                      <div className={styles.in_process}>
                        <p className="text text_type_main-medium pb-6">
                          В работе:
                        </p>
                        <ul className={styles.list}>
                          {
                            ordersPending?.map((order: IOrder, idx: number) => {
                              if (idx < 10 && order.status === 'pending') {
                                return (<li key={idx} className="text text_type_digits-default pb-2">
                                  {order.number}
                                </li>)
                              }
                              return null
                            })
                          }
                        </ul>
                      </div>

                </div>
                <div className={styles.all_time}>
                  <p className="text text_type_main-medium">
                    Выполнено за все время:
                  </p>
                  <span className={`${styles.digits} text text_type_digits-large`}>{total}</span>
                </div>
                <div>
                  <p className="text text_type_main-medium">
                    Выполнено за сегодня:
                  </p>
                  <span className={`${styles.digits} text text_type_digits-large`}>{totalToday}</span>
                </div>
              </>
          
      </div>
    );
  };
