import AppInput from '@/components/AppInput'
import AppModal from '@/components/AppModal'
import { Form } from 'antd'
import React from 'react'

const AddTestListModal = ({
  open,
  setOpen,
  onOk,
  onCancel,
}) => {
  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      title="Add Test Number"
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form>
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