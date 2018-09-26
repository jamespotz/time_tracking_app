import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'

const SpanDateTime = (props) => {
  if (props.isEditing) {
    return  <div className="date-picker">
              <Flatpickr data-enable-time
                  value={moment(props.startDate).toDate()}
                  onChange={props.onChange}
                  options={{
                    dateFormat: "h:i K"
                  }}
              />
            </div>
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
