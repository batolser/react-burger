import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_DISCONNECT,
  WS_GET_MESSAGE, TWSActions
} from '../actions/orders';

import { IOrder } from '../types/types'

export type TSocketState = {
  wsConnected: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
  error: boolean;
  errMessage: string | null;
 
};

const initialState: TSocketState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
  errMessage: null,

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
    default:
      return state;
  }
};