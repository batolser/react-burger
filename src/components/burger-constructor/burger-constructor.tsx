import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';

const constructorPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  
});

    export const BurgerConstructor = ({ ingredients }) => {
  
    return (
      <section className={burgerConstructorStyles.burger__constructor}>
        
        <div className="mt-25 mb-10" style={{ maxWidth: '100%' }}>
          <div className={burgerConstructorStyles.ingredients}>
            
             {ingredients.map((item, index) => (
            <div className={burgerConstructorStyles.card__wrapper}>
              <DragIcon type="primary" />
              <ConstructorElement
              key={index}
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
            </div>
            
            ))}
            
          </div>
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
  ingredients: PropTypes.arrayOf(constructorPropTypes).isRequired
};

