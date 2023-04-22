// import thunk from 'redux-thunk';
// import {compose, createStore, applyMiddleware} from 'redux';
// import { rootReducer } from './reducers/index';
// import {
//   WS_CONNECTION_START,
//   WS_CONNECTION_SUCCESS,
//   WS_CONNECTION_ERROR,
//   WS_CONNECTION_CLOSED,
//   WS_GET_ORDERS,
//   WS_GET_USER_ORDERS,
//   WS_USER_ORDERS_CONNECTION_START,
//   WS_USER_ORDERS_CONNECTION_SUCCESS,
//   WS_USER_ORDERS_CONNECTION_ERROR, WS_USER_ORDERS_CONNECTION_CLOSED
// } from './actions/orders';
// import {ALL_ORDERS_URL, USER_ORDERS_URL} from "../utils/constants";
// import {socketMiddleware} from "./middleware/socket-middleware";

// const composeEnhancers =
//   typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const wsAllOrdersActions = {
//   wsInit: WS_CONNECTION_START,
//   onOpen: WS_CONNECTION_SUCCESS,
//   onClose: WS_CONNECTION_CLOSED,
//   onError: WS_CONNECTION_ERROR,
//   onMessage: WS_GET_ORDERS
// };

// const wsUserOrdersActions = {
//   wsInit: WS_USER_ORDERS_CONNECTION_START,
//   onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
//   onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
//   onError: WS_USER_ORDERS_CONNECTION_ERROR,
//   onMessage: WS_GET_USER_ORDERS
// };

// const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(ALL_ORDERS_URL, wsAllOrdersActions), socketMiddleware(USER_ORDERS_URL, wsUserOrdersActions)));


// export const store = createStore(rootReducer, enhancer);

import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware, } from '../services/middleware/socket-middleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_DISCONNECT,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './actions/orders';

const wsActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  wsDisconnect: WS_DISCONNECT,
  wsSend: WS_SEND_MESSAGE
}

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);