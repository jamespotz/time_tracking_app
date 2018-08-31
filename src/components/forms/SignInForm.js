import React, { Component } from 'react'
import TextInput from '../form_fields/TextInput'
import SubmitButton from '../form_fields/SubmitButton'
import { connect } from 'react-redux'
import { signIn } from '../../actions/authActions'
import { Redirect, withRouter } from 'react-router-dom'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    }
  }

  onChange = (event) => {
    const field = event.target.name
    const newCredentials = {}
    newCredentials[field] = event.target.value
    const credentials = Object.assign({}, this.state.credentials, newCredentials)

    this.setState({ credentials: credentials })
  }

  onSave = (event) => {
    event.preventDefault()
    this.props.signIn(this.state.credentials, this.props.history)
  }

  signUpPage = (event) => {
    event.preventDefault()
    this.props.history.push('/sign-up')
  }

  render() {
    const { credentials } = this.state
    let errorMessage = ''
    if (this.props.auth.errorMessage) {
      errorMessage = <div className="py-2 px-2 text-white bg-red-dark rounded mt-1">{this.props.auth.errorMessage}</div>
    }
    return(
      <div className="flex w-full h-screen justify-center items-center bg-blue">
        { this.props.auth.isAuthenticated ? <Redirect to="/time-logs" /> : null }
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h1>Sign In</h1>
            { errorMessage }
            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              onChange={this.onChange}
            />

            <TextInput
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              onChange={this.onChange}
            />

            <SubmitButton 
              name="Sign In" 
              classNames="bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded text-md mt-3 w-full"
              onClick={this.onSave}
            />

            <SubmitButton 
              name="Sign Up" 
              classNames="bg-grey-light hover:bg-grey-dark text-white font-bold py-3 px-4 rounded text-md mt-3 w-full"
              onClick={this.signUpPage}
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, { signIn })(SignInForm))