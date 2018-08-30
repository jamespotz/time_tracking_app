import React, { PureComponent } from 'react'
import TextInput from '../FormFields/TextInput'
import SubmitButton from '../FormFields/SubmitButton'

class SignInForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    }
  }

  onChange(event) {
    const field = event.target.name
    const credentials = this.state.credentials
    credentials[field] = event.targer.value

    this.setState({ credentials: credentials })
  }

  onSave(event) {
    event.preventDefault()
    console.log(event)
  }

  render() {
    const { email, password } = this.state.credentials
    return(
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-full max-w-xs h-48">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3>Sign In</h3>
            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              value={password}
              onChange={this.onChange}
            />

            <TextInput
              name="password"
              label="Password"
              value={password}
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
              classNames="bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded text-md mt-3 w-full"
              onClick={this.onSave}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default SignInForm