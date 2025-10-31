import React from 'react'
import { DatePicker, Form } from 'antd'

function AppRangePicker(
  {
    name,
    label,
    rules,
    initialValue,
    children,
    value,
    onChange,
    onCalendarChange,
    style,
    ...restProps
  }
) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={initialValue}
      style={style}
      {...restProps}
    >
      {children ? children : 
        (
          <DatePicker.RangePicker
            value={value}
            onChange={onChange}
            onCalendarChange={onCalendarChange}
            style={{ width: '100%' }}
          />
        )
      } 
    </Form.Item>
  )
}

export default AppRangePicker