import React from 'react';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/actions/ingredients';
import { getIngredients } from '../../services/actions/ingredients';
import appStyles from '../app/app.module.css';

export const Main = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredientsData.ingredients);
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  React.useEffect(
    () => {
      dispatch(getIngredients());
    }, [dispatch]
  );
 
  const chosenIngredients = useSelector(state => state.ingredientsData.chosenIngredients);

  const handleDrop = (ingredientId) => {
    const targetIngredient = ingredients.find(ingredient => ingredient._id === ingredientId._id)
    const selectedBun = chosenIngredients.find(ingredient => ingredient.type === 'bun')
    const selectedBunIndex = chosenIngredients.indexOf(selectedBun)

    if (targetIngredient.type === 'bun' && selectedBun) {
      const chosenIngredientsClone = chosenIngredients.slice();
      chosenIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
      dispatch(addIngredient(chosenIngredientsClone));
    } else {
      dispatch(addIngredient([...chosenIngredients, targetIngredient]));
    }
  };

    return (
        <div >
            {ingredients.length &&
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients setModalTitle={setModalTitle} />
            <BurgerConstructor onDropHandler={handleDrop} />
          </DndProvider>
        </main>
      }
        </div>
    );
}
