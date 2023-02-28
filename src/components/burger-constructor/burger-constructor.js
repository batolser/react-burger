import React, { useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorContext } from '../../services/constructorContext';
import { sendOrder } from '../../services/actions/order';
import { useDispatch, useSelector } from 'react-redux';



export const BurgerConstructor = ({ setIsModalOpen }) => {

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.ingredients);

  const bun = useMemo(() => {
    return ingredients.find(item => item.type === 'bun');
  }, [ingredients]);


  const totalPrice = useMemo(() => {
    return ingredients.filter(item => item.type !== "bun").reduce((acc, item) => acc + item.price, 0) + bun.price * 2;
  }, [ingredients, bun.price]);

  // const newOrderData = useMemo(() => {
  //   return Array.from(ingredients).map(i => i._id).filter(i => i !== "")

  // }, [ingredients]);


  // const handleSendOrder = useCallback(() => async () => {
  //   const ingredientsIds = ingredients.map(ingredient => ingredient._id)
  //   dispatch(sendOrder(ingredientsIds));
  //   setIsModalOpen(true);
  //   // dispatch(changeOrderDetailsPopupState(true))
  // },[dispatch, ingredients, setIsModalOpen]);


  const handleSendOrder = async () => {
    const ingredientsIds = ingredients.map(ingredient => ingredient._id)
    dispatch(sendOrder(ingredientsIds));
    setIsModalOpen(true);
    // dispatch(changeOrderDetailsPopupState(true))
  }

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
  // setOrder: PropTypes.func.isRequired,
};

