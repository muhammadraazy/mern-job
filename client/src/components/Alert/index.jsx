import React from 'react'
import { useAppContext } from '../../context/appContext'

const Alert = () => {
    const {alertType, alertText} = useAppContext()

  return (
    <div className={`alert alert-${alertType}`}>
      <h4> {alertText} </h4>
    </div>
  )
}

export default Alert