import React from "react";
import { DatePicker, Form } from "antd";

const AppDatePicker = ({
  required = false,
  label = "Date",
  name = "date",
  rules = [],
  showTime = false,
  placeholder = "Select date",
  onChange,
  isTimePicker = false,
  showSecond = false,
  noStyle = false,
  formStyle = {},
  ...props
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules} required={required} noStyle={noStyle} style={formStyle}>
      {isTimePicker ? (
        <DatePicker.TimePicker
          placeholder={placeholder}
          onChange={onChange}
          style={{ width: "100%" }}
          showSecond={showSecond}
          {...props}
        />
      ) : (
        <DatePicker
          showTime={showTime}
          placeholder={placeholder}
          onChange={onChange}
          style={{ width: "100%" }}
          {...props}
        />
      )}
    </Form.Item>
  );
};

export default AppDatePicker;
