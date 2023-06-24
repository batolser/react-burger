import { useEffect } from 'react';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Main } from "../main/main";
import { LoginPage } from "../../pages/login/login";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { RegisterPage } from "../../pages/register/register";
import { ProfilePage } from "../../pages/profile/profile";
import { IngredientDetailsPage } from '../../pages/ingredient/ingredient';
import { NotFound404 } from '../../pages/404/404';
import { OrderFullInfoPage } from '../../pages/order-full-info/order-full-info'
import { OrderFullInfo } from '../order-full-info/order-full-info'
import { FeedPage } from '../../pages/feed/feed';
import { ProfileFeedPage } from '../../pages/profile-feed/profile-feed';

import { AppHeader } from "../header/header";

import { Modal } from "../modal/modal"
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-details/order-details"

import { deleteOrderData } from '../../services/actions/order';
import { deleteIngredientDetails, deleteBurgerDetails } from '../../services/actions/modal';

import { useDispatch, useSelector } from "../../services/hooks/hooks";

import { getUserData } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'

import { ProtectedRoute } from '../protected-route-element/protected-route-element';
import { ProtectedRouteAuth } from '../protected-route-auth/protected-route-auth';
import { getIngredients } from '../../services/actions/ingredients';


export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location };
  const order = useSelector((state) => state.orderReducer.order);
  const { ingredient, isIngredientsModalOpen, isOrderDetailsModalOpen, isBurgerModalOpen } = useSelector((state) => state.modalReducer);
  const modalTitle = 'Детали ингредиента';
  const accessToken = getCookie("accessToken");


  const closeOrderModal = () => {
    dispatch(deleteOrderData());
  };

  const closeIngredientModal = () => {
    dispatch(deleteIngredientDetails());
    state?.background && navigate(-1);
  };

  const closeBurgerModalOpen = () => {
    dispatch(deleteBurgerDetails());
    state?.background && navigate(-1);
  };

  useEffect(() => {
    if(accessToken){
      dispatch(getUserData(accessToken));
    }
  }, [dispatch]) 
  
  useEffect(
    () => {
      dispatch(getIngredients());
    }, [dispatch]
  );

  return (
    <div className="App">
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<ProtectedRouteAuth element={<LoginPage />} to={'/'}/>} />
        <Route path='/register' element={<ProtectedRouteAuth element={<RegisterPage />} to={'/'}/>} />
        <Route path='/forgot-password' element={<ProtectedRouteAuth element={<ForgotPasswordPage />} to={'/'}/>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} to={'/login'}/>} />
        <Route path='/profile/orders' element={<ProtectedRoute element={<ProfileFeedPage />} to={'/login'}/>} />
        <Route path='/profile/orders/:orderNumber' element={<ProtectedRoute element={<OrderFullInfoPage />} to={'/login'}/>} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path="/feed/:orderNumber" element={<OrderFullInfoPage/>} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      
      {state?.background && 
      (
        <Routes>
          <Route path="/ingredients/:ingredientId" element={(
            <Modal title={modalTitle} onClose={closeIngredientModal} >
              <IngredientDetails />
            </Modal >
          )} />
        </Routes>
      )}
      {isOrderDetailsModalOpen && order && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )
      }
       {state?.background && (
        <Routes>
          <Route path="/feed/:orderNumber" element={(
            <Modal onClose={closeBurgerModalOpen} >
            <OrderFullInfo />
          </Modal>
          )} />
        </Routes>
      )}
      {state?.background && (
        <Routes>
          <Route path="/profile/orders/:orderNumber" element={(
            <Modal onClose={closeBurgerModalOpen} >
            <OrderFullInfo />
          </Modal>
          )} />
        </Routes>
      )}
     
     
    </div>
  );
}




