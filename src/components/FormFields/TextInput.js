import React from 'react'
import { PropTypes } from 'prop-types';

const TextInput = ({name, label, onChange, placeholder, value, error, type="text"}) => {
  let wrapperClass = 'form-group mt-2'
  let inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'

  if (error && error.length > 0) {
    inputClass += ' border-red'
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name} className="block text-grey-darker text-sm font-bold mb-2">{label}</label>
      <input 
        type={type}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
      {error && <p className="text-red text-xs italic">{error}</p>}
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput