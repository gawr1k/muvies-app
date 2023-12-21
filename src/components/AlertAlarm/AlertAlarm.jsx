import React from 'react'
import { Alert } from 'antd'

import UIContext from '../../context/UIContext'

export default function AlertAlarm() {
  const { errorState, setError } = React.useContext(UIContext)
  return (
    <Alert
      message={`Error: ${errorState}`}
      type="error"
      showIcon
      closable
      onChange={() => {
        setError(null)
      }}
    />
  )
}
