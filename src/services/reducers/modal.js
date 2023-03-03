import {
  ORDER_DETAILS,
  INGREDIENTS_DETAILS
} from '../actions/modal';

const initialState = {
  isOrderDetailsModalOpen: false,
  isIngredientsModalOpen: false,
  ingredient: {},
};

export const modalReducer = (state = initialState, action) => {

  switch (action.type) {
    case ORDER_DETAILS: {
      return {
        ...state,
        ingredient: action.ingredient,
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
    default: {
      return state;
    }
  }
};