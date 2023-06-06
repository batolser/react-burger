import {userReducer} from './user';

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


const MOCK_USER = {
  name: 'Test',
  email: 'test@ya.ru',
  password: '1234',
}

  describe('user reducer', () => {
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
      };
    
    it('should return the initial state', () => {
      expect(userReducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle REGISTRATION', () => {
      const action = {
        type: REGISTRATION,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        registrationRequest: true,
        registrationFailed: false,
      })
    })
  
    it('should handle REGISTRATION_SUCCESS', () => {
  
      const action = {
        type: REGISTRATION_SUCCESS,
        user: MOCK_USER,
        token: {},
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        user: action.user,
        registrationRequest: false,
        registrationFailed: false,
        token: action.token,
        isLogin: true
      })
    })

    it('should handle REGISTRATION_FAILED', () => {
        const action = {
          type: REGISTRATION_FAILED,
        }
        expect(
          userReducer(initialState, action)
        ).toEqual({
          ...initialState,
          registrationRequest: false,
          registrationFailed: true,
      
        })
      })
  
    it('should handle LOGIN', () => {
      const action = {
        type: LOGIN,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        loginRequest: true,
        loginRequestFailed: false,
      })
    })

    it('should handle LOGIN_SUCCESS', () => {
      const action = {
        type: LOGIN_SUCCESS,
        user: MOCK_USER,
        token: {},
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        user: action.user,
        loginRequest: false,
        loginRequestFailed: false,
        token: action.token,
        isLogin: true
      })
    })

    it('should handle LOGIN_FAILED', () => {
      const action = {
        type: LOGIN_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        loginRequest: false,
        loginRequestFailed: true,
    
      })
    })
    it('should handle FORGOT_PASSWORD', () => {
      const action = {
        type: FORGOT_PASSWORD,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
    
      })
    })
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
      const action = {
        type: FORGOT_PASSWORD_SUCCESS,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
        isPasswordForgot: true,
      })
    })
    it('should handle FORGOT_PASSWORD_FAILED', () => {
      const action = {
        type: FORGOT_PASSWORD_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      })
    })
    it('should handle RESET_PASSWORD', () => {
      const action = {
        type: RESET_PASSWORD,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      })
    })
    it('should handle RESET_PASSWORD_SUCCESS', () => {
      const action = {
        type: RESET_PASSWORD_SUCCESS,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        isPasswordForgot: false,
      })
    })
    it('should handle RESET_PASSWORD_FAILED', () => {
      const action = {
        type: RESET_PASSWORD_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      })
    })
    it('should handle REFRESH_TOKEN', () => {
      const action = {
        type: REFRESH_TOKEN,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      })
    })
    it('should handle REFRESH_TOKEN_SUCCESS', () => {
      const action = {
        type: REFRESH_TOKEN_SUCCESS,
        token: {},
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: false,
        token: action.token,
      })
    })
    it('should handle REFRESH_TOKEN_FAILED', () => {
      const action = {
        type: REFRESH_TOKEN_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      })
    })
    it('should handle LOGOUT', () => {
      const action = {
        type: LOGOUT,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        logoutRequest: true,
        logoutRequestFailed: false,
      })
    })
    it('should handle LOGOUT_SUCCESS', () => {
      const action = {
        type: LOGOUT_SUCCESS,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        logoutRequest: false,
        logoutRequestFailed: false,
        user: null,
        isLogin: false,
        token: null
      })
    })
    it('should handle LOGOUT_FAILED', () => {
      const action = {
        type: LOGOUT_FAILED,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        logoutRequest: false,
        logoutRequestFailed: true,
      })
    })
    it('should handle GET_USER_DATA', () => {
      const action = {
        type: GET_USER_DATA,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        getUsersDataRequest: true,
        getUsersDataRequestFailed: false,
      })
    })
  
    it('should handle GET_USER_DATA_SUCCESS', () => {
  
      const action = {
        type: GET_USER_DATA_SUCCESS,
        user: MOCK_USER,
      }
      expect(
        userReducer(initialState, action)
      ).toEqual({
        ...initialState,
        user: action.user,
        isLogin: true,
        getUsersDataRequest: false,
        getUsersDataRequestFailed: false,
      })
    })

    it('should handle GET_USER_DATA_FAILED', () => {
        const action = {
          type: GET_USER_DATA_FAILED,
        }
        expect(
          userReducer(initialState, action)
        ).toEqual({
          ...initialState,
          getUsersDataRequest: false,
          getUsersDataRequestFailed: true,
      
        })
      })
      it('should handle PATCH_USER_DATA', () => {
        const action = {
          type: PATCH_USER_DATA,
        }
        expect(
          userReducer(initialState, action)
        ).toEqual({
          ...initialState,
          patchUsersDataRequest: true,
          patchUsersDataRequestFailed: false,
        })
      })
    
      it('should handle PATCH_USER_DATA_SUCCESS', () => {
    
        const action = {
          type: PATCH_USER_DATA_SUCCESS,
          user: MOCK_USER,
        }
        expect(
          userReducer(initialState, action)
        ).toEqual({
          ...initialState,
          user: action.user,
        patchUsersDataRequest: false,
        patchUsersDataRequestFailed: false,
        })
      })
  
      it('should handle PATCH_USER_DATA_FAILED', () => {
          const action = {
            type: PATCH_USER_DATA_FAILED,
          }
          expect(
            userReducer(initialState, action)
          ).toEqual({
            ...initialState,
            patchUsersDataRequest: false,
            patchUsersDataRequestFailed: true,
          })
        })
    
  })