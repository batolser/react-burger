import { registerRequest, loginRequest, forgotPasswordRequest, resetPasswordRequest, refreshTokenRequest, logoutRequest, getUsersDataRequest, patchUsersDataRequest } from '../../utils/api';
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SECCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export const PATCH_USER_DATA = 'PATCH_USER_DATA';
export const PATCH_USER_DATA_SUCCESS = 'PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAILED = 'PATCH_USER_DATA_FAILED';


export function registararion (email, password, name) {
    return function(dispatch) {
  
      dispatch({
        type: REGISTRATION
      })
      registerRequest(email, password, name).then( res  => {
        if (res && res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
            user: res.user,
            token: res.accessToken,
          })
          setCookie("accessToken", res.accessToken.split('Bearer ')[1], { expires: 1200 });
          setCookie("refreshToken", res.refreshToken);
        } else {
          dispatch({
            type: REGISTRATION_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: REGISTRATION_FAILED
              })
              alert(err.message)
          })
    }
  } 

  export function login (email, password) {
    return function(dispatch) {
  
      dispatch({
        type: LOGIN
      })
      loginRequest(email, password).then( res  => {

        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,  
            token: res.accessToken,
          })
          setCookie("accessToken", res.accessToken.split('Bearer ')[1], { expires: 1200 });
          setCookie("refreshToken", res.refreshToken);
      
        } else {
          dispatch({
            type: LOGIN_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: LOGIN_FAILED
              })
              alert(err.message)
          })
    }
  } 

  export function forgotPassword (email) {
    return function(dispatch) {
  
      dispatch({
        type: FORGOT_PASSWORD
      })
      forgotPasswordRequest(email).then( res  => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          })
      
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: FORGOT_PASSWORD_FAILED
              })
          })
    }
  } 

  export function resetPassword (password, code) {
    return function(dispatch) {
  
      dispatch({
        type: RESET_PASSWORD
      })
      resetPasswordRequest(password, code).then( res  => {

        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          })
      
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: RESET_PASSWORD_FAILED
              })
          })
    }
  } 

  export function refreshToken ( refreshToken ) {
    return function(dispatch) {
  
      dispatch({
        type: REFRESH_TOKEN
      })
      refreshTokenRequest(refreshToken).then( res  => {
        if (res && res.success) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
          })
          deleteCookie("accessToken", res.accessToken);
          deleteCookie("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken.split('Bearer ')[1], { expires: 1200 });
          setCookie("refreshToken", res.refreshToken);
      
        } else {
          dispatch({
            type: REFRESH_TOKEN_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: REFRESH_TOKEN_FAILED
              })
          })
    }
  } 

  export function logout ( refreshToken ) {
    return function(dispatch) {
      dispatch({
        type: LOGOUT
      })
      logoutRequest(refreshToken).then( res  => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          })

          deleteCookie("accessToken", res.accessToken);
          deleteCookie("refreshToken", res.refreshToken);
      
        } else {
          dispatch({
            type: LOGOUT_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: LOGOUT_FAILED
              })
          })
    }
  }

  export function getUserData ( accessToken ) {
    return function(dispatch) {
      dispatch({
        type: GET_USER_DATA
      })
      getUsersDataRequest(accessToken).then( res  => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            user: res.user,
          })
        } else {
          dispatch({
            type: GET_USER_DATA_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: GET_USER_DATA_FAILED
              })
              if (err.message === "jwt expired" || "jwt malformed") {
                dispatch(refreshToken(getCookie("refreshToken")))
              }
              console.log(err)
          })
    }
  }

  export function patchUsersData ( accessToken, name, email, password ) {
    return function(dispatch) {
      dispatch({
        type: PATCH_USER_DATA
      })
      patchUsersDataRequest(accessToken, name, email, password).then( res  => {
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_DATA_SUCCESS,
            user: res.user,
          })
        } else {
          dispatch({
            type: PATCH_USER_DATA_FAILED
          })

        }
      }).catch( err => {
              dispatch({
                  type: PATCH_USER_DATA_FAILED
              })
          })
    }
  }