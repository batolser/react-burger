
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from './reducers/index';

import { requestor } from "../httpRequestor";


export const configureStore = (initialState) => {
  const initRequestor = requestor;

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument({ requestor: initRequestor }),
      )
    )
  );

  return store;
};
