import React from "react";
import { Form, Select } from "antd";

const AppSelect = ({
  required = false,
  label = "Select",
  name = "select",
  rules = [],
  placeholder = "Please select",
  multiple = false,
  onChange,
  onSearch,
  showSearch = false,
  options = [],
  formStyle = {},
  ...props
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={rules}
      style={formStyle}
    >
      <Select
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        onSearch={onSearch}
        showSearch={showSearch}
        mode={multiple ? "multiple" : undefined}
        style={{ width: "100%" }}
        {...props}
      />
    </Form.Item>
  );
};

export default AppSelect;
