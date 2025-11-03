import React from "react";
import { Form, Select } from "antd";

const AppSelect = ({
  required = false,
  label = "Select",
  name = "select",
  rules = [],
  placeholder = "Please select",
  onChange,
  options = [],
  props,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={rules}
    >
      <Select
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        style={{ width: "100%" }}
        {...props}
      />
    </Form.Item>
  );
};

export default AppSelect;
