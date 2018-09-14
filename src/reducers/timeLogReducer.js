import { FETCH_TIME_LOGS_SUCCESS, FETCH_TIME_LOGS_FAILED, CREATE_TIME_LOG_SUCCESS, CREATE_TIME_LOG_FAILED, UPDATE_TIME_LOG_SUCCESS, UPDATE_TIME_LOG_FAILED, DELETE_TIME_LOG_SUCCESS, DELETE_TIME_LOG_FAILED, FETCH_MORE_TIME_LOGS_SUCCESS, FETCH_MORE_TIME_LOGS_FAILED, UPDATE_TIME_LOG_VALUE, UPDATE_TIME_LOG_VALUE_SUCCESS } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  id: '',
  errorMessage: ''
}

const uniqueItems = (oldState, newState) => {
  const itemsCopy = [...oldState]
  const ids = itemsCopy.map(i => i._id)
  return [...itemsCopy,...newState.filter(i => !ids.includes(i._id))]
}

const updateItems = (oldState, newState) => {
  const itemsCopy = [...oldState]
  itemsCopy.forEach(item => {
    if (item._id === newState.id) {
      item[newState.name] = newState.value
    }
  })

  return [...itemsCopy]
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
    case FETCH_MORE_TIME_LOGS_SUCCESS:
      return {
        ...state,
        items: uniqueItems(state.items, action.payload)
      }
    case FETCH_MORE_TIME_LOGS_FAILED:
      return {
        ...state,
        items: [],
        errorMessage: action.payload
      }
    case CREATE_TIME_LOG_SUCCESS:
      return {
        ...state,
        id: action.payload,
        item: {}
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
    case UPDATE_TIME_LOG_VALUE:
      return {
        ...state,
        items: updateItems(state.items, action.payload)
      }
      case UPDATE_TIME_LOG_VALUE_SUCCESS:
      return {
        ...state,
        items: updateItems(state.items, action.payload)
      }
    default:
      return state
  }
}