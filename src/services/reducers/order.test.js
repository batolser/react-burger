import {orderReducer, initialState} from './order';

import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    DELETE_ORDER_DATA
  } from '../actions/order';


  const MOCK_ORDER = 7083;

  describe('order reducer', () => {
    
    it('should return the initial state', () => {
      expect(orderReducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle GET_ORDER', () => {
      const action = {
        type: GET_ORDER,
      }
      expect(
        orderReducer(initialState, action)
      ).toEqual({
        ...initialState,
        orderRequest: true,
        orderFailed: false,
      })
    })
  
    it('should handle GET_ORDER_SUCCESS', () => {
      const action = {
        type: GET_ORDER_SUCCESS,
        order: MOCK_ORDER
      }
      expect(
        orderReducer(initialState, action)
      ).toEqual({
        ...initialState,
        order: action.order,
        orderRequest: false,
      })
    })

    it('should handle DELETE_ORDER_DATA', () => {
        const action = {
          type: DELETE_ORDER_DATA,
        }
        expect(
            orderReducer(initialState, action)
        ).toEqual({
          ...initialState,
          order: null,
      
        })
      })
  
    it('should handle GET_ORDER_FAILED', () => {
      const action = {
        type: GET_ORDER_FAILED,
      }
      expect(
        orderReducer(initialState, action)
      ).toEqual({
        ...initialState,
        orderFailed: true,
        orderRequest: false
      })
    })
   
  })