import {FC, useEffect} from 'react';
import styles from './styles.module.css';
import {CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import {IIngredient, IOrderFullInfoProps} from '../../services/types/types';
import {getOrdersInfo} from "../../services/actions/orders";

export const OrderFullInfo = () => {
  const dispatch = useDispatch()
  // const {burger} = useParams();
  const { burger } = useSelector((state) => state.modalReducer);

  
  const orderInfo = useSelector(state => state.ordersReducer.orderInfo)

  const allIngredients = useSelector((state) => state.ingredientsData.ingredients)

  const foundIngredients = orderInfo?.ingredients.map((orderIngredient: string) => allIngredients.find((ingredient: IIngredient) => ingredient._id === orderIngredient))

  const calculateSum = (): number => {
    let sum = 0;
    foundIngredients?.forEach((ingredient: IIngredient | undefined) => {
      const orderedIngredient = allIngredients.find((orderIngredient: IIngredient) => orderIngredient?._id === ingredient?._id)
      if (orderedIngredient?.price) {
        sum += orderedIngredient.price
      }
    })
    return sum
  }

  const checkStatus = (status: string) => {
    if (status === 'pending') {
      return 'Готовится'
    } else {
      return 'Выполнен'
    }
  }

  const checkStyles = (status: string) => {
    if (status === 'done') {
      return {
        color: '#00CCCC'
      }
    } else {
      return {}
    }
  }


  useEffect(() => {
    burger && dispatch(getOrdersInfo(+burger));
  }, [dispatch, burger])

  return (
    <>
      {orderInfo &&

         ( <div className={styles.wrapper}>
              <p
                className={`text text_type_digits-default mb-10 ${styles.number}`}>#{
                orderInfo && orderInfo.number
              }</p>
              <h2 className="text text_type_main-medium mb-3">{
                orderInfo && orderInfo.name
              }</h2>
              <p className={`text text_type_main-default mb-15 ${styles.status}`}
                 style={checkStyles(orderInfo?.status)}
              >{
                checkStatus(orderInfo?.status)
              }</p>
              <p className="text text_type_main-medium mb-6">Состав:</p>
              <ul className={styles.list}>
                {
                  Array.from(new Set(foundIngredients))?.map((ingredient: IIngredient | undefined, idx: number) => {
                    return (
                      <li key={idx} className={styles.list_item}>
                        <div className={styles.container}>
                          <img className={styles.image} src={ingredient?.image} alt=""/>
                          <h3 className={`text text_type_main-default ${styles.title}`}>{ingredient?.name}</h3>
                        </div>
                        <div className={`text text_type_digits-default ${styles.item_currency}`}>
                          <span>
                            {
                              foundIngredients && foundIngredients?.filter(filteredIngredient => filteredIngredient?._id === ingredient?._id).length
                            }
                          </span>
                          x
                          <div className={styles.item_currency_container}>
                            <span>{ingredient?.price}</span>
                            <CurrencyIcon type="primary"/>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <div className={styles.details}>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(orderInfo?.createdAt)} /></p>
                <div className={styles.currency_container}>
                  <span className="text text_type_digits-default">{
                    calculateSum()
                  }</span>
                  <CurrencyIcon type="primary"/>
                </div>
              </div>
          
          </div>)

      }
    </>
  );
};