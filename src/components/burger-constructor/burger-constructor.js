import React, { useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorContext } from '../../services/constructorContext';
import { sendOrder } from '../../utils/api';


export const BurgerConstructor = ({ setOrder, setIsModalOpen }) => {

  const { constructorIngredients } = useContext(ConstructorContext);


  const bun = useMemo(() => {
    return constructorIngredients.find(item => item.type === 'bun');
  }, [constructorIngredients]);


  const totalPrice = useMemo(() => {
    return constructorIngredients.filter(item => item.type !== "bun").reduce((acc, item) => acc + item.price, 0) + bun.price * 2;
  }, [constructorIngredients, bun.price]);

  const newOrderData = useMemo(() => {
    return Array.from(constructorIngredients).map(i => i._id).filter(i => i !== "")

  }, [constructorIngredients]);


  const handleSendOrder = useCallback(() => {

    sendOrder({ ingredients: newOrderData }).then(data => {
      setOrder(data.order.number);
    });
    setIsModalOpen(true);
  }, [newOrderData, setOrder, setIsModalOpen]);


  return (
    <section className={burgerConstructorStyles.burger__constructor}>

      <div className={burgerConstructorStyles.ingredients}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <div className={burgerConstructorStyles.ingredients__list}>

          {constructorIngredients.filter(item => item.type !== "bun")
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
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <div className={burgerConstructorStyles.total}>
          <div className={burgerConstructorStyles.price}>
            <p className='text text_type_digits-default mr-4'>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" id="order" onClick={handleSendOrder} >
            Оформить заказ
          </Button>
        </div>
      </div>


    </section>
  );

}


BurgerConstructor.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
};

