import React from 'react'

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
         <label htmlFor={name}>{ labelText || name }</label>
        <input id={name} type={type} value={value} name={name} onChange={handleChange} placeholder={name} className="form-input" />
    </div>
  )
}

export default FormRow