import React from "react";
import { Form, Input } from "antd";

const AppInput = ({
  required = false,
  label = "Input",
  name = "input",
  rules = [],
  placeholder = "Input...",
  onSearch,
  layout = "vertical",
  ...props
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={rules}
      layout={layout}
    >
      <Input placeholder={placeholder} onSearch={onSearch} {...props} />
    </Form.Item>
  );
};

export default AppInput;
