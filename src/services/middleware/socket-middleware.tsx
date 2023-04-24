// import type {Middleware, MiddlewareAPI} from 'redux';
// import {AppDispatch, ISocketActions, RootState} from "../types/types";


// export const socketMiddleware = (wsUrl: string, wsActions: ISocketActions): Middleware => {
//     return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//       let socket: WebSocket | null = null;
  
//       return next => (action) => {
//         const {dispatch, getState} = store;
//         const {type} = action;
//         const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
//         const {userReducer} = getState();
//         if (type === wsInit && userReducer) {
//           socket = new WebSocket(`${wsUrl}?token=${userReducer?.token?.replace('Bearer ', '')}`);
//         }
//         if (type === onClose) {
//           socket && socket.close(1000, 'CLOSE_NORMAL')
//         }
//         if (socket) {
//           socket.onopen = event => {
//             dispatch({type: onOpen, payload: event});
//           };
  
//           socket.onerror = event => {
//             dispatch({type: onError, payload: event});
//           };
  
//           socket.onmessage = event => {
//             const {data} = event;
//             const parsedData = JSON.parse(data);
//             const {success, ...restParsedData} = parsedData;
  
//             dispatch({type: onMessage, payload: restParsedData});
//           };
  
//           socket.onclose = event => {
//             dispatch({type: onClose, payload: event});
//           };
//         }
  
//         next(action);
//       };
//     }) as Middleware;
//   };

import type {Middleware, MiddlewareAPI} from 'redux';
import { TWebSocket, WS_CONNECTION_START } from "../actions/orders";
import { AppDispatch, RootState } from "../types/types";


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
        console.log('1')
      } 
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          console.log('2')
        };
        socket.onerror = event => {
          console.log('ws error', event)
   
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = event => {
          if (event.code !== 1000) {
            console.log(event.reason)
            console.log(event.code)
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
      if (socket && wsDisconnect === action) {
        console.log('Websocket disconnect')
        window.clearTimeout(reconnectTimer)
          reconnect = false
        socket.close()
      }
      next(action);
    };
  };
};