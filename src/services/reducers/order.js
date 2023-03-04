import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  DELETE_ORDER_DATA
} from '../actions/order';

export const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,

      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        order: null,
      };
    }
    default: {
      return state
    }
  }
} 