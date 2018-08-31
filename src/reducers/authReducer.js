import { LOG_IN_SUCCESS, LOG_IN_FAILED, LOGOUT_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from '../actions/types';

const initialState = {
  errorMessage: '',
  isAuthenticated: false,
  fieldWithError: '',
  signUpErrorMessage: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isAuthenticated: true
      }
    case LOG_IN_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isAuthenticated: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isAuthenticated: false
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isAuthenticated: false
      }
    case SIGN_UP_FAILED:
      return {
        ...state,
        signUpErrorMessage: action.payload,
        isAuthenticated: false
      }
    default:
      return state
  }
}