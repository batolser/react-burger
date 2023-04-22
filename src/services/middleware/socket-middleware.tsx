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

import { Middleware } from "redux";
import { IWebSocket } from "../actions/orders";

export const socketMiddleware = (wsActions: IWebSocket): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    let url = undefined;
    let isConnected = false
    let reconnectTimer = 0

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onError, onClose, wsDisconnect, onMessage, wsSend } = wsActions;

      if (type === wsStart) {
        url = payload;
        socket = new WebSocket(action.payload!);
        // socket = new WebSocket(url);
        isConnected = true
          window.clearTimeout(reconnectTimer)
          reconnectTimer = 0
          console.log('1')
      } else if (type === onClose) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          console.log('2')
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
   
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
            dispatch({ type: onError, payload: event });
          }
          if (isConnected) {
            dispatch({ type: onOpen, payload: event });
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: onOpen, payload: event });
            }, 3000)
          }
        };
        if (type === wsSend) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      if (socket && wsDisconnect.match(action)) {
        console.log('Websocket disconnect')
        window.clearTimeout(reconnectTimer)
          isConnected = false
          reconnectTimer = 0
        // dispatch({ type: onClose})
        socket.close()
      }
      next(action);
    };
  };
};