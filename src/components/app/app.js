import { React, useEffect } from 'react';

import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import { Main } from "../main/main";
import { LoginPage } from "../../pages/login/login";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { RegisterPage } from "../../pages/register/register";
import { ProfilePage } from "../../pages/profile/profile";
import { IngredientDetailsPage } from '../../pages/ingredient/ingredient';
import { NotFound404 } from '../../pages/404/404';

import { AppHeader } from "../header/header";

import { Modal } from "../modal/modal"
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-details/order-details"

import { deleteOrderData } from '../../services/actions/order';
import { deleteIngredientDetails, changeIngredientDetails } from '../../services/actions/modal';

import { useDispatch, useSelector } from 'react-redux';

import { getUserData } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'

import { ProtectedRoute } from '../protected-route-element/protected-route-element';
import { ProtectedRouteAuth } from '../protected-route-auth/protected-route-auth';


export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let background = location.state && location.state.background ? true : false;
  const order = useSelector(state => state.orderReducer.order);
  const isIngredientsModalOpen = useSelector(state => state.modalReducer.isIngredientsModalOpen);
  const isOrderDetailsModalOpen = useSelector(state => state.modalReducer.isOrderDetailsModalOpen);
  const ingredient = useSelector(state => state.modalReducer.ingredient);
  const modalTitle = 'Детали ингредиента';
  const accessToken = getCookie("accessToken");


  const closeOrderModal = () => {
    // setIsModalOpen(false);
    dispatch(deleteOrderData());
  };

  const closeIngredientModal = () => {
    dispatch(changeIngredientDetails(false))
    dispatch(deleteIngredientDetails());
  };

  useEffect(() => {
    dispatch(getUserData(accessToken));
  
  }, [dispatch]) 


  return (
    <div className="App">
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<ProtectedRouteAuth element={<LoginPage />} to={'/'}/>} />
        <Route path='/register' element={<ProtectedRouteAuth element={<RegisterPage />} to={'/'}/>} />
        <Route path='/forgot-password' element={<ProtectedRouteAuth element={<ForgotPasswordPage />} to={'/'}/>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} to={'/login'}/>} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
  
      {isIngredientsModalOpen && ingredient && (
        <Modal title={modalTitle} onClose={closeIngredientModal} background={background}>
          <IngredientDetails />
        </Modal>
      )
      }
      {isOrderDetailsModalOpen && order && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )
      }
     
    </div>
  );
}




