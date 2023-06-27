import {modalReducer, initialState} from './modal';
import {
    ORDER_DETAILS,
    INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    BURGER_DETAILS,
    DELETE_BURGER_DETAILS
  } from '../actions/modal';

  const MOCK_INGREDIENT = [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    }
 ]

 const MOCK_BURGER = 7083;

  describe('modal reducer', () => {
   
    it('should return the initial state', () => {
      expect(modalReducer(undefined, {})).toEqual({
        isIngredientsModalOpen: false,
        isOrderDetailsModalOpen: false,
        ingredient: null,
        order: null,
        isBurgerModalOpen: false,
        burger: null
      })
    })
  
    it('should handle ORDER_DETAILS', () => {
      const prevState = {
        ...initialState,
        isOrderDetailsModalOpen: false,
      };
      const action = {
        type: ORDER_DETAILS,
      }
      expect(
        modalReducer(prevState, action)
      ).toEqual({
        ...prevState,
        isOrderDetailsModalOpen: true,
      })
    })
  
    it('should handle INGREDIENT_DETAILS', () => {
      const prevState = {
        ...initialState,
        isIngredientsModalOpe: false,
        ingredient: null,
      };
      const action = {
        type: INGREDIENT_DETAILS,
        ingredient: MOCK_INGREDIENT
      }
      expect(
        modalReducer(prevState, action)
      ).toEqual({
        ...prevState,
        ingredient: action.ingredient,
        isIngredientsModalOpen: true,
      })
    })

    it('should handle DELETE_INGREDIENT_DETAILS', () => {
      const prevState = {
        ...initialState,
        ingredient: null,
      };
        const action = {
          type: DELETE_INGREDIENT_DETAILS,
        }
        expect(
          modalReducer(prevState, action)
        ).toEqual({
          ...prevState,
          isIngredientsModalOpen: false,
          ingredient: {},
      
        })
      })
  
    it('should handle BURGER_DETAILS', () => {
      const prevState = {
        ...initialState,
        burger: null,
         isBurgerModalOpen: false,
      };
      const action = {
        type: BURGER_DETAILS,
        burger: MOCK_BURGER
      }
      expect(
        modalReducer(prevState, action)
      ).toEqual({
        ...prevState,
        burger: action.burger,
        isBurgerModalOpen: true,
      })
    })
    it('should handle DELETE_BURGER_DETAILS', () => {
      const prevState = {
        ...initialState,
        burger: null,
      };
        const action = {
          type: DELETE_BURGER_DETAILS,
        }
        expect(
          modalReducer(prevState, action)
        ).toEqual({
          ...prevState,
          isBurgerModalOpen: false,
          burger: null,
      
        })
      })
  })