import React from 'react'
import AppModal from '../AppModal'

const DeleteModal = ({
  open,
  setOpen,
  onOk,
  title = 'Delete Item',
  content = 'Are you sure you want to delete this item?',
}) => {
  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      title={title}
      onOk={() => {
        onOk();
      }}
      onCancel={() => {
        setOpen({
          open: false,
          record: null,
        });
      }}
      okButtonProps={{
        danger: true,
      }}
    >
      <p>{content}</p>
    </AppModal>
  )
}

export default DeleteModal