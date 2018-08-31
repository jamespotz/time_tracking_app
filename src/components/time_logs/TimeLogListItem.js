import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../form_fields/Button'
import { connect } from 'react-redux'
import { deleteTimeLog } from '../../actions/timeLogActions'

class TimeLogListItem extends Component {
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

  render() {
    const { description, time_in, time_out } = this.props
    return(
      <div className="flex flex-row flex-no-wrap flex-1 justify-between w-full border border-grey-lighter px-4 py-4 hover:bg-grey-lighter">
        <div className="w-1/2">
          <small className="text-grey">Description</small><br/>
          <span className="text-xl">{description}</span>
        </div>
        <div className="w-1/4">
          <small className="text-grey">Time In - Out</small><br/>
          {this.formatTime(time_in)} - {this.formatTime(time_out)}
        </div>
        <div className="w-1/4">
          <small className="text-grey">Duration</small><br/>
          { this.getDuration(time_in, time_out) }
        </div>
        <div className="flex flex-row">
          <Button name="Edit" classNames="bg-transparent text-grey font-semibold hover:text-grey-darker py-1 px-2 text-xs" />
          <Button name="&times;" classNames="bg-transparent text-grey font-semibold hover:text-black py-2 px-4 font-2xl"  handleOnClick={ this.onDelete }/>
        </div>
      </div>
    )
  }
}

export default connect(null, { deleteTimeLog })(TimeLogListItem)