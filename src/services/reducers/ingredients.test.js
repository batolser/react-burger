import {ingredientsReducer, initialState} from './ingredients';

import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENTS,
    DELETE_ALL_INGREDIENTS
  } from '../actions/ingredients';


  const MOCK_INGREDIENTS = [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins : 80,
      fat : 24,
      carbohydrates : 53,
      calories : 420,
      price : 1255,
      image : "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile : "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large : "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v : 0
    },
    {
      _id : "643d69a5c3f7b9001cfa0941",
      name : "Биокотлета из марсианской Магнолии",
      type : "main",
      proteins : 420,
      fat : 142,
      carbohydrates : 242,
      calories : 4242,
      price : 424,
      image : "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile : "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large : "https://code.s3.yandex.net/react/code/meat-01-large.png",
      __v : 0
    },
    {
      _id : "643d69a5c3f7b9001cfa093e",
      name : "Филе Люминесцентного тетраодонтимформа",
      type : "main",
      proteins : 44,
      fat : 26,
      carbohydrates : 85,
      calories : 643,
      price : 988,
      image : "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile : "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large : "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v : 0
    },
    
 ];
 
  describe('ingredients reducer', () => {
    
    it('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle GET_INGREDIENTS', () => {
      const action = {
        type: GET_INGREDIENTS,
      }
      expect(
        ingredientsReducer(initialState, action)
      ).toEqual({
        ...initialState,
        ingredientsRequest: true,
        feedFailed: false,
      })
    })
  
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
      const action = {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: MOCK_INGREDIENTS
      }
      expect(
        ingredientsReducer(initialState, action)
      ).toEqual({
        ...initialState,
        ingredients: action.ingredients,
        ingredientsRequest: false
      })
    })
  
    it('should handle GET_INGREDIENTS_FAILED', () => {
      const action = {
        type: GET_INGREDIENTS_FAILED,
      }
      expect(
        ingredientsReducer(initialState, action)
      ).toEqual({
        ...initialState,
        ingredientsFailed: true,
        ingredientsRequest: false
      })
    })
    it('should handle ADD_INGREDIENT', () => {
        const action = {
          type: ADD_INGREDIENT,
          chosenIngredients: []
        }
        expect(
          ingredientsReducer(initialState, action)
        ).toEqual({
          ...initialState,
          chosenIngredients: action.payload
        })
      })

    it('should handle DELETE_ORDER_DATA', () => {
    const action = {
        type: DELETE_INGREDIENT,
        chosenIngredients: []
    }
    expect(
        ingredientsReducer(initialState, action)
    ).toEqual({
        ...initialState,
        chosenIngredients: action.payload
    
    })
    })
    it('should handle SORT_INGREDIENTS', () => {
        const action = {
            type: SORT_INGREDIENTS,
            chosenIngredients: MOCK_INGREDIENTS
        }
        expect(
            ingredientsReducer(initialState, action)
        ).toEqual({
            ...initialState,
            chosenIngredients: action.payload
        
        })
        })
    it('should handle DELETE_ALL_INGREDIENTS', () => {
        const action = {
            type: DELETE_ALL_INGREDIENTS,
            
        }
        expect(
            ingredientsReducer(initialState, action)
        ).toEqual({
            ...initialState,
            chosenIngredients: []
        
        })
        })
   
  })