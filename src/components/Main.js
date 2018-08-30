import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import TimeLog from './TimeLogs/TimeLog'
import Reports from './Reports'
import SignInForm from '../components/Session/SignInForm'

export default class Main extends PureComponent {
  render() {
    return (
      <div className="w-5/6 overflow-auto flex-grow">
        <Switch>
          <Route exact path='/' component={TimeLog} />
          <Route exact path='/report' component={Reports} />
          <Route exact path='/sign-in' component={SignInForm} />
        </Switch>
      </div>
    )
  }
}
