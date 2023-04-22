import { IOrder } from '../types/types'

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export interface IWebSocket {
  wsStart: string;
  onOpen: string;
  onError: string;
  onClose: string;
  onMessage: string;
  wsDisconnect: string;
  wsSend: string;
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
  | IWsConnectionError;

export const wsConnectionStart = (url: string): IWsConnectionStart => ({ type: WS_CONNECTION_START, payload: url });

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({ type: WS_CONNECTION_SUCCESS });

export const wsConnectionError = (error: string): IWsConnectionError => ({ type: WS_CONNECTION_ERROR, payload: error });

export const wsConnectionClosed = (): IWsConnectionClosed => ({ type: WS_CONNECTION_CLOSED });

export const wsDisconnect = (): IWsDisconnect => ({ type: WS_DISCONNECT });

export const wsGetMessage = (message: IWsMessage): IWsGetMessage => ({ type: WS_GET_MESSAGE, payload: message });