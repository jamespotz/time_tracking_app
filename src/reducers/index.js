import { combineReducers } from 'redux';
import authReducer from './authReducer';
import timeLogReducer from './timeLogReducer';
import userListReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  timeLog: timeLogReducer,
  userList: userListReducer,
});
