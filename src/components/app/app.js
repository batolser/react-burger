import React, { useEffect } from 'react';

import { AppHeader } from "../header/header";
import appStyles from './app.module.css';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal"

import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-details/order-details"

const orders = require('../../utils/orders');

export const App = () => {
  const api = 'https://norma.nomoreparties.space/api/ingredients ';

  const [ingredients, setIngredients] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modal, setModal] = React.useState();
  const [order, setOrder] = React.useState();
  
  // const [modalTitle, setModalTitle] = React.useState();   
  let newPopup;
  let modalTitleContent


const openModal = (e) => {
 
  setIsModalOpen(true);

  if(e.currentTarget.className.includes('burger-ingredients_card') ){
  
    newPopup = ingredients.filter(item => item._id === e.currentTarget.id)
    .map((item) => (
      <IngredientDetails item = {item}/>
    ))
    modalTitleContent = "Детали ингредиента";

  }
  else if(e.currentTarget.id = 'order'){
    // newPopup = <OrderDetails />
   
    console.log(orders)
    newPopup = order.filter(item => item._id === '03453600' )
    .map((item) => (<OrderDetails item = {item} />))
  }

  const modalEl =  <Modal title={modalTitleContent} onClose={closeModal} >
       {newPopup}
    </Modal>

  setModal(modalEl)

};

const closeModal = () => {
  setIsModalOpen(false);
};

  React.useEffect (() => {
 
    getingredients();
    setOrder(orders);
}, [])  

  const getingredients = () => {
    fetch(api)
    .then((res) => res.json())
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
        <BurgerIngredients ingredients={ingredients} onClick={openModal}/>
        <BurgerConstructor ingredients={ingredients} onClick={openModal}/>
      </main>
      
    </div>
  );
  
}


