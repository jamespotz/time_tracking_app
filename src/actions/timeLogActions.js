import axios from 'axios'
import swal from 'sweetalert'
import auth from '../auth/authorization'
import { FETCH_TIME_LOGS_SUCCESS, FETCH_TIME_LOGS_FAILED, CREATE_TIME_LOG_SUCCESS, CREATE_TIME_LOG_FAILED, UPDATE_TIME_LOG_SUCCESS, UPDATE_TIME_LOG_FAILED, DELETE_TIME_LOG_SUCCESS, DELETE_TIME_LOG_FAILED } from './types';

axios.defaults.headers['Authorization'] = auth.authHeader()
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const fetchTimeLogs = (pagination) => dispatch => {
  const { page, limit } = pagination
  console.log('authHeader', auth.authHeader())
  axios
    .get(`/api/time-logs?page=${page}&limit=${limit}`)
    .then(results => {
      dispatch({
        type: FETCH_TIME_LOGS_SUCCESS,
        payload: results.data.timeLogs
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_TIME_LOGS_FAILED,
        payload: err.response.data.message
      })
    })
}

export const createNewTimeLog = (postData) => dispatch => {
  axios
    .post('/api/time-log', postData)
    .then(result => {
      dispatch({
        type: CREATE_TIME_LOG_SUCCESS,
        payload: result.data._id
      })
    })
    .catch(err => {
      dispatch({
        type: CREATE_TIME_LOG_FAILED,
        payload: err.response.data.message
      })
    })
}


export const updateNewTimeLog = (id, patchData) => dispatch => {
  axios
    .patch(
      `/api/time-log/${id}`, 
      patchData)
    .then(response => {
      dispatch({
        type: UPDATE_TIME_LOG_SUCCESS,
        payload: response.data.timeLog
      })
    }).catch(err => {
      dispatch({
        type: UPDATE_TIME_LOG_FAILED,
        payload: err.response.data.message
      })
    })
}


export const deleteTimeLog = (id) => dispatch => {
  swal({
    title: 'Are you sure?',
    text: "Once deleted, you will not be able to recover this time log",
    icon: "warning",
    buttons: true,
    dangerMode: true
  })
  .then(willDelete => {
    if (willDelete) {    
      axios
        .delete(`/api/time-log/${id}`)
        .then(response => {
          dispatch({
            type: DELETE_TIME_LOG_SUCCESS,
            payload: id
          })
          swal({
            title: 'Deleted',
            text: response.data.message,
            icon: 'success'
          })
        }).catch(err => {
          dispatch({
            type: DELETE_TIME_LOG_FAILED,
            payload: err.response.data.message
          })
        })
    } else {
      swal('Your time log is safe!')
    }
  })
}