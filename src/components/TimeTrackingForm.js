import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const TimeTrackingForm = (props) => (
  <form className="shadow py-4 px-2" onSubmit={props.submitForm}>
    <div className="flex justify-between">
      <div className="w-5/6">
        <input 
        type="text" name="description" placeholder="What are you working on?" className="appearance-none block w-full bg-white text-grey-darker py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:text-teal text-2xl" autocomplete="off"/>
      </div>
      <div className="my-1">
        <button type="submit" className="bg-teal hover:bg-teal-dark text-white font-bold py-3 px-4 rounded-full text-xl">
          Clock In
        </button>
      </div>
    </div>
  </form>
)

TimeTrackingForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  text: PropTypes.string,
  time: PropTypes.number
}

TimeTrackingForm.defaultProps = {
  text: '',
  time: moment()
}

export default TimeTrackingForm
