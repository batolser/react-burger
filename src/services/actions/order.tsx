import { postOrderInfo } from '../../utils/api';
import {AppDispatch } from "../types/types";

export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const DELETE_ORDER_DATA: 'DELETE_ORDER_DATA' = 'DELETE_ORDER_DATA';

export interface IGetOrderDetails {
  readonly type: typeof GET_ORDER;
}
export interface IGetOrderDetailsSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: string; 
}
export interface IGetOrderDetailsFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IDeleteOrderDetails {
  readonly type: typeof DELETE_ORDER_DATA;
}

export type TOrderActions =
| IGetOrderDetails
| IGetOrderDetailsSuccess
| IGetOrderDetailsFailed
| IDeleteOrderDetails;

export const sendOrder = (data: string[]) => {
  return function(dispatch: AppDispatch) {

    dispatch({
      type: GET_ORDER
    })

    postOrderInfo(data).then( res  => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    }).catch( err => {
            dispatch({
                type: GET_ORDER_FAILED
            })
        })
  }
} 

export const deleteOrderData = () => ({ type: DELETE_ORDER_DATA })