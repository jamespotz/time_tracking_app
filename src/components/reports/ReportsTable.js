import React, { Component } from 'react'
import TimeLogListItem from '../time_logs/TimeLogListItem'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import DataTable from '../datatable/DataTable'

class ReportsTable extends Component {
  constructor() {
    super()
    this.state = {
      page_size: 10,
      page: 0
    }
  }

  getDuration = (time_in, time_out) => {
    if (!time_in && !time_out) { return '' }
    const duration = moment.duration(moment(time_out).diff(moment(time_in)))
    return isNaN(duration) ? '00:00:00' : moment.utc(duration.asMilliseconds()).format('HH:mm:ss')
  }

  render() {
    const headers = ["description", "time_in", "time_out", "duration"]
    const data = this.props.timeLogs.map(item => {
      return {
        _id: item._id,
        description: item.description,
        time_in: moment(item.time_in).format('HH:mm a'),
        time_out: moment(item.time_out).format('HH:mm a'),
        duration: this.getDuration(item.time_in, item.time_out)
      }
    })
    if (this.props.timeLogs.length > 0) {
      return (
        <div className="px-16 pt-4">
          <div className="shadow-lg py-4">
            <DataTable headers={headers} data={data} />
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

ReportsTable.propTypes = {
  timeLogs: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    time_in: PropTypes.string,
    time_out: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    _id: PropTypes.string
  }))
}

export default ReportsTable