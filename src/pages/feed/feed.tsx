
import {useDispatch} from "../../services/hooks/hooks";
import {useEffect} from 'react';
import styles from './styles.module.css';
import { OrdersList } from "../../components/orders-list/orders-list";
import { Stats } from "../../components/stats/stats";
import { wsStart, wsDisconnect, cleanOrderInfo } from '../../services/actions/orders';
import { ALL_ORDERS_URL } from '../../utils/constants'

export function FeedPage() {

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(wsStart(ALL_ORDERS_URL));
      return () => {
        dispatch(wsDisconnect())
        dispatch(cleanOrderInfo())

      }
    }, [])
    
    return (
      <article className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>Лента заказов</h1>
        <div className={styles.main}>
          <OrdersList/>
          <Stats/>
        </div>
      </article>
    );
  }