import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_DISCONNECT,
  WS_GET_MESSAGE,
  TWSActions,
  GET_ORDER_INFO,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  CLEAN_ORDER_INFO
} from '../actions/orders';

import { IOrder } from '../types/types'

export type TSocketState = {
  wsConnected: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
  error: boolean;
  errMessage: string | null;
  orderInfo: IOrder | null,
  orderInfoRequest: boolean;
  orderInfoFailed: boolean;
  
 
};

const initialState: TSocketState = {
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

export const ordersReducer = (state = initialState, action: TWSActions): TSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: 
      return {
        ...state,
        error: false,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        errMessage: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: false,
        wsConnected: false
      };
      case WS_DISCONNECT:
        return {
          ...state,
          error: false,
          wsConnected: false
        };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: false,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
      case GET_ORDER_INFO: 
      return {
        ...state,
        orderInfoRequest: true,
        orderInfoFailed: false,
      };
    case GET_ORDER_INFO_SUCCESS: 
      return {
        ...state,
        orderInfoRequest: false,
        orderInfo: action.payload,
      };
    case GET_ORDER_INFO_FAILED:
      return {
        ...state,
        orderInfoRequest: false,
        orderInfoFailed: true,
      };
    case CLEAN_ORDER_INFO:
      return {
        ...state,
        orderInfoRequest: false,
        orderInfoFailed: false,
        orderInfo: null,
      }
    default:
      return state;
  }
};