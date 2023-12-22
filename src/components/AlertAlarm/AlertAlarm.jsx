import React from 'react'
import { Alert } from 'antd'

export default function AlertAlarm({ errorState, setError }) {
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
