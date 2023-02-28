import React from 'react';

import { AppHeader } from "../header/header";
import appStyles from './app.module.css';
import { AppContext } from '../../services/appContext';
import { ConstructorContext } from '../../services/constructorContext';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal"
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-details/order-details"

import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';


export const App = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients);
  const order = useSelector(state => state.order);
  const [constructorIngredients, constructorIngredientsState] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // const [order, setOrder] = React.useState();
  const [modalTitle, setModalTitle] = React.useState('');
  const [chosenIngredient, setChosenIngredient] = React.useState(null);

console.log(ingredients);
console.log(order)

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },[dispatch]
  );


  return (
    <div className="App">
      <AppHeader />
      {isModalOpen && chosenIngredient && (
        <Modal title={modalTitle} onClose={closeModal}>
          <IngredientDetails item={chosenIngredient} />
        </Modal>
      )
      }
      {isModalOpen && order && (
        <Modal onClose={closeModal}>
          <OrderDetails/>
        </Modal>
      )
      }
      {ingredients.length &&
        <main className={appStyles.main}>
          {/* <AppContext.Provider value={{ ingredients, setIngredients }}> */}
            {/* <ConstructorContext.Provider value={{ constructorIngredients, constructorIngredientsState }}> */}
              <BurgerIngredients setChosenIngredient={setChosenIngredient} setIsModalOpen={setIsModalOpen} setModalTitle={setModalTitle} />
              <BurgerConstructor setIsModalOpen={setIsModalOpen} />
            {/* </ConstructorContext.Provider> */}
          {/* </AppContext.Provider> */}
        </main>


      }
    </div>
  );
}




