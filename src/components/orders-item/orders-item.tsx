import styles from './styles.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import { IIngredient, IOrdersItemProps } from "../../services/types/types";
import {useSelector} from "../../services/hooks/hooks";
import {useLocation, NavLink } from 'react-router-dom';
import { IngredientIcon } from "../orders-item-img/orders-item-img";

export const OrdersItem: FC<IOrdersItemProps> = ({order, isHistory = false, onClick}) => {
    const location = useLocation();
    const orderIngredients = useSelector((state) => state.ingredientsData.ingredients)
    const {status, number, createdAt, name, ingredients} = order;

    const findIngredient = (ingredient: string, ingredients: IIngredient[]) => {
      return ingredients.find((foundIngredient: IIngredient) => foundIngredient._id === ingredient)
    }
  
    const checkStatus = (status: string) => {
      if (status === 'pending') {
        return 'Готовится'
      } else if( status === 'done' ) {
        return 'Выполнен'
      }
      else {
        return 'Создан'
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
  
    const totalPrice = () => {
      let sum = 0;
      ingredients.forEach((ingredient: string) => {
        const find = orderIngredients.find((orderIngredient: IIngredient) => orderIngredient._id === ingredient)
        if (find?.price) {
          sum += find.price
        }
      })
      return sum
    }

    return (
      <li className={styles.order__item} >
        <NavLink className={styles.link} 
        to={`${location.pathname}/${number}`}
        state={{ background: location }} onClick={onClick}
       >
          <div className={styles.info}>
            <p className="text text_type_digits-default">{`#${number}`}</p>
            <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(createdAt)} /></p>
          </div>
          <h2 className="text text_type_main-medium">{name}</h2>
          {
            (status && isHistory) && 
            <p className={`text text_type_main-default mb-15 ${styles.status}`}
            style={checkStyles(status)}
         >{
           checkStatus(status)
         }</p>
          }
          <div className={styles.details}>
            <ul className={styles.list}>
              {
                ingredients.map((ingredient, idx) => {
                    const foundIngredient = findIngredient(ingredient, orderIngredients)
                    if (idx < 6) {
                      return (
                        <IngredientIcon
                    src={foundIngredient?.image}
                    srcSet={foundIngredient?.image}
                    alt={foundIngredient?.name}
                    overflow={!idx ? ingredients.length - 6 : 0}
                    extraClass="items_picture"
                    key={idx}
                  />
                      )
                    }
                    return null
                  }
                )
              }
            </ul>
            {/* <div className={styles.items_listt}>{icons}</div> */}
            <div className={styles.total}>
              <span className="text text_type_digits-default">{totalPrice()}</span>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </NavLink>
      </li>
    );
  };
  