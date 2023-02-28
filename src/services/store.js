
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { ingredientsReducer } from './reducers/ingredients';

import { requestor } from "../httpRequestor";


export const configureStore = (initialState) => {
  const initRequestor = requestor;

  const store = createStore(
    ingredientsReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument({ requestor: initRequestor }),
      )
    )
  );

  return store;
};
