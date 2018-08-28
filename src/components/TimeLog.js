import React, { PureComponent } from 'react'
import TimeLogForm from './TimeLogForm'
import axios from 'axios'
import moment from 'moment'
import TimeLogListItem from './TimeLogListItem';
import TimeLogLists from './TimeLogLists';

class TimeLog extends PureComponent {
  constructor() {
    super()
    this.state = {
      timeLogs: [],
      description: '',
      time_in: moment().format('x'),
      time_out: '',
      _id: null,
      time: moment().format('hh:mm a'),
      btn_name: 'Clock In',
      btn_class_names: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl'
    }

    this.timeInterval = null
    this.pollInterval = null
  }

  componentDidMount() {
    sessionStorage.setItem('AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMjNAdGVzdC5jb20iLCJ1c2VySWQiOiI1YjdmYzU3ZWE3Njc2ZDQyYThlNDI5MTUiLCJpYXQiOjE1MzU0MjMwOTQsImV4cCI6MTUzNTQ1OTA5NH0.brLZ5yr4nDBbbPgcg6JXlSE5VVmBI8EheMh2bgvbkIQ')
    if (!this.timeInterval) {
      this.timeInterval = setInterval(this.currentTime, 1000)
    }

    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadTimelogs, 2000)
    }
  }

  componentWillMount() {
    if (this.timeInterval) clearInterval(this.timeInterval)
    if (!this.pollInterval) clearInterval(this.pollInterval)
    this.timeInterval = null
    this.pollInterval = null
  }

  submitNewTime = () => {
    const self = this
    const { description, time_in, time_out } = this.state
    let data = {
      description: description,
      time_in: time_in,
      time_out: null
    }

    let axiosConfig = {
      headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${sessionStorage.getItem('AUTH_TOKEN')}`
      }
    }

    axios
      .post(
        'http://localhost:3001/api/time-log', 
        data, 
        axiosConfig)
      .then(response => {
        self.changeState(response.data._id)
      }).catch(err => {
        console.log(err)
      })
  }

  submitUpdatedTime = () => {
    const self = this
    const { description, time_in, time_out } = this.state
    let data = {
      description: description,
      time_in: time_in,
      time_out: time_out
    }
    
    let axiosConfig = {
      headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${sessionStorage.getItem('AUTH_TOKEN')}`
      }
    }

    axios
      .patch(
        `http://localhost:3001/api/time-log/${this.state._id}`, 
        data, 
        axiosConfig)
      .then(response => {
        self.clearState()
      }).catch(err => {
        console.log(err)
      })
  }

  submitTime = (event) => {
    event.preventDefault();
    if (!this.state._id) {
      this.submitNewTime()
    } else {
      this.submitUpdatedTime()
    }
  }

  handleChange = (event) => {
    const newState = { ...this.state }
    newState[event.target.name] = event.target.value
    this.setState(newState)
  }

  clearState = () => {
    const newState = { ...this.state }
    newState._id = null
    newState.time_out = null
    newState.time_in = moment().format('x')
    newState.btn_name = 'Clock in'
    newState.btn_class_names = 'bg-teal hover:bg-teal-light text-white font-bold py-3 px-4 rounded-full text-xl'
    this.setState(newState)
  }

  changeState = (id) => {
    const newState = { ...this.state }
    newState._id = id
    newState.btn_name = 'Clock Out'
    newState.btn_class_names = 'bg-red-dark hover:bg-red-light text-white font-bold py-3 px-4 rounded-full text-xl'
    this.setState(newState)
  }

  currentTime = () => {
    const newState = { ...this.state }
    let format = 'hh:mm a'
    if (!this.state._id) {
      newState.time_in = moment().format('x')
    } else {
      newState.time_out = moment().format('x')
      format = 'hh:mm:ss a'
    }
    newState.time = moment().format(format)
    this.setState(newState)
  }

  loadTimelogs = () => {
    const self = this
    let axiosConfig = {
      headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${sessionStorage.getItem('AUTH_TOKEN')}`
      }
    }

    axios.get('http://localhost:3001/api/time-logs', axiosConfig)
      .then(results => {
        const newState = { ...self.state }
        newState.timeLogs = results.data.timeLogs
        self.setState(newState)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <TimeLogForm 
          submitForm={this.submitTime}
          description={this.state.description}
          time_in={this.state.time_in}
          time_out={this.state.time_out}
          handleChange={this.handleChange}
          currentTime={this.state.time}
          btn_name={this.state.btn_name}
          btn_class_names={this.state.btn_class_names}
        />

        <TimeLogLists timeLogs={this.state.timeLogs} />
      </div>
    )
  }
}

export default TimeLog