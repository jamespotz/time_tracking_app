import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOGOUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SET_CURRENT_USER,
} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  errorMessage: '',
  isAuthenticated: false,
  fieldWithError: '',
  signUpErrorMessage: '',
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isAuthenticated: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    case LOG_IN_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isAuthenticated: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isAuthenticated: false,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        signUpErrorMessage: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
