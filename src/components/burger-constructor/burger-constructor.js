import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import { sendOrder } from '../../services/actions/order';
import { deleteAllIngredients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChosenIngredient from '../chosen-ingredient/chosen-ingredient';
import update from 'immutability-helper';
import { sortIngredients } from '../../services/actions/ingredients';


export const BurgerConstructor = ({ onDropHandler }) => {

  const dispatch = useDispatch();
  const chosenIngredients = useSelector(state => state.ingredientsData.chosenIngredients);

  const totalPrice = useMemo(() => 
  chosenIngredients.reduce((acc, cur) => cur.type === 'bun' ? acc + (cur.price * 2) : acc + cur.price, 0),
  [chosenIngredients]);


  const handleSendOrder = async () => {
    const ingredientsIds = chosenIngredients.map(ingredient => ingredient._id)
    dispatch(sendOrder(ingredientsIds));
    dispatch({type: 'ORDER_DETAILS'});
    dispatch(deleteAllIngredients());
  }

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(ingredientId) {
      onDropHandler(ingredientId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });


  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    const bun = chosenIngredients.filter(ingredient => ingredient.type === 'bun')
    const mainIngredients = chosenIngredients.filter(ingredient => ingredient.type !== 'bun')
    const sortedIngredients = update(mainIngredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, mainIngredients[dragIndex]],
      ],
    }, [mainIngredients])
    const sortedInregientsWithBun = [...bun, ...sortedIngredients]

    dispatch(sortIngredients([...sortedInregientsWithBun]));

  }, [chosenIngredients, dispatch]);


  const borderColor = isHover ? '#4C4CFF' : 'transparent';

  const bunItem = (
    chosenIngredients, property, trueValue, falseValue
  ) => chosenIngredients.find(ingredient => ingredient.type === 'bun') ? `${(chosenIngredients.find(ingredient => ingredient.type === 'bun'))[property]} ${trueValue}` : falseValue

  return (
    <section className={burgerConstructorStyles.burger__constructor} >
      <DndProvider backend={HTML5Backend}>
        <div className={burgerConstructorStyles.ingredients} ref={dropRef} style={{ borderColor }}>
          <div>

            {
              chosenIngredients.length > 0 ? <ConstructorElement
                type="top"
                isLocked={true}
                text={bunItem(chosenIngredients, 'name', '(верх)', 'Выберите булку')}
                price={bunItem(chosenIngredients, 'price', '', '0')}
                thumbnail={bunItem(chosenIngredients, 'image', '', '')}

              /> : <p className="text text_type_main-large pt-3">
                Выберите булку
              </p>
            }
          </div>

          <div className={burgerConstructorStyles.ingredients__list}>

            {chosenIngredients.map((ingredient, idx) =>
              ingredient.type !== 'bun'
              && <ChosenIngredient key={ingredient.uuid} index={idx} moveIngredient={moveIngredient}
                ingredient={ingredient} id={`${ingredient._id}${idx}`} />
            )}
          </div>

          <div>{
            chosenIngredients.length > 0 && <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunItem(chosenIngredients, 'name', '(низ)', 'Выберите булку')}
              price={bunItem(chosenIngredients, 'price', '', '0')}
              thumbnail={bunItem(chosenIngredients, 'image', '', '')}
            />
          }</div>
          <div className={burgerConstructorStyles.total}>
            <div className={burgerConstructorStyles.price}>
              <p className='text text_type_digits-default mr-4'>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            {
              chosenIngredients.length > 0 &&
              <Button htmlType="button" type="primary" size="large" id="order" onClick={handleSendOrder} >
              Оформить заказ
            </Button>
            }
           
          </div>
        </div>

      </DndProvider>
    </section>
  );

}


BurgerConstructor.propTypes = {
  // setIsModalOpen: PropTypes.func.isRequired,
  onDropHandler: PropTypes.func.isRequired,
};

