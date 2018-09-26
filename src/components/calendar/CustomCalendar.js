import React, { Component } from 'react'
import flatpickr from "flatpickr";
import { PropTypes } from 'prop-types';

class CustomCalendar extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  componentDidMount() {
    flatpickr(".flatpickr", { wrap: true, mode: "range", appendTo: document.querySelector(".flatpickr"), onClose: this.onClose })
  }

  onClose = (value) => {
    this.props.onClose(value)
  }

  render() {
    return (
      <div className="flatpickr">
        <input type="hidden" placeholder="Select Date.." data-input className="hidden"/>
        { this.props.children }
      </div>
    )
  }
}

export default CustomCalendar