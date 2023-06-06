import { getIngredientsRequest } from '../../utils/api';
// @ts-ignore
import { v4 as uniqueId } from "uuid";
import { AppDispatch, IIngredient } from "../types/types";

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';
export const DELETE_ALL_INGREDIENTS: 'DELETE_ALL_INGREDIENTS' = 'DELETE_ALL_INGREDIENTS';

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: IIngredient[];
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient[];
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: IIngredient[];
}
export interface ISortIngredients {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: IIngredient[];
}
export interface IDeleteAllIngredients {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
  payload: never[];
}

export type TIngredientsActions =
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IAddIngredient
  | IDeleteIngredient
  | ISortIngredients
  | IDeleteAllIngredients;
  
export const getIngredients = () => {
  return function(dispatch: AppDispatch) {

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

export const addIngredient = (newIngredientsArray: IIngredient[]) => {
  const changedArry = newIngredientsArray.map((ingredientObject: IIngredient) => {
    const ingredientCopy = Object.assign({}, ingredientObject);
    ingredientCopy.uuid = uniqueId();
    return ingredientCopy;
  });

  return { type: ADD_INGREDIENT, payload: changedArry };
};

export const deleteIngredient = (newIngredientsArray: IIngredient[]) => ({
  type: DELETE_INGREDIENT,
  payload: newIngredientsArray,
});

export const sortIngredients = (newIngredientsArray: IIngredient[]) => ({
  type: SORT_INGREDIENTS,
  payload: newIngredientsArray,
});

export const deleteAllIngredients = () => ({
  type: DELETE_ALL_INGREDIENTS,
  payload: [] 
});