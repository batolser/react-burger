import {
  ORDER_DETAILS,
  INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/modal';

const initialState = {
  isIngredientsModalOpen: false,
  isOrderDetailsModalOpen: false,
  ingredient: {},
  order: null,
};

export const modalReducer = (state = initialState, action) => {

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