import React, { Component } from 'react'
import TimeLogForm from './TimeLogForm'
import moment from 'moment'
import TimeLogLists from './TimeLogLists'
import Button from '../form_fields/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions/timeLogActions';

class TimeLog extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      time_in: moment().format('x'),
      time_out: '',
      _id: null,
      time: moment().format('hh:mm a'),
      btn_name: 'Clock In',
      btn_class_names: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl',
      page: 1,
      limit: 10
    }

    this.timeInterval = null
  }

  componentDidMount() {
    if (!this.timeInterval) {
      this.timeInterval = setInterval(this.currentTime, 1000)
    }
  }

  componentWillMount() {
    this.props.fetchTimeLogs({page: 0, limit: this.state.limit})
  }

  componentWillUnmount() {
    if (this.timeInterval) clearInterval(this.timeInterval)
    this.timeInterval = null
  }

  componentWillReceiveProps(nextProps) {
    const { newTimeLog, newTimeLogId, deletedTimeLogId } = nextProps
    if (newTimeLog && newTimeLog.hasOwnProperty('_id')) {
      this.props.timeLogs.unshift(newTimeLog)
      this.clearState()
    }

    if (newTimeLogId) {
      this.changeState(newTimeLogId)
    }
  }

  submitNewTime = () => {
    const self = this
    const { description, time_in, time_out } = this.state
    let data = {
      description: description,
      time_in: time_in,
      time_out: null
    }

    this.props.createNewTimeLog(data)
  }

  submitUpdatedTime = () => {
    const self = this
    const { description, time_in, time_out } = this.state
    let data = {
      description: description,
      time_in: time_in,
      time_out: time_out
    }

    this.props.updateNewTimeLog(this.state._id, data)
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

  changeState = (id) => {
    const newState = { ...this.state }
    newState._id = id
    newState.btn_name = 'Clock Out'
    newState.btn_class_names = 'bg-red-dark hover:bg-red-light text-white font-bold py-3 px-4 rounded-full text-xl'
    this.setState(newState)
  }

  clearState = () => {
    const newState = { ...this.state }
    newState._id = null
    newState.description = ''
    newState.time_out = ''
    newState.time_in = moment().format('x')
    newState.btn_name = 'Clock in'
    newState.btn_class_names = 'bg-teal hover:bg-teal-light text-white font-bold py-3 px-4 rounded-full text-xl'
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

  loadMoreTimelogs = () => {
    const self = this
    const page = self.state.page || 1
  }

  filterUniq = (objList) => {
    const ids = objList.map(o => o._id)
    return objList.filter((item, pos, arr) => {
      return ids.indexOf(item._id) === pos
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

        <TimeLogLists timeLogs={this.props.timeLogs} />
        <div className="flex flex-row justify-center">
        <Button name="Load More" classNames="bg-transparent text-grey font-semibold hover:text-black py-2 px-4 font-2xl"  handleOnClick={ this.loadMoreTimelogs }/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  timeLogs: state.timeLog.items,
  newTimeLog: state.timeLog.item,
  newTimeLogId: state.timeLog.id,
  errorMessage: state.timeLog.errorMessage
})

export default withRouter(connect(mapStateToProps, actions)(TimeLog))