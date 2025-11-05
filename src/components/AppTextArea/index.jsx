import React from "react";
import { Form, Input } from "antd";

const AppTextArea = ({
  required = false,
  label = "Input",
  name = "input",
  rules = [],
  placeholder = "Input...",
  showCount = false,
  maxLength,
  onSearch,
  ...props
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={rules}
    >
      <Input.TextArea placeholder={placeholder} onSearch={onSearch} {...props} showCount={showCount} maxLength={maxLength}/>
    </Form.Item>
  );
};

export default AppTextArea;
