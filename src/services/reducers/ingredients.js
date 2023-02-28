import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS
} from '../actions/ingredients';

export const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
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
        default: {
            return state
        }
    }
} 