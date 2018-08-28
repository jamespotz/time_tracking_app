import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class SubmitButton extends PureComponent {
  static propTypes = {
    classNames: PropTypes.string,
    name: PropTypes.string.isRequired
  }

  static defaultProps = {
    classNames: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl',
    name: 'Button'
  }

  render() {
    const { classNames, name } = this.props
    return (
      <button type="submit" className={classNames}>
        { name }
      </button>
    )
  }
}