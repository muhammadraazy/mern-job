import React from 'react'

const FormRowSelect = ({ labelText, name, value, handleChange, lists }) => {
  return (
    <div className="form-row">
    <label htmlFor="jobType" className="form-label">
        { labelText || name }
    </label>
    <select name={name} value={value} onChange={handleChange} id={name} className="form-select">
        { lists?.map((item, index) => (
              <option key={index} value={item}> { item } </option>
        )) }
    </select>
 </div>
  )
}

export default FormRowSelect