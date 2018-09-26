import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const ONE_HOUR = 3600 * 1000
const TWO_HOURS = ONE_HOUR * 2
const FOUR_HOURS = TWO_HOURS * 2

class TotalHoursChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total_duration: 0,
      data: {},
      options:{
        maintainAspectRatio: false,
        animation: {
          duration: 300,
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index]
              const seconds = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 0

              const time = moment.utc(seconds)
              const hoursDisplay = time.format('HH') !== '00' ? `${time.format('HH')} h` : ''
              const minutesDisplay = time.format('mm') !== '00' ? `${time.format('mm')} min` : ''

              return `${label} : ${hoursDisplay} ${minutesDisplay} ${time.format('ss')} sec`
            }
          }
        },
        legend: {
          display: false,
          labels: {
            fontColor: '#8795A1',
            fontSize: 12,
            usePointStyle: true,
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
                fontColor: '#8795A1',
                callback: function(value, index, values) {
                    return `${moment.utc(value).format('HH')} h`
                },
                stepSize: ONE_HOUR
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontColor: '#8795A1'
            }
          }]
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const self = this
    let total_duration = 0
    const { timeLogs } = nextProps
    const data = {
      datasets:[{
        label: 'Time Log',
        data: [],
        borderColor: "#00b8ff",
        backgroundColor: "#00b8ff",
        lineTension: 0.1,
        pointBorderWidth: 2,
        pointBackgroundColor: '#fff',
        pointRadius: 4
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

    Object.keys(sortedGroupedTimeLogs).forEach(key => {
      const duration = self.getTotalDuration(sortedGroupedTimeLogs[key])
      data.labels.push(moment(key).format('MMM DD'))
      data.datasets[0].data.push(duration)
      total_duration += duration
    })

    this.setState({data: data, total_duration: total_duration})
  }

  getTotalDuration = (items) => {
    return items.map(t => {
      return this.getDuration(t.time_in, t.time_out)
    }).reduce((sum, duration) => { return sum += Number(duration) }, 0)
  }

  getDuration = (time_in, time_out) => {
    const duration = moment.duration(moment(time_out).diff(moment(time_in)))
    return isNaN(duration) ? 0 : duration.asMilliseconds()
  }

  render() {
    const time = moment.utc(this.state.total_duration)
    return(
      <div className="py-4 px-16">
        <div className="bg-white p-8 shadow-md rounded">
          <strong className="text-2xl flex justify-end items-center">
            <span className="text-sm text-grey mr-3">Total:</span> 
            <span className="text-purple-darker">{ time.hours() } h { time.minutes() } min</span>
          </strong>
          <br />
          <Line 
            data={this.state.data}
            height={250}
            options={this.state.options} 
          />
        </div>
      </div>
    )
  }
}

export default TotalHoursChart