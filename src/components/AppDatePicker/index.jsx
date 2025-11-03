import React from 'react'
import { DatePicker, Form } from 'antd'

const AppDatePicker = ({
  required = false,
  label = 'Date',
  name = 'date',
  rules = [],
  placeholder = 'Select date',
  onChange,
  props,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      required={required}
    >
      <DatePicker
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: '100%' }}
        {...props}
      />
    </Form.Item>
  )
}

export default AppDatePicker