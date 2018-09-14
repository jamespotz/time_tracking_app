import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../form_fields/Button'
import { connect } from 'react-redux'
import { deleteTimeLog, updateTimeLogValue, updateTimeLog } from '../../actions/timeLogActions'
import SpanInput from '../form_fields/SpanInput';
import SpanDateTime from '../form_fields/SpanDateTime';

class TimeLogListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    time_in: PropTypes.string.isRequired,
    time_out: PropTypes.string,
    _id: PropTypes.string.isRequired,
    deleteTimeLog: PropTypes.func.isRequired
  }

  static defaultProps = {
    description: 'Empty Description'
  }

  formatTime = (unixTime) => {
    if (!unixTime) { return '00:00' }
    return moment(unixTime).format('hh:mm a')
  }

  getDuration = (time_in, time_out) => {
    if (!time_in && !time_out) { return '' }
    const duration = moment.duration(moment(time_out).diff(moment(time_in)))
    return isNaN(duration) ? '00:00:00' : moment.utc(duration.asMilliseconds()).format('HH:mm:ss')
  }

  onDelete = () => {
    this.props.deleteTimeLog(this.props._id)
  }

  onEdit = () => {
    this.setState({
      isEditing: true
    })
  }

  onUpdate = () => {
    this.props.updateTimeLog(this.props._id, {
      description: this.props.description,
      time_in: this.props.time_in,
      time_out: this.props.time_out
    })
    
    this.setState({
      isEditing: false
    })
  }

  handleEditing = (event) => {
    this.props.updateTimeLogValue({
      id: this.props._id,
      name: event.target.name,
      value: event.target.value
    })
  }

  handleTimeChange = (name, date) => {
    this.props.updateTimeLogValue({
      id: this.props._id,
      name: name,
      value: date.toString()
    })
  }

  cancelEditing = () => {
    this.setState({
      isEditing: false
    })
  }

  render() {
    const { description, time_in, time_out } = this.props
    return(
      <div className="flex flex-row flex-no-wrap flex-1 justify-between w-full border border-grey-lighter px-4 py-4 hover:bg-grey-lighter timelog-list--item">
        <div className="w-1/2">
          <small className="text-grey">Description</small><br/>
          <SpanInput 
            value={description} 
            name="description"
            isEditing={this.state.isEditing} 
            onChange={this.handleEditing}
          />
        </div>
        <div className="w-1/4">
          <small className="text-grey">Time In - Out</small><br/>
          <div className="flex flex-row items-center">
            {
              <SpanDateTime
                startDate={time_in}
                text={this.formatTime(time_in)}
                isEditing={this.state.isEditing}
                onChange={(date) => this.handleTimeChange('time_in', date)}
              />
            } <span className="px-1">-</span> {
              <SpanDateTime
                startDate={time_out}
                text={this.formatTime(time_out)}
                isEditing={this.state.isEditing} 
                onChange={(date) => this.handleTimeChange('time_out', date)}
              />
            }
          </div>
        </div>
        <div className="w-1/4">
          <small className="text-grey">Duration</small><br/>
          <div className="py-2">{ this.getDuration(time_in, time_out) }</div>
        </div>
        <div className="flex flex-row">
          <Button 
            classNames="bg-transparent text-grey font-semibold hover:text-grey-darker py-1 px-2 text-xs"
            handleOnClick={ this.state.isEditing ? this.onUpdate : this.onEdit }
          >
            { this.state.isEditing ? 'Update' : 'Edit'}
          </Button>
          {
            this.state.isEditing ? <Button
            classNames="bg-transparent text-grey font-semibold hover:text-grey-darker py-1 px-2 text-xs"
            handleOnClick={this.cancelEditing} >Cancel</Button> : ''
          }
          <Button
            classNames="bg-transparent text-grey font-semibold hover:text-black py-2 px-4 font-2xl" 
            handleOnClick={ this.onDelete }
          >
            &times;
          </Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteTimeLog, 
  updateTimeLogValue,
  updateTimeLog
}

export default connect(null, mapDispatchToProps)(TimeLogListItem)