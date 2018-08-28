import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Button extends PureComponent {
  static propTypes = {
    classNames: PropTypes.string,
    handleOnClick: PropTypes.func,
    name: PropTypes.string.isRequired
  }

  static defaultProps = {
    classNames: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl',
    name: 'Button'
  }

  render() {
    const { classNames, name, handleOnClick } = this.props
    return (
      <button className={classNames} onClick={handleOnClick}>
        { name }
      </button>
    )
  }
}