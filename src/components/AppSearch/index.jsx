import React from "react";
import { Form, Input } from "antd";

const AppSearch = ({
  required = false,
  label = "Search",
  name = "search",
  rules = [],
  placeholder = "Search...",
  onSearch,
  props,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={rules}
    >
      <Input.Search placeholder={placeholder} onSearch={onSearch} {...props} />
    </Form.Item>
  );
};

export default AppSearch;
