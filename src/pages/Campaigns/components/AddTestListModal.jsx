import AppInput from '@/components/AppInput'
import AppModal from '@/components/AppModal'
import { Form } from 'antd'
import React, { useEffect } from 'react'

const AddTestListModal = ({
  open,
  setOpen,
  onOk,
}) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    setOpen({
      open: false,
      record: null,
    });
    form.resetFields();
  }

  const handleOk = () => {
    form.submit();
  }

  useEffect(() => {
    if (open.record) {
      form.setFieldValue('phone_number', open.record.phone_number);
    }
  }, [open.record, form]);

  return (
    <AppModal
      open={open.open}
      setOpen={setOpen}
      title="Add Test Number"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={(values) => {
          if (open.record) {
            onOk(values, true);
          } else {
            onOk(values, false);
          }
          form.resetFields();
          setOpen(false);
        }}
      >
        <AppInput
          label='Phone Number'
          name='phone_number'
          placeholder='Phone Number'
          required
          rules={[
            {
              required: true,
              message: 'Please enter phone number'
            },
            {
              // validate phone number format, start with the number 9 and has 9 digits total
              pattern: /^9\d{8}$/,
              message: 'Phone number must start with 9 and be 9 digits long'
            }
          ]}
        />
      </Form>
    </AppModal>
  )
}

export default AddTestListModal