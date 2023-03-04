import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_ALL_INGREDIENTS
} from '../actions/ingredients';

export const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  chosenIngredients: []
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        feedFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: action.payload
      };
    }
    case DELETE_INGREDIENT: {
      return { ...state, chosenIngredients: action.payload };
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        chosenIngredients: action.payload
      };
    }
    case DELETE_ALL_INGREDIENTS: {
      return { 
        ...state, 
        chosenIngredients: [] 
      };
    }
    
    default: {
      return state
    }
  }
} 