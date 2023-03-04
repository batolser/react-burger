import {
  ORDER_DETAILS,
  INGREDIENTS_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/modal';

const initialState = {
  isOrderDetailsModalOpen: false,
  isIngredientsModalOpen: false,
  ingredient: {},
  order: null,
};

export const modalReducer = (state = initialState, action) => {

  switch (action.type) {
    case ORDER_DETAILS: {
      return {
        ...state,
        order: action.order,
        isOrderDetailsModalOpen: action.payload,
      };
    }
    case INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredient: action.ingredient,
        isIngredientsModalOpen: action.payload
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: {},
      };
    }
    default: {
      return state;
    }
  }
};