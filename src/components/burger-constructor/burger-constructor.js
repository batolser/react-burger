import React from 'react';
import PropTypes from 'prop-types';
import { checkPropTypes } from '../../utils/types'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';


    export const BurgerConstructor = ({ ingredients }) => {
  
    return (
      <section className={burgerConstructorStyles.burger__constructor}>
        
        <div className={burgerConstructorStyles.ingredients}>
        <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
          <div className={burgerConstructorStyles.ingredients__list}>
         

           

           {ingredients.filter(item => item.type !== "bun")
            .map((item) => (
              <div className={burgerConstructorStyles.card__wrapper} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
           
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              type={item.top}
            />
            </div>
            ))}
            
          </div>
          <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
          <div className={burgerConstructorStyles.total}>
              <div className={burgerConstructorStyles.price}>
                <p className='text text_type_digits-default mr-4'>600</p> 
                <CurrencyIcon type="primary" />
              </div>
              <Button htmlType="button" type="primary" size="large">
              Оформить заказ
              </Button>
            </div>
        </div> 
               

      </section>
    );
  
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(checkPropTypes).isRequired
};

