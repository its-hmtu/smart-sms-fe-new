import { Button, Form, Upload } from 'antd'
import { UploadIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'

const AppUpload = (
  {
    formName,
    label,
    required = false,
    rules = [],
    name = 'upload',
    action,
    headers = {},
    onChange,
    noStyle = false,
    icon,
    title,
  }
) => {
  const onChangeUpload = (info) => {
    if (onChange) {
      onChange(info)
    } else {
      if (info.file.status === 'done') {
        toast.info(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload failed.`)
      }
    }
  }
  return (
    <Form.Item name={formName} label={label} required={required} rules={rules} noStyle={noStyle}>
      <Upload
        name={name}
        action={action}
        headers={headers}
        onChange={onChangeUpload}
      >
        <Button icon={icon ? icon : <UploadIcon size={14} />}>{title ? title : 'Click to Upload'}</Button>
      </Upload>
    </Form.Item>
  )
}

export default AppUpload