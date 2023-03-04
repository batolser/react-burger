import { getIngredientsRequest } from '../../utils/api';
import { v4 as uniqueId } from "uuid";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const DELETE_ALL_INGREDIENTS = "DELETE_ALL_INGREDIENTS";

export function getIngredients() {
  return function(dispatch) {

    dispatch({
      type: GET_INGREDIENTS
    })

    getIngredientsRequest().then( res  => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    }).catch( err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
  }
} 


export const addIngredient = (newIngredientsArray) => {
  const changedArry = newIngredientsArray.map((ingredientObject) => {
    const ingredientCopy = Object.assign({}, ingredientObject);
    ingredientCopy.uuid = uniqueId();
    return ingredientCopy;
  });

  return { type: ADD_INGREDIENT, payload: changedArry };
};

export const deleteIngredient = (newIngredientsArray) => ({
  type: DELETE_INGREDIENT,
  payload: newIngredientsArray,
});


export const sortIngredients = (newIngredientsArray) => ({
  type: SORT_INGREDIENTS,
  payload: newIngredientsArray,
});

export const deleteAllIngredients = () => ({
  type: DELETE_ALL_INGREDIENTS
});