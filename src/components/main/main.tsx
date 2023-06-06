import React from 'react';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { addIngredient } from '../../services/actions/ingredients';

import appStyles from '../app/app.module.css';
import { IIngredient } from '../../services/types/types'

export const Main = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredientsData.ingredients);

  
 
  const chosenIngredients = useSelector((state) => state.ingredientsData.chosenIngredients);

  const handleDrop = (ingredientId: IIngredient) => {
    const targetIngredient = ingredients.find((ingredient: IIngredient) => ingredient._id === ingredientId._id)
    const selectedBun = chosenIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun')
    let selectedBunIndex
    if(selectedBun){
      selectedBunIndex = chosenIngredients.indexOf(selectedBun)
    }
    

    if (targetIngredient?.type === 'bun' && selectedBun && selectedBunIndex) {
      const chosenIngredientsClone = chosenIngredients.slice();
      chosenIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
      dispatch(addIngredient(chosenIngredientsClone));
    } else if (chosenIngredients && targetIngredient) {
      dispatch(addIngredient([...chosenIngredients, targetIngredient]));
    }
  };

    return (
        <div >
            {ingredients.length &&
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor onDropHandler={handleDrop} />
          </DndProvider>
        </main>
      }
        </div>
    );
}
