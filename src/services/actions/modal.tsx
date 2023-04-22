import { IIngredient } from "../types/types";
export const ORDER_DETAILS: 'ORDER_DETAILS' = 'ORDER_DETAILS';
export const INGREDIENT_DETAILS: 'INGREDIENT_DETAILS' = 'INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export interface IOrderDetailsModalState {
    readonly type: typeof ORDER_DETAILS;
    readonly status: boolean;
  }

  export interface IIngredientDetailsModalState {
    readonly type: typeof INGREDIENT_DETAILS;
    readonly ingredient: IIngredient;
    readonly status: boolean;
  }

  export interface IDeleteIngredientDetailsModalState {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
    readonly status: boolean;
  }

  export type TModalActions =
  | IOrderDetailsModalState
  | IIngredientDetailsModalState
  | IDeleteIngredientDetailsModalState;

export const changeOrderDetails = (status: boolean) => ({ type: ORDER_DETAILS, status: status })
// export const changeIngredientDetails = (status: boolean) => ({ type: INGREDIENT_DETAILS, status: status })
export const deleteIngredientDetails = (status: boolean) => ({ type: DELETE_INGREDIENT_DETAILS, status: status })

export const changeIngredientDetails = (ingredient: IIngredient, status: boolean) => ({
  type: INGREDIENT_DETAILS,
  ingredient: ingredient,
  status: status

});