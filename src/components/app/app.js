import React from 'react';

import { AppHeader } from "../header/header";
import appStyles from './app.module.css';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal"
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-details/order-details"

import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import { addIngredient } from '../../services/actions/ingredients';
import { deleteOrderData } from '../../services/actions/order';
import { deleteIngredientDetails } from '../../services/actions/modal';


export const App = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredientsData.ingredients);
  const order = useSelector(state => state.orderReducer.order);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const ingredient = useSelector(state => state.modalReducer.ingredient);


  const closeOrderModal = () => {
    setIsModalOpen(false);
    dispatch(deleteOrderData());
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(deleteIngredientDetails());
  };

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
    <div className="App">
      <AppHeader />
      {isModalOpen && ingredient && (
        <Modal title={modalTitle} onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )
      }
      {isModalOpen && order && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )
      }
      {ingredients.length &&
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients setIsModalOpen={setIsModalOpen} setModalTitle={setModalTitle} />
            <BurgerConstructor setIsModalOpen={setIsModalOpen} onDropHandler={handleDrop} />
          </DndProvider>
        </main>


      }
    </div>
  );
}




