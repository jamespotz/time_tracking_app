import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeLogListItem from './TimeLogListItem'
import moment from 'moment'

export default class TimeLogLists extends PureComponent {
  constructor() {
    super()
    this.state = {
      timeLogsByDate: []
    }
  }
  static propTypes = {
    timeLogs: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      time_in: PropTypes.string,
      time_out: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      _id: PropTypes.string
    }))
  }

  groupByDate = () => {
    return this.props.timeLogs.reduce((obj, tLog) => {
      const date = moment(tLog.createdAt).format('YYYY-MM-DD')
      if (!obj.hasOwnProperty(date)) {
        obj[date] = []
      }
      obj[date].push(tLog)
      return obj
    }, {})
  }

  formatDate = (key) => {
    const date = moment(key)
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'days').startOf('day')

    if (date.isSame(today, 'd')) {
      return 'Today'
    }

    if (date.isSame(yesterday, 'd')) {
      return 'Yesterday'
    }

    return date.format('MMMM DD')
  }


  render() {
    const data = this.groupByDate()
    const timeLogsByDate = Object.keys(data).map(key => {
      const totalTimeMs = data[key].map(t => {
        const duration = moment.duration(moment(t.time_out).diff(moment(t.time_in)))
        return isNaN(duration) ? 0 : duration.asMilliseconds()
      }).reduce((sum, duration) => { return sum += Number(duration) }, 0)

      const timeLogs = data[key].map(timeLog => {
        return <TimeLogListItem 
          description={timeLog.description}
          time_in={timeLog.time_in}
          time_out={timeLog.time_out}
          _id={timeLog._id}
          key={timeLog._id}
        />
      })

      return <div className="px-0 my-4" key={key}>
        <div className="flex flex-row justify-between px-4">
          <h3 className="text-2xl hover:text-grey">
            {this.formatDate(key)}
          </h3>
          <span className="hover:text-teal">
            Total: {moment.utc(totalTimeMs).format('HH:mm:ss')}
          </span>
        </div>
        { timeLogs }
      </div>
    })

    return (
      <div className="flex flex-col mt-4">
        { timeLogsByDate }
      </div>
    )
  }
}
