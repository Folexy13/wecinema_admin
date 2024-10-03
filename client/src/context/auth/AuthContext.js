import React, { createContext, useReducer, useCallback } from 'react';
import userReducer from './AuthReducer';
import * as types from './authActionTypes';
import * as userTypes from '../userState/userActionTypes';
import adminApi from '../../helpers/apiUtils';

const initialAuthState = {
  loading: false,
  error: false,
  token: null,
  errResponse: null
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthState);

  const AuthReset = () => {
    dispatch({
      type: types.AUTH_RESET
    });
  };

  const LoginAction = useCallback(async (data) => {
    dispatch({
      type: types.AUTH_START
    });
    try {
      const res = await adminApi.post('/api/auth/login', data);
      localStorage.setItem('mern_admin_dashboard', res.data.access_token);

      const resp = await adminApi.get('/api/user/me');

      dispatch({
        type: types.AUTH_SUCCESS,
        payload: res.data.access_token
      });
      dispatch({
        type: userTypes.GET_LOGGED_IN_USER,
        payload: resp.data.data
      });
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        AuthReset,
        LoginAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
