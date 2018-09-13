import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import TimeLogListItem from './TimeLogListItem'
import moment from 'moment'
import './TimeLogLists.css'

export default class TimeLogLists extends Component {
  constructor() {
    super()
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

  getDuration = (time_in, time_out) => {
    const duration = moment.duration(moment(time_out).diff(moment(time_in)))
    return isNaN(duration) ? 0 : duration.asMilliseconds()
  }

  render() {
    const data = this.groupByDate()
    const timeLogsByDate = Object.keys(data).map(key => {
      const totalTimeMs = data[key].map(t => {
        return this.getDuration(t.time_in, t.time_out)
      }).reduce((sum, duration) => { return sum += Number(duration) }, 0)

      const timeLogs = data[key].sort((a, b) => a.createdAt-b.createdAt).map(timeLog => {
        return (
          <CSSTransition
            key={timeLog._id}
            classNames="fade"
            timeout={{ enter: 500, exit: 300 }}
          >
            <TimeLogListItem 
              description={timeLog.description}
              time_in={timeLog.time_in}
              time_out={timeLog.time_out}
              _id={timeLog._id}
              key={timeLog._id}
            />
          </CSSTransition>
        )
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
        <TransitionGroup>
          { timeLogs }
        </TransitionGroup>        
      </div>
    })

    return (
      <div className="flex flex-col mt-4">
        { timeLogsByDate }
      </div>
    )
  }
}
