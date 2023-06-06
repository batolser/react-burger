import {ordersReducer} from './orders';

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_DISCONNECT,
    WS_GET_MESSAGE,
    GET_ORDER_INFO,
    GET_ORDER_INFO_SUCCESS,
    GET_ORDER_INFO_FAILED,
    CLEAN_ORDER_INFO
  } from '../actions/orders';

  describe('orders reducer', () => {
    const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: false,
        errMessage: null,
        orderInfo: null,
        orderInfoRequest: false,
        orderInfoFailed: false,
      };
    
    it('should return the initial state', () => {
      expect(ordersReducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle WS_CONNECTION_SUCCESS', () => {
      const action = {
        type: WS_CONNECTION_SUCCESS,
      }
      expect(
        ordersReducer(initialState, action)
      ).toEqual({
        ...initialState,
        error: false,
        wsConnected: true
      })
    })
  
    it('should handle WS_CONNECTION_ERROR', () => {
      const action = {
        type: WS_CONNECTION_ERROR,
        payload: 'Error'
      }
      expect(
        ordersReducer(initialState, action)
      ).toEqual({
        ...initialState,
        error: true,
        errMessage: action.payload,
        wsConnected: false
      })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        const action = {
          type: WS_CONNECTION_CLOSED,
        }
        expect(
            ordersReducer(initialState, action)
        ).toEqual({
          ...initialState,
          error: false,
        wsConnected: false
      
        })
      })
  
    it('should handle WS_DISCONNECT', () => {
      const action = {
        type: WS_DISCONNECT,
      }
      expect(
        ordersReducer(initialState, action)
      ).toEqual({
        ...initialState,
        error: false,
        wsConnected: false
      })
    })
    it('should handle WS_GET_MESSAGE', () => {
        const action = {
          type: WS_GET_MESSAGE,
          payload: {
            orders: [],
            total: 1,
            totalToday: 1,
          }
        }
        expect(
          ordersReducer(initialState, action)
        ).toEqual({
          ...initialState,
          error: false,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        })
      })
      it('should handle GET_ORDER_INFO', () => {
        const action = {
          type: GET_ORDER_INFO,
        }
        expect(
          ordersReducer(initialState, action)
        ).toEqual({
          ...initialState,
          orderInfoRequest: true,
          orderInfoFailed: false,
        })
      })
    it('should handle GET_ORDER_INFO_SUCCESS', () => {
        const action = {
          type: GET_ORDER_INFO_SUCCESS,
          orderInfo: [{}],
        }
        expect(
          ordersReducer(initialState, action)
        ).toEqual({
          ...initialState,
          orderInfoRequest: true,
        orderInfo: action.payload,
        })
    })
    it('should handle GET_ORDER_INFO_FAILED', () => {
        const action = {
            type: GET_ORDER_INFO_FAILED,
        }
        expect(
            ordersReducer(initialState, action)
        ).toEqual({
            ...initialState,
            orderInfoRequest: false,
            orderInfoFailed: true,
        })
      })
      it('should handle CLEAN_ORDER_INFO', () => {
        const action = {
            type: CLEAN_ORDER_INFO,
        }
        expect(
            ordersReducer(initialState, action)
        ).toEqual({
            ...initialState,
            orderInfoRequest: false,
            orderInfoFailed: false,
            orderInfo: null,
        })
      })
  })