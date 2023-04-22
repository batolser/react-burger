import { TModalActions } from '../actions/modal';
import { IModalState } from '../types/types';
import {
  ORDER_DETAILS,
  INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/modal';

const initialState: IModalState = {
  isIngredientsModalOpen: false,
  isOrderDetailsModalOpen: false,
  ingredient: null,
  order: null,
};

export const modalReducer = (state = initialState, action: TModalActions) => {

  switch (action.type) {
    case ORDER_DETAILS: {
      return {
        ...state,
        isOrderDetailsModalOpen: true,
      };
    }
    case INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.ingredient,
        isIngredientsModalOpen: true
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: {},
        isIngredientsModalOpen: false
      };
    }
    default: {
      return state;
    }
  }
};