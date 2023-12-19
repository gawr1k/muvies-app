import React from 'react';
import { Alert } from 'antd';

export default function AlertAlarm() {
  return (
    <Alert message={`Error: ${error}`} type="error" showIcon />
  );
}
