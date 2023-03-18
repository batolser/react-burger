export const ORDER_DETAILS = 'ORDER_DETAILS';
export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const changeOrderDetails = (status) => ({ type: ORDER_DETAILS, status: status })
export const changeIngredientDetails = (status) => ({ type: INGREDIENT_DETAILS, status: status })
export const deleteIngredientDetails = (status) => ({ type: DELETE_INGREDIENT_DETAILS, status: status })