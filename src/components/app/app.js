import React from 'react';

import { AppHeader } from "../header/header";
import appStyles from './app.module.css';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal"

import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-details/order-details"

// const orders = require('../../utils/orders');

export const App = () => {
  const api = 'https://norma.nomoreparties.space/api/ingredients ';

  const [ingredients, setIngredients] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modal, setModal] = React.useState();
  const [order, setOrder] = React.useState('0123456');
  const [modalTitle, setModalTitle] = React.useState('');
  const [newPopup, newPopupContent] = React.useState();

  // let modalContent;



  const openModal = (e) => {
    setIsModalOpen(true);

    if (e.currentTarget.className.includes('burger-ingredients_card')) {

      newPopupContent(ingredients.filter((item) => item._id === e.currentTarget.id)
        .map((item, index) => (
          <IngredientDetails item={item} key={index} />
        )));
      setModalTitle("Детали ингредиента");

    }
    else if (e.currentTarget.id === 'order') {

      newPopupContent(<OrderDetails orderNumber={order} />)
    }

  };

  React.useEffect(() => {


    const modalEl = (<Modal title={modalTitle} onClose={closeModal}>
      {newPopup}
    </Modal>);

    setModal(modalEl)
    //   return () => {
    //     setModal()
    // }
  }, [modalTitle, newPopup])


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
      .then((res) => setIngredients(res.data))
      .catch((e) => {
        console.log('error :(((')
      });
  };

  return (
    <div className="App">
      <AppHeader />

      {/* <button onClick={openModal} id="order">Открыть</button> */}
      {isModalOpen && modal}


      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredients} onClick={openModal} />
        <BurgerConstructor ingredients={ingredients} onClick={openModal} />
      </main>

    </div>
  );

}


