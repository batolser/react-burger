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

export const App = () => {
  const api = 'https://norma.nomoreparties.space/api/ingredients ';

  const [ingredients, setIngredients] = React.useState([]);
  const [constructorIngredients, constructorIngredientsState] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [modalTitle, setModalTitle] = React.useState('');
  const [chosenIngredient, setChosenIngredient] = React.useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {

    getingredients();

  }, [])

  const getingredients = () => {
    fetch(api)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        setIngredients(res.data);
        constructorIngredientsState(res.data)
      })

      .catch((e) => {
        console.log('error :(((')
      });
  };

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
          <OrderDetails order={order} />
        </Modal>
      )
      }
      {ingredients.length &&
        <main className={appStyles.main}>
          <AppContext.Provider value={{ ingredients, setIngredients }}>
            <ConstructorContext.Provider value={{ constructorIngredients, constructorIngredientsState }}>
              <BurgerIngredients setChosenIngredient={setChosenIngredient} setIsModalOpen={setIsModalOpen} setModalTitle={setModalTitle} />
              <BurgerConstructor setOrder={setOrder} setIsModalOpen={setIsModalOpen} />
            </ConstructorContext.Provider>
          </AppContext.Provider>
        </main>


      }
    </div>
  );
}




