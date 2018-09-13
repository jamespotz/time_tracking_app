import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  static propTypes = {
    classNames: PropTypes.string,
    handleOnClick: PropTypes.func
  }

  static defaultProps = {
    classNames: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl'
  }

  render() {
    const { classNames, handleOnClick } = this.props
    return (
      <button className={classNames} onClick={handleOnClick}>
        { this.props.children }
      </button>
    )
  }
}