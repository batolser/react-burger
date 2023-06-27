import {ordersReducer, initialState} from './orders';

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

    it('should return the initial state', () => {
      expect(ordersReducer(undefined, {})).toEqual(
        {
          wsConnected: false,
          orders: [],
          total: 0,
          totalToday: 0,
          error: false,
          errMessage: null,
          orderInfo: null,
          orderInfoRequest: false,
          orderInfoFailed: false,
        }
      )
    })
  
    it('should handle WS_CONNECTION_SUCCESS', () => {
      const prevState = {
        ...initialState,
        wsConnected: false,
      };
      const action = {
        type: WS_CONNECTION_SUCCESS,
      }
      expect(
        ordersReducer(prevState, action)
      ).toEqual({
        ...prevState,
        error: false,
        wsConnected: true
      })
    })
  
    it('should handle WS_CONNECTION_ERROR', () => {
      const prevState = {
        ...initialState,
        error: false,
        errMessage: null,
      };
      const action = {
        type: WS_CONNECTION_ERROR,
        payload: 'Error'
      }
      expect(
        ordersReducer(prevState, action)
      ).toEqual({
        ...prevState,
        error: true,
        errMessage: action.payload,
        wsConnected: false
      })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
      const prevState = {
        ...initialState,
        wsConnected: true
      };
        const action = {
          type: WS_CONNECTION_CLOSED,
        }
        expect(
            ordersReducer(prevState, action)
        ).toEqual({
          ...prevState,
          error: false,
        wsConnected: false
      
        })
      })
  
    it('should handle WS_DISCONNECT', () => {
      const prevState = {
        ...initialState,
        wsConnected: true
      };
      const action = {
        type: WS_DISCONNECT,
      }
      expect(
        ordersReducer(prevState, action)
      ).toEqual({
        ...prevState,
        error: false,
        wsConnected: false
      })
    })
    it('should handle WS_GET_MESSAGE', () => {
      const prevState = {
        ...initialState,
        orders: [],
        total: 0,
        totalToday: 0,
      };
        const action = {
          type: WS_GET_MESSAGE,
          payload: {
            orders: [],
            total: 1,
            totalToday: 1,
          }
        }
        expect(
          ordersReducer(prevState, action)
        ).toEqual({
          ...prevState,
          error: false,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        })
      })
      it('should handle GET_ORDER_INFO', () => {
        const prevState = {
          ...initialState,
          orderInfoRequest: false,
        };
        const action = {
          type: GET_ORDER_INFO,
        }
        expect(
          ordersReducer(prevState, action)
        ).toEqual({
          ...prevState,
          orderInfoRequest: true,
          orderInfoFailed: false,
        })
      })
    it('should handle GET_ORDER_INFO_SUCCESS', () => {
      const prevState = {
        ...initialState,
        orderInfoRequest: true,
        orderInfo: [{}]
      };
        const action = {
          type: GET_ORDER_INFO_SUCCESS,
          orderInfo: [{}],
        }
        expect(
          ordersReducer(prevState, action)
        ).toEqual({
          ...prevState,
          orderInfoRequest: false,
        orderInfo: action.payload,
        })
    })
    it('should handle GET_ORDER_INFO_FAILED', () => {
      const prevState = {
        ...initialState,
        orderInfoFailed: false,
      };
        const action = {
            type: GET_ORDER_INFO_FAILED,
        }
        expect(
            ordersReducer(prevState, action)
        ).toEqual({
            ...prevState,
            orderInfoRequest: false,
            orderInfoFailed: true,
        })
      })
      it('should handle CLEAN_ORDER_INFO', () => {
        const prevState = {
          ...initialState,
          orderInfo: [{}],
        };

        const action = {
            type: CLEAN_ORDER_INFO,
        }
        expect(
            ordersReducer(prevState, action)
        ).toEqual({
            ...prevState,
            orderInfoRequest: false,
            orderInfoFailed: false,
            orderInfo: null,
        })
      })
  })