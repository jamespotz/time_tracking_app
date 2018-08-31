import React, { Component } from 'react'
import TextInput from '../form_fields/TextInput'
import SubmitButton from '../form_fields/SubmitButton'
import { connect } from 'react-redux'
import { signUp } from '../../actions/authActions'
import { Redirect, withRouter } from 'react-router-dom'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        first_name: '',
        last_name: '',
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
    this.props.signUp(this.state.credentials, this.props.history)
  }

  signInPage = (event) => {
    event.preventDefault()
    this.props.history.push('/sign-in')
  }

  render() {
    const { credentials } = this.state
    let errorMessage = ''
    if (this.props.auth.signUpErrorMessage) {
      errorMessage = <div className="py-2 px-2 text-white bg-red-dark rounded mt-1">{this.props.auth.signUpErrorMessage}</div>
    }
    return(
      <div className="flex w-full h-screen justify-center items-center bg-blue">
        { this.props.auth.isAuthenticated ? <Redirect to="/" /> : null }
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h1>Sign Up</h1>
            { errorMessage }
            <TextInput
              name="first_name"
              type="first_name"
              label="First Name"
              placeholder="First Name"
              onChange={this.onChange}
            />

            <TextInput
              name="last_name"
              type="last_name"
              label="Last Name"
              placeholder="Last Name"
              onChange={this.onChange}
            />

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
              name="Sign Up" 
              classNames="bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded text-md mt-3 w-full"
              onClick={this.onSave}
            />

            <SubmitButton 
              name="Sign In" 
              classNames="bg-grey-light hover:bg-grey-dark text-white font-bold py-3 px-4 rounded text-md mt-3 w-full"
              onClick={this.signInPage}
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

export default withRouter(connect(mapStateToProps, { signUp })(SignUpForm))