import {userReducer, initialState} from './user';

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
    
    it('should return the initial state', () => {
      expect(userReducer(undefined, {})).toEqual({
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
      })
    })
  
    it('should handle REGISTRATION', () => {
      const prevState = {
        ...initialState,
        registrationRequest: false,
      };
      const action = {
        type: REGISTRATION,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        registrationRequest: true,
        registrationFailed: false,
      })
    })

    it('should handle REGISTRATION_SUCCESS', () => {
      const prevState = {
        ...initialState,
        registrationRequest: true,
      };
  
      const action = {
        type: REGISTRATION_SUCCESS,
        user: MOCK_USER,
        token: {},
      }
  
      expect(
    
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        user: action.user,
        registrationRequest: false,
        registrationFailed: false,
        token: action.token,
        isLogin: true
      })
    })

    it('should handle REGISTRATION_FAILED', () => {

      const prevState = {
        ...initialState,
        registrationRequest: true
      };

        const action = {
          type: REGISTRATION_FAILED,
        }
        expect(
          userReducer(prevState, action)
        ).toEqual({
          ...prevState,
          registrationRequest: false,
          registrationFailed: true,
      
        })
      })
  
    it('should handle LOGIN', () => {
      const prevState = {
        ...initialState,
        loginRequest: false,
      };
      const action = {
        type: LOGIN,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        loginRequest: true,
        loginRequestFailed: false,
      })
    })

    it('should handle LOGIN_SUCCESS', () => {
      const prevState = {
        ...initialState,
        loginRequest: true
      };
      const action = {
        type: LOGIN_SUCCESS,
        user: MOCK_USER,
        token: {},
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        user: action.user,
        loginRequest: false,
        loginRequestFailed: false,
        token: action.token,
        isLogin: true
      })
    })

    it('should handle LOGIN_FAILED', () => {
      const prevState = {
        ...initialState,
        loginRequestFailed: false,
      };

      const action = {
        type: LOGIN_FAILED,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        loginRequest: false,
        loginRequestFailed: true,
    
      })
    })
    it('should handle FORGOT_PASSWORD', () => {
      const prevState = {
        ...initialState,
        forgotPasswordRequest: false,
      };

      const action = {
        type: FORGOT_PASSWORD,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
    
      })
    })
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
      const prevState = {
        ...initialState,
        forgotPasswordRequest: false,
        isPasswordForgot: false,
      };
      const action = {
        type: FORGOT_PASSWORD_SUCCESS,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: false,
        isPasswordForgot: true,
      })
    })
    it('should handle FORGOT_PASSWORD_FAILED', () => {
      const prevState = {
        ...initialState,
        forgotPasswordRequestFailed: false,
      };
      const action = {
        type: FORGOT_PASSWORD_FAILED,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      })
    })
    it('should handle RESET_PASSWORD', () => {
      const prevState = {
        ...initialState,
        resetPasswordRequest: false,
      };
      const action = {
        type: RESET_PASSWORD,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      })
    })
    it('should handle RESET_PASSWORD_SUCCESS', () => {
      const prevState = {
        ...initialState,
        resetPasswordRequest: true,
      };
      const action = {
        type: RESET_PASSWORD_SUCCESS,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        isPasswordForgot: false,
      })
    })
    it('should handle RESET_PASSWORD_FAILED', () => {
      const prevState = {
        ...initialState,
        resetPasswordRequestFailed: false,
      };
      const action = {
        type: RESET_PASSWORD_FAILED,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      })
    })
    it('should handle REFRESH_TOKEN', () => {

      const prevState = {
        ...initialState,
        refreshTokenRequest: false,
      };

      const action = {
        type: REFRESH_TOKEN,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      })
    })
    it('should handle REFRESH_TOKEN_SUCCESS', () => {
      const prevState = {
        ...initialState,
        token: null
      };
      const action = {
        type: REFRESH_TOKEN_SUCCESS,
        token: {},
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: false,
        token: action.token,
      })
    })
    it('should handle REFRESH_TOKEN_FAILED', () => {
      const prevState = {
        ...initialState,
        refreshTokenRequestFailed: false
      };
      const action = {
        type: REFRESH_TOKEN_FAILED,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      })
    })
    it('should handle LOGOUT', () => {
      const prevState = {
        ...initialState,
        logoutRequest: false,
      };
      const action = {
        type: LOGOUT,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        logoutRequest: true,
        logoutRequestFailed: false,
      })
    })
    it('should handle LOGOUT_SUCCESS', () => {
      const prevState = {
        ...initialState,
        logoutRequest: true,
        user: MOCK_USER,
        isLogin: true,
        token: {}
      };
      const action = {
        type: LOGOUT_SUCCESS,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        logoutRequest: false,
        logoutRequestFailed: false,
        user: null,
        isLogin: false,
        token: null
      })
    })
    it('should handle LOGOUT_FAILED', () => {
      const prevState = {
        ...initialState,
        logoutRequest: true,
        logoutRequestFailed: false,

      };
      const action = {
        type: LOGOUT_FAILED,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        logoutRequest: false,
        logoutRequestFailed: true,
      })
    })
    it('should handle GET_USER_DATA', () => {
      const prevState = {
        ...initialState,
        getUsersDataRequest: false,
      };
      const action = {
        type: GET_USER_DATA,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        getUsersDataRequest: true,
        getUsersDataRequestFailed: false,
      })
    })
  
    it('should handle GET_USER_DATA_SUCCESS', () => {
      const prevState = {
        ...initialState,
        getUsersDataRequest: true,
        user: null,
        isLogin: false,
      };
      const action = {
        type: GET_USER_DATA_SUCCESS,
        user: MOCK_USER,
      }
      expect(
        userReducer(prevState, action)
      ).toEqual({
        ...prevState,
        user: action.user,
        isLogin: true,
        getUsersDataRequest: false,
        getUsersDataRequestFailed: false,
      })
    })

    it('should handle GET_USER_DATA_FAILED', () => {
      const prevState = {
        ...initialState,
        getUsersDataRequestFailed: false,
      };
        const action = {
          type: GET_USER_DATA_FAILED,
        }
        expect(
          userReducer(prevState, action)
        ).toEqual({
          ...prevState,
          getUsersDataRequest: false,
          getUsersDataRequestFailed: true,
      
        })
      })
      it('should handle PATCH_USER_DATA', () => {
        const prevState = {
          ...initialState,
          patchUsersDataRequest: false,
        };
        const action = {
          type: PATCH_USER_DATA,
        }
        expect(
          userReducer(prevState, action)
        ).toEqual({
          ...prevState,
          patchUsersDataRequest: true,
          patchUsersDataRequestFailed: false,
        })
      })
    
      it('should handle PATCH_USER_DATA_SUCCESS', () => {
        const prevState = {
          ...initialState,
          patchUsersDataRequest: true,
        };
        const action = {
          type: PATCH_USER_DATA_SUCCESS,
          user: MOCK_USER,
        }
        expect(
          userReducer(prevState, action)
        ).toEqual({
          ...prevState,
          user: action.user,
        patchUsersDataRequest: false,
        patchUsersDataRequestFailed: false,
        })
      })
  
      it('should handle PATCH_USER_DATA_FAILED', () => {
        const prevState = {
          ...initialState,
          patchUsersDataRequestFailed: false,
        };
          const action = {
            type: PATCH_USER_DATA_FAILED,
          }
          expect(
            userReducer(prevState, action)
          ).toEqual({
            ...prevState,
            patchUsersDataRequest: false,
            patchUsersDataRequestFailed: true,
          })
        })
    
  })