import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import SubmitButton from '../FormFields/SubmitButton'

const TimeLogForm = (props) => (
  <form className="shadow py-4 px-2" onSubmit={props.submitForm}>
    <input type="hidden"
      name="time_in"
      value={props.time_in} 
    />
    <input type="hidden"
      name="time_out"
      value={props.time_out} 
    />
    <div className="flex justify-between">
      <div className="w-4/5">
        <input 
        type="text" 
        name="description" 
        placeholder="What are you working on?" 
        className="appearance-none block w-full bg-white text-grey-darker py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:text-teal text-2xl" 
        autoComplete="off"
        value={props.description} 
        onChange={props.handleChange}/>
      </div>
      <span className="text-grey-dark text-2xl mt-3">{props.currentTime}</span>
      <div className="my-1">
        <SubmitButton name={props.btn_name} classNames={props.btn_class_names} />
      </div>
    </div>
  </form>
)

TimeLogForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  time_in: PropTypes.string,
  time_out: PropTypes.string,
  currentTime: PropTypes.string,
  btn_name: PropTypes.string,
  btn_class_names: PropTypes.string
}

TimeLogForm.defaultProps = {
  description: '',
  time_in: moment().format('x'),
  btn_name: 'Clock In',
  btn_class_names: 'bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl'
}

export default TimeLogForm
