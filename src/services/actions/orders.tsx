import { IOrder } from '../types/types'
import {AppDispatch } from "../types/types";
import { getOrderInfo } from '../../utils/api'

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export type TWebSocket = {
  wsStart: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onError: typeof WS_CONNECTION_ERROR;
  onClose: typeof WS_CONNECTION_CLOSED;
  onMessage: typeof WS_GET_MESSAGE;
  wsDisconnect: typeof WS_DISCONNECT;
  wsSend: typeof WS_SEND_MESSAGE;
}

export interface IWsMessage {
  orders: IOrder[];
  success: boolean;
  total: number;
  totalToday: number;
  message?: string
}
export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsDisconnect {
  readonly type: typeof WS_DISCONNECT; 
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;

}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage
}

export type TWSActions =
  | IWsGetMessage
  | IWsSendMessage
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsDisconnect
  | IWsConnectionError
  | IGetOrderInfo
  | IGetOrderInfoSuccess
  | IGetOrderInfoFailed
  | ICleanOrderInfo;

export const wsStart = (url: string): IWsConnectionStart => ({ type: WS_CONNECTION_START, payload: url });

export const onOpen = (): IWsConnectionSuccess => ({ type: WS_CONNECTION_SUCCESS });

export const onError = (error: string): IWsConnectionError => ({ type: WS_CONNECTION_ERROR, payload: error });

export const onClose = (): IWsConnectionClosed => ({ type: WS_CONNECTION_CLOSED });

export const wsDisconnect = (): IWsDisconnect => ({ type: WS_DISCONNECT });

export const wsSend = (message: IWsMessage): IWsGetMessage => ({ type: WS_GET_MESSAGE, payload: message });

export const GET_ORDER_INFO: 'GET_ORDER_INFO' = 'GET_ORDER_INFO';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_FAILED: 'GET_ORDER_INFO_FAILED' = 'GET_ORDER_INFO_FAILED';
export const CLEAN_ORDER_INFO: 'CLEAN_ORDER_INFO' = 'CLEAN_ORDER_INFO';

export interface IGetOrderInfo {
  readonly type: typeof GET_ORDER_INFO;
}
export interface IGetOrderInfoSuccess {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  payload: IOrder;
}
export interface IGetOrderInfoFailed {
  readonly type: typeof GET_ORDER_INFO_FAILED;
}
export interface ICleanOrderInfo {
  readonly type: typeof CLEAN_ORDER_INFO;
}

// export type TInfoOrderActions =
//   | IGetOrderInfo
//   | IGetOrderInfoSuccess
//   | IGetOrderInfoFailed
//   | ICleanOrderInfo;

// export const getOrderInfoLoading = (): IGetOrderInfo => ({type: GET_ORDER_INFO});
// export const getOrderInfoLoadingSuccess = (data: IOrder) => ({type: GET_ORDER_INFO_SUCCESS, payload: data})
// export const getOrderInfoLoadingFailed = () => ({type: GET_ORDER_INFO_FAILED})
export const cleanOrderInfo = (): ICleanOrderInfo => ({type: CLEAN_ORDER_INFO})

export const getOrdersInfo  = (orderNumber: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({type: GET_ORDER_INFO})

    getOrderInfo(orderNumber)
      .then(res => {
        if (res && res.success) {
          dispatch({type: GET_ORDER_INFO_SUCCESS, payload: res.orders[0]})
        }
      }).catch(err => {
        dispatch({type: GET_ORDER_INFO_FAILED})
        alert(err.message)
      })
  }
}