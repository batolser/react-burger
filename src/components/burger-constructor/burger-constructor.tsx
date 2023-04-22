import React, { FC, useMemo, useCallback } from 'react';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import { sendOrder } from '../../services/actions/order';
import { deleteAllIngredients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChosenIngredient from '../chosen-ingredient/chosen-ingredient';
import update from 'immutability-helper';
import { sortIngredients } from '../../services/actions/ingredients';
import { getCookie } from '../../utils/cookie';
import { IBurgerConstructorProps, IIngredient } from '../../services/types/types'

export const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onDropHandler }) => {

  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  const chosenIngredients = useSelector((state) => state.ingredientsData.chosenIngredients);

  const totalPrice = useMemo(() => 
  chosenIngredients.reduce((acc: number, cur: IIngredient) => cur.type === 'bun' ? acc + (cur.price * 2) : acc + cur.price, 0),
  [chosenIngredients]);


  const handleSendOrder = async () => {
    const ingredientsIds = chosenIngredients.map((ingredient: IIngredient) => ingredient._id)
    dispatch(sendOrder(ingredientsIds));
    dispatch({type: 'ORDER_DETAILS'});
    dispatch(deleteAllIngredients());
  }

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(ingredientId: IIngredient) {
      onDropHandler(ingredientId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });


  const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
    const bun = chosenIngredients.filter((ingredient: IIngredient) => ingredient.type === 'bun')
    const mainIngredients = chosenIngredients.filter((ingredient: IIngredient) => ingredient.type !== 'bun')
    const sortedIngredients = update(mainIngredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, mainIngredients[dragIndex]],
      ],
    });
    const sortedInregientsWithBun = [...bun, ...sortedIngredients]

    dispatch(sortIngredients([...sortedInregientsWithBun]));

  }, [chosenIngredients, dispatch]);


  const borderColor = isHover ? '#4C4CFF' : 'transparent';

  const bunItem = (
    chosenIngredients: IIngredient[], property: string, trueValue :string, falseValue: string
  ) => chosenIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun') 
   // @ts-ignore
  ? `${(chosenIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun'))[property]} ${trueValue}` : falseValue

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
                price={+bunItem(chosenIngredients, 'price', '', '0')}
                thumbnail={bunItem(chosenIngredients, 'image', '', '')}

              /> : <p className="text text_type_main-large pt-3">
                Выберите булку
              </p>
            }
          </div>

          <div className={burgerConstructorStyles.ingredients__list}>

            {chosenIngredients.map((ingredient : IIngredient, idx: number) =>
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
              price={+bunItem(chosenIngredients, 'price', '', '0')}
              thumbnail={bunItem(chosenIngredients, 'image', '', '')}
            />
          }</div>
          <div className={burgerConstructorStyles.total}>
            <div className={burgerConstructorStyles.price}>
              <p className='text text_type_digits-default mr-4'>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            {
            accessToken && chosenIngredients.length > 0 &&
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



