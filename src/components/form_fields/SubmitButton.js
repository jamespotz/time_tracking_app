import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SubmitButton extends Component {
  static propTypes = {
    classNames: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    classNames: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl',
    type: 'submit'
  }

  render() {
    const { classNames, type, onClick } = this.props
    return (
      <button type={type} className={classNames} onClick={onClick}>
        { this.props.children }
      </button>
    )
  }
}