
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware, } from '../services/middleware/socket-middleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_DISCONNECT,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  TWebSocket
} from './actions/orders';

const wsActions: TWebSocket = {
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