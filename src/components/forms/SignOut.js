import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { signOut } from '../../actions/authActions'
import { PropTypes } from 'prop-types';


class SignOut extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  onSignOut = () => {
    this.props.signOut(this.props.history)
  }

  render() {
    return (
      <button className={`${this.props.className} w-full`} onClick={this.onSignOut}>Sign Out</button>
    )
  }
}

export default withRouter(connect(null, { signOut })(SignOut))