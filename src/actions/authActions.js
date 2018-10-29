import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOGOUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SET_CURRENT_USER,
} from './types';
import axios from 'axios';
import jwt from 'jsonwebtoken';

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export const signIn = (credentials, history) => dispatch => {
  axios
    .post('/api/sign-in', credentials, axiosConfig)
    .then(response => {
      sessionStorage.setItem('user_token', response.data.token);
      dispatch(setCurrentUser(jwt.decode(response.data.token)), {
        type: LOG_IN_SUCCESS,
      });
      history.push('/time-logs');
    })
    .catch(err => {
      dispatch({
        type: LOG_IN_FAILED,
        payload: err.response.data.message,
      });
    });
};

export const signUp = (credentials, history) => dispatch => {
  axios
    .post('/api/sign-up', credentials, axiosConfig)
    .then(response => {
      dispatch({
        type: SIGN_UP_SUCCESS,
      });
      sessionStorage.setItem('user_token', response.data.token);
      dispatch(setCurrentUser(jwt.decode(response.data.token)), {
        type: LOG_IN_SUCCESS,
      });
      history.push('/time-logs');
    })
    .catch(err => {
      dispatch({
        type: SIGN_UP_FAILED,
        payload: err.response.data.message,
      });
      history.push('/sign-up');
    });
};

export const signOut = history => dispatch => {
  sessionStorage.removeItem('user_token');
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  history.push('/sign-in');
};
