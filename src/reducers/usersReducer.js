import {
  FETCH_USERS_LIST_SUCCESS,
  FETCH_USERS_LIST_FAILED,
} from '../actions/types';

const initialState = {
  users: [],
  user: {},
  id: '',
  errorMessage: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USERS_LIST_FAILED:
      return {
        ...state,
        users: [],
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
