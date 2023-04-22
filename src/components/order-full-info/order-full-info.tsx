import {FC, useEffect} from 'react';
import OrderFullInfoStyles from './order-full-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
// import {IIngredient, IOrderFullInfoProps} from '../../services/types/types';
// import {useDispatch, useSelector} from "../../services/hooks/hooks";
// import Loader from "../loader/loader";
// import {getOrderInfo} from "../../services/actions/orders";

const OrderFullInfo = () => {
    const order = useSelector((state) => state.orderReducer.order);
//   const dispatch = useDispatch()
//   const {orderNumber} = useParams();
  
//   const orderInfo = useSelector(state => state.ordersData.orderInfo)

//   const allIngredients = useSelector((state) => state.ingredientsData.ingredients)

//   const foundIngredients = orderInfo?.ingredients.map((orderIngredient: string) => allIngredients.find((ingredient: IIngredient) => ingredient._id === orderIngredient))

//   const calculateSum = (): number => {
//     let sum = 0;
//     foundIngredients?.forEach((ingredient: IIngredient | undefined) => {
//       const orderedIngredient = allIngredients.find((orderIngredient: IIngredient) => orderIngredient?._id === ingredient?._id)
//       if (orderedIngredient?.price) {
//         sum += orderedIngredient.price
//       }
//     })
//     return sum
//   }

//   const checkStatus = (status: string) => {
//     if (status === 'pending') {
//       return 'Готовится'
//     } else {
//       return 'Выполнен'
//     }
//   }

//   const checkStyles = (status: string) => {
//     if (status === 'pending') {
//       return {
//         color: '#00CCCC'
//       }
//     } else {
//       return {}
//     }
//   }

//   function formatDate(str: string) {
//     return new Date(str).toLocaleString()
//   }

//   useEffect(() => {
//     orderNumber && dispatch(getOrderInfo(+orderNumber));
//   }, [dispatch, orderNumber])

  return (
    <>
      {
        // orderInfo?.number ? (
          <div className={OrderFullInfoStyles.order__wrapper} >
            <div className={OrderFullInfoStyles.order}>
              <p className={`text text_type_digits-default pb-10 ${OrderFullInfoStyles.order__number}`}>#{order}</p>
              <h2 className="text text_type_main-medium pb-3">Black Hole Singularity острый бургер</h2>
              <p className={`text text_type_main-default pb-15 ${OrderFullInfoStyles.order__status}`}
                //  style={checkStyles(orderInfo?.status)}
              >Выполнен</p>
              <p className="text text_type_main-medium pb-6">Состав:</p>
              <ul className={OrderFullInfoStyles.list}>
                {/* {
                  Array.from(new Set(foundIngredients))?.map((ingredient: IIngredient | undefined, idx: number) => {
                    return (
                      <li key={idx} className={OrderFullInfoStyles.list_item}>
                        <img className={OrderFullInfoStyles.image} src={ingredient?.image} alt=""/>
                        <h3
                          className={`text text_type_main-default ${OrderFullInfoStyles.title}`}>{ingredient?.name}</h3>
                        <div className={`text text_type_digits-default ${OrderFullInfoStyles.item_currency}`}>
                          <span>
                            {
                              foundIngredients && foundIngredients?.filter(filteredIngredient => filteredIngredient?._id === ingredient?._id).length
                            }
                          </span>
                          x
                          <div className={OrderFullInfoStyles.item_currency_container}>
                            <span>{ingredient?.price}</span>
                            <CurrencyIcon type="primary"/>
                          </div>
                        </div>
                      </li>
                    )
                  })
                } */}
              </ul>
              {/* <div className={OrderFullInfoStyles.footer}>
                <p className="text text_type_main-default text_color_inactive">{
                  formatDate(orderInfo?.createdAt)
                }</p>
                <div className={OrderFullInfoStyles.currency_container}>
                  <span className="text text_type_digits-default">{
                    calculateSum()
                  }</span>
                  <CurrencyIcon type="primary"/>
                </div>
              </div> */}
            </div>
          </div>
        // ) : <Loader/>
      }
    </>
  );
};

export default OrderFullInfo;