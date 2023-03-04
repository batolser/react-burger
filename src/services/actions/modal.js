export const ORDER_DETAILS = 'ORDER_DETAILS';
export const INGREDIENTS_DETAILS = 'INGREDIENTS_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENTS_DETAILS';

export const changeOrderDetails = (status) => ({ type: ORDER_DETAILS, payload: status })
export const changeIngredients = (status) => ({ type: INGREDIENTS_DETAILS, payload: status })
export const deleteIngredientDetails = () => ({ type: DELETE_INGREDIENT_DETAILS })