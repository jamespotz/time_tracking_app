import React, { Component } from 'react'
import TimeLogForm from './TimeLogForm'
import moment from 'moment'
import TimeLogLists from './TimeLogLists'
import Button from '../form_fields/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions/timeLogActions'
import auth from '../../auth/authorization'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

class TimeLog extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      time_in: moment().format('x'),
      time_out: '',
      _id: null,
      time: moment().format('hh:mm a'),
      btn_name: <FontAwesomeIcon icon={faPlay} className="ml-1" />,
      btn_class_names: 'bg-arielles-smile text-white font-bold rounded-full text-xl flex flex-col w-12 h-12 items-center justify-center',
      page: 0,
      limit: 10
    }

    this.timeInterval = null
  }

  componentDidMount() {
    if (!this.timeInterval) {
      this.timeInterval = setInterval(this.currentTime, 1000)
    }

    if (auth.signedIn()) {
      this.props.fetchTimeLogs({page: this.state.page, limit: this.state.limit})
    }
  }

  componentWillUnmount() {
    if (this.timeInterval) clearInterval(this.timeInterval)
    this.timeInterval = null
  }

  componentWillReceiveProps(nextProps) {
    const { newTimeLog, newTimeLogId } = nextProps
    if (newTimeLog && newTimeLog.hasOwnProperty('_id')) {
      const found = this.props.timeLogs.find(i => i._id === newTimeLog._id)
      if (!found) {
        this.props.timeLogs.unshift(newTimeLog)
      }
      this.clearState()
    }

    if (newTimeLogId && !newTimeLog.hasOwnProperty('_id')) {
      this.changeState(newTimeLogId)
    }
  }

  submitNewTime = () => {
    const { description, time_in, time_out } = this.state
    let data = {
      description: description,
      time_in: time_in,
      time_out: null
    }

    this.props.createNewTimeLog(data)
  }

  submitUpdatedTime = () => {
    const { description, time_in, time_out } = this.state
    let data = {
      description: description,
      time_in: time_in,
      time_out: time_out
    }

    this.props.updateTimeLog(this.state._id, data)
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
    console.log(id)
    const newState = { ...this.state }
    newState._id = id
    newState.btn_name = <FontAwesomeIcon icon={faStop} />
    newState.btn_class_names = 'bg-sugar-lollipop text-white font-bold rounded-full text-xl flex flex-col w-12 h-12 items-center justify-center'
    this.setState(newState)
  }

  clearState = () => {
    const newState = { ...this.state }
    newState._id = ''
    newState.description = ''
    newState.time_out = ''
    newState.time_in = moment().format('x')
    newState.btn_name = <FontAwesomeIcon icon={faPlay} className="ml-1" />
    newState.btn_class_names = 'bg-arielles-smile text-white font-bold rounded-full text-xl flex flex-col w-12 h-12 items-center justify-center'
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
    const page = this.state.page + 1
    this.props.fetchTimeLogs({page: page, limit: this.state.limit})
    const newState = {...this.state}
    newState.page = page
    this.setState(newState)
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
        <div className="flex flex-row justify-center my-4">
          <Button 
            classNames="bg-transparent text-grey font-semibold hover:text-black py-2 px-4 font-2xl"
            handleOnClick={ this.loadMoreTimelogs }
          >
            Load More
          </Button>
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