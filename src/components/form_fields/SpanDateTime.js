import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

const SpanDateTime = (props) => {
  if (props.isEditing) {
    return <DatePicker 
      selected={moment(props.startDate)} 
      onChange={props.onChange}
      timeFormat="hh:mm a"
      showTimeSelect
      dateFormat="hh:mm a"
      className="border rounded py-1 px-2 bg-grey-lighter"
    />
  } else {
    return <div className="py-2">{props.text}</div> 
  }
}

SpanDateTime.propTypes = {
  text: PropTypes.string,
  startDate: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isEditing: PropTypes.bool.isRequired
}

SpanDateTime.defaultProps = {
  text: moment().format('hh:mm a'),
  startDate: moment(),
  onChange: (e) => {
    console.log(e.target)
  },
  isEditing: false
}


export default SpanDateTime
