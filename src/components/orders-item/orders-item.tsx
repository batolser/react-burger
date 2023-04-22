import styles from './styles.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import { IIngredient, IOrdersItemProps } from "../../services/types/types";
import {useSelector} from "../../services/hooks/hooks";
import {useLocation, NavLink } from 'react-router-dom';

export const OrdersItem: FC<IOrdersItemProps> = ({order, isHistory = false}) => {
    const location = useLocation();
    const orderIngredients = useSelector((state) => state.ingredientsData.ingredients)
    const {status, number, createdAt, name, ingredients} = order;

    const findIngredient = (ingredient: string, ingredients: IIngredient[]) => {
      return ingredients.find((foundIngredient: IIngredient) => foundIngredient._id === ingredient)
    }
  
    const checkStatus = (status: string) => {
      if (status === 'done') {
        return 'Создан'
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
    
    function formatDate(str: string) {
      return new Date(str).toLocaleString()
    }
  
    return (
      <li>
        <NavLink className={styles.link} 
        to={`${location.pathname}/${number}`}
        state={{ background: location }}
       >
          <div className={styles.header}>
            <p className="text text_type_digits-default">{`#${number}`}</p>
            <p className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</p>
          </div>
          <h2 className="text text_type_main-medium">{name}</h2>
          {
            (status && isHistory) && <p className="text text_type_main-default">{checkStatus(status)}</p>
          }
          <div className={styles.footer}>
            <ul className={styles.ingredients_list}>
              {
                ingredients.map((ingredient, idx) => {
                    const foundIngredient = findIngredient(ingredient, orderIngredients)
                    if (idx < 5) {
                      return (
                        <li key={idx} style={{zIndex: 999 - idx}} className={styles.ingredients_list_item}>
                          <img className={styles.ingredients_list_item_image} src={foundIngredient?.image}
                               alt={foundIngredient?.name}/>
                        </li>
                      )
                    }
                    return null
                  }
                )
              }
            </ul>
            <div className={styles.total}>
              <span className="text text_type_digits-default">{totalPrice()}</span>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </NavLink>
      </li>
    );
  };
  