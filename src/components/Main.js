import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import TimeLog from './time_logs/TimeLog'
import Reports from './Reports'
import SideBar from './SideBar'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

class Main extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="container flex h-screen">
          <SideBar />
          <div className="w-5/6 overflow-auto flex-grow">
            <Route exact path='/time-logs' component={TimeLog} />
            <Route exact path='/reports' component={Reports} />
          </div>
        </div>
      )
    } else {
      return(
        <Redirect to="/sign-in" />
      )
    }
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps)(Main))