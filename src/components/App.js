import React, { Component } from 'react'
import Main from './Main';
import SignInForm from './forms/SignInForm';
import { Switch, Route } from 'react-router-dom'
import SignUpForm from './forms/SignUpForm';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/sign-in' component={SignInForm} />
          <Route exact path='/sign-up' component={SignUpForm} />
          <Main />
        </Switch>
      </div>
    )
  }
}

export default App