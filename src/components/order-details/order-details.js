import React from 'react';
import orderDetailsStyles from'./order-details.module.css';
import { DoneIcon } from '../done/done';
import { orderPropTypes } from '../../utils/types'



// import burgerConstructorStyles from './burger-constructor.module.css';


    export const OrderDetails = ({item}) => {
        
    return (
        
        <div class={orderDetailsStyles.order}>
            <h3 className={`${orderDetailsStyles.order__number} text text_type_digits-large mb-8`}>{item._id}</h3>
            <h4 className="text text_type_main-medium mb-15">идентификатор заказа</h4>
            <DoneIcon />
            <p className="text text_type_main-default mt-15  ">
                Ваш заказ начали готовить
            </p> 
            <p className="text text_type_main-default text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>         
        </div>
         
    );
  
}

OrderDetails.propTypes = {
    item: orderPropTypes.isRequired
  };