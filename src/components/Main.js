import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import TimeLog from './TimeLog'
import Reports from './Reports'

export default class Main extends PureComponent {
  render() {
    return (
      <div className="w-5/6 overflow-auto flex-grow">
        <Switch>
          <Route exact path='/' component={TimeLog} />
          <Route exact path='/report' component={Reports} />
        </Switch>
      </div>
    )
  }
}
