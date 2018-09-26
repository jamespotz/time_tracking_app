import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions/timeLogActions'
import auth from '../../auth/authorization'
import moment from 'moment'
import TotalHoursChart from './TotalHoursChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import CustomCalendar from '../calendar/CustomCalendar'
import ReportsTable from './ReportsTable'

const START_Of_DAY = moment().startOf('day').toISOString()
const END_OF_DAY = moment(START_Of_DAY).startOf('day').toISOString()

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: START_Of_DAY,
      endDate: END_OF_DAY,
      active: 'today',
      dates: 'Today'
    }
  }

  componentDidMount() {
    if (auth.signedIn()) {
      this.getTimeLogs({startDate: START_Of_DAY, endDate: END_OF_DAY})
    }
  }

  getTimeLogs = ({startDate, endDate}) => {
    this.props.filterTimeLogs({startDate: startDate, endDate: endDate})
    this.setState({
      startDate: startDate,
      endDate: endDate
    })
  }

  filterToday = () => {
    this.getTimeLogs({startDate: START_Of_DAY, endDate: END_OF_DAY})
    this.setState({ active: 'today', dates: 'Today' })
  }

  filterLast7Days = () => {
    const startDate = moment().subtract(7, 'd').startOf('day').toISOString()
    const endDate = END_OF_DAY
    this.getTimeLogs({startDate: startDate, endDate: endDate})
    this.setState({ active: 'last-7-days', dates: `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')}` })
  }

  filterLast30Days = () => {
    const startDate = moment().subtract(30, 'd').startOf('day').toISOString()
    const endDate = END_OF_DAY
    this.getTimeLogs({startDate: startDate, endDate: endDate})
    this.setState({ active: 'last-30-days', dates: `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')}` })
  }

  filterCustom = (dates) => {
    const startDate = moment(dates[0]).startOf('day').toISOString()
    const endDate = moment(dates[1]).endOf('day').toISOString()
    this.getTimeLogs({startDate: startDate, endDate: endDate})
    this.setState({ active: 'custom', dates: `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')}` })
  }

  getActiveLink = (name) => {
    const default_css = 'filter-nav-item'
    return this.state.active === name ? `${default_css} active` : default_css
  }

  render() {
    return (
      <div>
        <div className="px-16 pt-12 flex justify-between">
          <ul className="filter-nav">
            <li className={this.getActiveLink('today')}>
              <a className="filter-nav-item--link" onClick={this.filterToday}>Today</a>
            </li>
            <li className={this.getActiveLink('last-7-days')}>
              <a className="filter-nav-item--link" onClick={this.filterLast7Days}>Last 7 days</a>
            </li>
            <li className={this.getActiveLink('last-30-days')}>
              <a className="filter-nav-item--link" onClick={this.filterLast30Days}>Last 30 days</a>
            </li>
            <li className={this.getActiveLink('custom')}>
              <CustomCalendar onClose={this.filterCustom}>
                <a className="filter-nav-item--link" data-toggle>
                <FontAwesomeIcon icon={faCalendarAlt} />
                </a>
              </CustomCalendar>            
            </li>
          </ul>

          <div className="text-xl text-grey hover:text-grey-darker">{ this.state.dates }</div>
        </div>
        <TotalHoursChart timeLogs={this.props.timeLogs} />

        <ReportsTable timeLogs={this.props.timeLogs} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  timeLogs: state.timeLog.items
})

export default withRouter(connect(mapStateToProps, actions)(Reports))