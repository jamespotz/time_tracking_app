import React from 'react'
import { PropTypes } from 'prop-types';

const SpanInput = (props) => {
  if (props.isEditing) {
    return <input 
      type="text" 
      value={props.value} 
      onChange={props.onChange} 
      onBlur={props.onBlur} name={props.name} 
      className="py-1 px-2 border rounded bg-grey-lighter"
    />
  } else {
    return <div className="py-2">{props.value}</div> 
  }
}

SpanInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isEditing: PropTypes.bool.isRequired
}

SpanInput.defaultProps = {
  value: '',
  name: '',
  onChange: (e) => {
    console.log(e.target)
  },
  isEditing: false
}


export default SpanInput