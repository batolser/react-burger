import { postOrderInfo } from '../../utils/api'

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'

export function sendOrder(data) {
  return function(dispatch) {

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
