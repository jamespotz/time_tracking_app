import { combineReducers } from 'redux'
import authReducer from  './authReducer'
import timeLogReducer from './timeLogReducer';

export default combineReducers({
  auth: authReducer,
  timeLog: timeLogReducer
})