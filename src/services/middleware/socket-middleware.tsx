import type {Middleware, MiddlewareAPI} from 'redux';
import { TWebSocket, WS_CONNECTION_START } from "../actions/orders";
import { AppDispatch, RootState } from "../types/types";
import { convertCompilerOptionsFromJson } from 'typescript';


export const socketMiddleware = (wsActions: TWebSocket): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = '';
    let reconnect = false
    let reconnectTimer = -1

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onError, onClose, wsDisconnect, onMessage, wsSend } = wsActions;

      if (type === wsStart) {
        url = payload;
        socket = new WebSocket(url);
        reconnect = true
        window.clearTimeout(reconnectTimer)
  
      } 
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
   
        };
        socket.onerror = event => {
          console.error()
   
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = event => {
          if (event.code !== 1005) {
            console.error()
            dispatch({ type: onError, payload: event.reason });
          }
          dispatch({ type: onClose, payload: event })
          if (reconnect) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: WS_CONNECTION_START, payload: url });
            }, 3000)
          }
        };
        if (type === wsSend) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      if (socket && wsDisconnect === action.type) {

        window.clearTimeout(reconnectTimer)
          reconnect = false
         
        socket.close()
      }
      next(action);
    };
  };
};