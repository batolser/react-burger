import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { userReducer } from './user';
import { ordersReducer } from './orders'

export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  orderReducer: orderReducer,
  modalReducer: modalReducer,
  userReducer: userReducer,
  ordersReducer: ordersReducer
});