import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/timeLogActions'
import auth from '../auth/authorization'
import moment from 'moment'

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      options:{
        animation: {
          duration: 300,
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                const label = data.labels[tooltipItem.index]
                const seconds = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 0

                return `${label} : ${moment.utc(seconds).format('HH:mm:ss')}`
              }
          }
        },
        scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return moment.utc(value).format('HH:mm:ss');
                  }
              }
          }]
        }
      }
    }
  }


  componentDidMount() {
    if (auth.signedIn()) {
      this.props.fetchTimeLogs({page: 0, limit: 20})
    }
  }

  componentWillReceiveProps(nextProps) {
    const { timeLogs } = nextProps
    const data = {
      datasets:[{
        label: 'Time Log',
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.3)"
      }],
      labels: []
    }

    let groupedTimeLogs = timeLogs.reduce((obj, tLog) => {
      const date = moment(tLog.createdAt).format('YYYY-MM-DD')
      if (!obj.hasOwnProperty(date)) {
        obj[date] = []
      }
      obj[date].push(tLog)
      return obj
    }, {})

    const sortedGroupedTimeLogs = Object.keys(groupedTimeLogs)
                            .sort()
                            .reduce((a,v) => {
                              a[v] = groupedTimeLogs[v]
                              return a
                            }, {})

    Object.keys(sortedGroupedTimeLogs).map(key => {
      const duration = sortedGroupedTimeLogs[key].map(t => {
        return this.getDuration(t.time_in, t.time_out)
      }).reduce((sum, duration) => { return sum += Number(duration) }, 0)
      data.labels.push(moment(key).format('MMM DD'))
      data.datasets[0].data.push(duration)
    })

    this.setState({data: data})
  }

  getDuration = (time_in, time_out) => {
    const duration = moment.duration(moment(time_out).diff(moment(time_in)))
    return isNaN(duration) ? 0 : duration.asMilliseconds()
  }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color
  }


  render() {
    return (
      <div className="w-1/2 ml-4">
        <Line data={this.state.data} options={this.state.options} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  timeLogs: state.timeLog.items
})

export default withRouter(connect(mapStateToProps, actions)(Reports))