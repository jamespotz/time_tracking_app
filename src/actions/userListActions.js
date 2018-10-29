import axios from 'axios';
import swal from 'sweetalert';
import auth from '../auth/authorization';
import { FETCH_USERS_LIST_SUCCESS, FETCH_USERS_LIST_FAILED } from './types';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchUserLists = pagination => dispatch => {
  const { page, limit } = pagination;
  axios
    .get(`/api/user-lists?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: auth.header(),
      },
    })
    .then(results => {
      if (page <= 0) {
        dispatch({
          type: FETCH_USERS_LIST_SUCCESS,
          payload: results.data.userLists,
        });
      }
    })
    .catch(err => {
      if (page <= 0) {
        dispatch({
          type: FETCH_USERS_LIST_FAILED,
          payload: err.response.data.message,
        });
      }
    });
};
