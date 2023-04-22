import { registerRequest, loginRequest, forgotPasswordRequest, resetPasswordRequest, refreshTokenRequest, logoutRequest, getUsersDataRequest, patchUsersDataRequest } from '../../utils/api';
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import {AppDispatch, AppThunk, IUser} from "../types/types";

export const REGISTRATION: 'REGISTRATION' = 'REGISTRATION';
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';

export const LOGIN: 'LOGIN' = 'LOGIN';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';

export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SECCESS' = 'FORGOT_PASSWORD_SECCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const REFRESH_TOKEN: 'REFRESH_TOKEN' = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const GET_USER_DATA: 'GET_USER_DATA' = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';

export const PATCH_USER_DATA: 'PATCH_USER_DATA' = 'PATCH_USER_DATA';
export const PATCH_USER_DATA_SUCCESS: 'PATCH_USER_DATA_SUCCESS' = 'PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAILED: 'PATCH_USER_DATA_FAILED' = 'PATCH_USER_DATA_FAILED';


export interface ISetRegistrationLoading {
  readonly type: typeof REGISTRATION;
}
export interface ISetRegistrationLoadingSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
    user: IUser;
    token: string;
    isLogin: boolean;
}
export interface ISetRegistrationLoadingFailed {
  readonly type: typeof REGISTRATION_FAILED;
}
export interface ISetLoginLoading {
  readonly type: typeof LOGIN;
}
export interface ISetLoginLoadingSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  user: IUser;
  token: string;
  isLogin: boolean;
}
export interface ISetLoginLoadingFailed {
  readonly type: typeof LOGIN_FAILED;
}
export interface ISetForgotPasswordLoading {
  readonly type: typeof FORGOT_PASSWORD;
}

export interface ISetForgotPasswordLoadingSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface ISetForgotPasswordLoadingFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface ISetResetPasswordLoading {
  readonly type: typeof RESET_PASSWORD;
}

export interface ISetResetPasswordLoadingSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface ISetResetPasswordLoadingFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface ISetRefreshTokenLoading {
  readonly type: typeof REFRESH_TOKEN;
}

export interface ISetRefreshTokenLoadingSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  token: string,
}

export interface ISetRefreshTokenLoadingFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface ISetLogoutLoading {
  readonly type: typeof LOGOUT;
}

export interface ISetLogoutLoadingSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
    user: null;
    isLogin: boolean;
    token: null

}

export interface ISetLogoutLoadingFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface ISetGetUserDataLoading {
  readonly type: typeof GET_USER_DATA;
}

export interface ISetGetUserDataLoadingSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  user: IUser;
  isLogin: boolean;
  
}

export interface ISetGetUserDataLoadingFailed {
  readonly type: typeof GET_USER_DATA_FAILED;
}

export interface ISetPatchUserDataLoading {
  readonly type: typeof PATCH_USER_DATA;
}
export interface ISetPatchUserDataLoadingSuccess {
  readonly type: typeof PATCH_USER_DATA_SUCCESS;
  user: IUser;
}
export interface ISetPatchUserDataLoadingFailed {
  readonly type: typeof PATCH_USER_DATA_FAILED;
}

export type TUserActions = 
| ISetRegistrationLoading
| ISetRegistrationLoadingSuccess
| ISetRegistrationLoadingFailed
| ISetLoginLoading
| ISetLoginLoadingSuccess
| ISetLoginLoadingFailed
| ISetForgotPasswordLoading
| ISetForgotPasswordLoadingSuccess
| ISetForgotPasswordLoadingFailed
| ISetResetPasswordLoading
| ISetResetPasswordLoadingSuccess
| ISetResetPasswordLoadingFailed
| ISetRefreshTokenLoading
| ISetRefreshTokenLoadingSuccess
| ISetRefreshTokenLoadingFailed
| ISetLogoutLoading
| ISetLogoutLoadingSuccess
| ISetLogoutLoadingFailed
| ISetGetUserDataLoading
| ISetGetUserDataLoadingSuccess
| ISetGetUserDataLoadingFailed
| ISetPatchUserDataLoading
| ISetPatchUserDataLoadingSuccess
| ISetPatchUserDataLoadingFailed

export const registararion = (email: string, password: string, name: string) => {
  
    return function(dispatch: AppDispatch) {
  
      dispatch({
        type: REGISTRATION
      })
      registerRequest(email, password, name).then( res  => {
        if (res && res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
            user: res.user,
            token: res.accessToken,
            isLogin: true,
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

  export const login = (email: string, password: string) => {
    return function(dispatch: AppDispatch) {
  
      dispatch({
        type: LOGIN
      })
      loginRequest(email, password).then( res  => {

        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,  
            token: res.accessToken,
            isLogin: true,
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

  export const forgotPassword = (email: string) => {
    return function(dispatch: AppDispatch) {
  
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

  export const resetPassword  = (password: string, code: string) => {
    return function(dispatch: AppDispatch) {
  
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

  export const refreshToken = ( refreshToken: string ) => {
    return function(dispatch: AppDispatch) {
  
      dispatch({
        type: REFRESH_TOKEN
      })
      refreshTokenRequest(refreshToken).then( res  => {
        if (res && res.success) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            token: res.accessToken
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

  export const logout = ( refreshToken: string ) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: LOGOUT
      })
      logoutRequest(refreshToken).then( res  => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            user: null,
            isLogin: false,
            token: null
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

  export const getUserData = ( accessToken: string ) => {
    return function(dispatch: AppDispatch) {
      dispatch({
        type: GET_USER_DATA
      })
      getUsersDataRequest(accessToken).then( res  => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            user: res.user,
            isLogin: true,
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
                // @ts-ignore
                dispatch(refreshToken(getCookie("refreshToken")))
              }
              console.log(err)
          })
    }
  }

  export const patchUsersData = ( accessToken: string, name: string, email: string, password: string ) => {
    return function(dispatch: AppDispatch) {
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