import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class SubmitButton extends PureComponent {
  static propTypes = {
    classNames: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    classNames: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl',
    name: 'Button',
    type: 'submit'
  }

  render() {
    const { classNames, name, type, onClick } = this.props
    return (
      <button type={type} className={classNames} onClick={onClick}>
        { name }
      </button>
    )
  }
}