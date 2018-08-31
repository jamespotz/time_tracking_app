import { FETCH_TIME_LOGS_SUCCESS, FETCH_TIME_LOGS_FAILED, CREATE_TIME_LOG_SUCCESS, CREATE_TIME_LOG_FAILED, UPDATE_TIME_LOG_SUCCESS, UPDATE_TIME_LOG_FAILED, DELETE_TIME_LOG_SUCCESS, DELETE_TIME_LOG_FAILED } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  id: '',
  errorMessage: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TIME_LOGS_SUCCESS:
      return {
        ...state,
        items: action.payload
      }
    case FETCH_TIME_LOGS_FAILED:
      return {
        ...state,
        items: [],
        errorMessage: action.payload
      }
    case CREATE_TIME_LOG_SUCCESS:
      return {
        ...state,
        id: action.payload
      }
    case CREATE_TIME_LOG_FAILED:
      return {
        ...state,
        errorMessage: action.payload
      }
    case UPDATE_TIME_LOG_SUCCESS:
      return {
        ...state,
        item: action.payload
      }
    case UPDATE_TIME_LOG_FAILED:
      return {
        ...state,
        errorMessage: action.payload
      }
      case DELETE_TIME_LOG_SUCCESS:
      return {
        ...state,
        items: state.items.filter(i => i._id !== action.payload)
      }
    case DELETE_TIME_LOG_FAILED:
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state
  }
}