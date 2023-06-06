import { IIngredient, IOrder } from "../types/types";
export const ORDER_DETAILS: 'ORDER_DETAILS' = 'ORDER_DETAILS';
export const INGREDIENT_DETAILS: 'INGREDIENT_DETAILS' = 'INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';
export const BURGER_DETAILS: 'BURGER_DETAILS' = 'BURGER_DETAILS';
export const DELETE_BURGER_DETAILS: 'DELETE_BURGER_DETAILS' = 'DELETE_BURGER_DETAILS';

export interface IOrderDetailsModalState {
    readonly type: typeof ORDER_DETAILS;
  }

  export interface IIngredientDetailsModalState {
    readonly type: typeof INGREDIENT_DETAILS;
    readonly ingredient: IIngredient;

  }

  export interface IDeleteIngredientDetailsModalState {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
  }

  export interface IBurgerDetailsModalState {
    readonly type: typeof BURGER_DETAILS;
    readonly burger: number;
  }
  export interface IDeleteBurgerDetailsModalState {
    readonly type: typeof DELETE_BURGER_DETAILS;
  }

  export type TModalActions =
  | IOrderDetailsModalState
  | IIngredientDetailsModalState
  | IDeleteIngredientDetailsModalState
  | IBurgerDetailsModalState
  | IDeleteBurgerDetailsModalState;


export const changeOrderDetails = (): IOrderDetailsModalState => ({
  type: ORDER_DETAILS,
});
export const changeIngredientDetails = (ingredient: IIngredient): IIngredientDetailsModalState => ({
  type: INGREDIENT_DETAILS,
  ingredient: ingredient,

});

export const deleteIngredientDetails = (): IDeleteIngredientDetailsModalState => ({ type: DELETE_INGREDIENT_DETAILS })

export const changeBurgerDetails = (burger:number): IBurgerDetailsModalState => ({
  type: BURGER_DETAILS,
  burger: burger
});
export const deleteBurgerDetails = (): IDeleteBurgerDetailsModalState => ({ type: DELETE_BURGER_DETAILS })
