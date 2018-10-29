import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import TimeLog from './time_logs/TimeLog';
import Reports from './reports/Reports';
import Users from './users/Users';
import { connect } from 'react-redux';
import UserRoute from './routes/UserRoute';
import NoMatch from './error_pages/NoMatch';

class Main extends Component {
  render() {
    return (
      <div>
        <UserRoute path="/time-logs" component={TimeLog} />
        <UserRoute path="/reports" component={Reports} />
        <UserRoute path="/users" component={Users} />
        <Route component={NoMatch} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Main));
