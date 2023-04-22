
import {useDispatch} from "../../services/hooks/hooks";
import {useEffect} from 'react';
import styles from './styles.module.css';
import { OrdersList } from "../../components/orders-list/orders-list";
import { Stats } from "../../components/stats/stats";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/orders';
import { ALL_ORDERS_URL } from '../../utils/constants'

export function FeedPage() {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(wsConnectionStart(ALL_ORDERS_URL));
  
      return () => {
        dispatch(wsConnectionClosed())
      }
    }, [dispatch])
    
    return (
      <article className={styles.wrapper}>
        <OrdersList/>
        <Stats/>
      </article>
    );
  }