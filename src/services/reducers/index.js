import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  orderReducer: orderReducer,
  modalReducer: modalReducer,
  userReducer: userReducer,
});