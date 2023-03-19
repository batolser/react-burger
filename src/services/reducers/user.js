import {
    REGISTRATION,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    REFRESH_TOKEN,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    PATCH_USER_DATA,
    PATCH_USER_DATA_SUCCESS,
    PATCH_USER_DATA_FAILED,
  } from '../actions/user';
  
const initialState = {
  
  registrationRequest: false,
  registrationFailed: false,
  loginRequest: false,
  loginRequestFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
  refreshTokenRequest: false,
  refreshTokenRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  getUsersDataRequest: false,
  getUsersDataRequestFailed: false,
  patchUsersDataRequest: false,
  patchUsersDataRequestFailed: false,
  user: null,
  isLogin: false,
  isPasswordForgot: false,
  token: null
}

  
export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case REGISTRATION: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registrationRequest: false,
        registrationFailed: false,
        token: action.token,
        isLogin: true
        
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
      };
    }

    case LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginRequestFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginRequest: false,
        loginRequestFailed: false,
        token: action.token,
        isLogin: true
        
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
        isPasswordForgot: true,
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      }
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        isPasswordForgot: false,
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      }
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: false,
        token: action.token,
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: false,
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
      }
    }
    case GET_USER_DATA: {
      return {
        ...state,
        getUsersDataRequest: true,
        getUsersDataRequestFailed: false,
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isLogin: true,
        getUsersDataRequest: false,
        getUsersDataRequestFailed: false,
      }
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUsersDataRequest: false,
        getUsersDataRequestFailed: true,
      }
    }
    case PATCH_USER_DATA: {
      return {
        ...state,
        patchUsersDataRequest: true,
        patchUsersDataRequestFailed: false,
      }
    }
    case PATCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: action.user,
        patchUsersDataRequest: false,
        patchUsersDataRequestFailed: false,
      }
    }
    case PATCH_USER_DATA_FAILED: {
      return {
        ...state,
        patchUsersDataRequest: false,
        patchUsersDataRequestFailed: true,
      }
    }
    default: {
      return state
    }
  }
} 