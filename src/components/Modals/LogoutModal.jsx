import React from 'react';
import { CircleAlert } from 'lucide-react';
import { Button, Flex } from 'antd';
import useUser from '@/features/user/useUser';
import AppModal from '../AppModal';

function LogoutModal({ openModal, setOpenModal }) {
  const { logout } = useUser();
  return (
    <AppModal
      open={openModal}
      onOk={logout}
      onCancel={() => setOpenModal(false)}
      okText="Sign out"
      cancelText="Cancel"
      footer={false}
    >
      <div className="">
        <CircleAlert color="#ff4d4f" size={48} />
        <h1 className="font-bold text-3xl">Sign out</h1>
        <p>Are you sure you want to sign out?</p>
      </div>

      <Flex align="center" justify="space-between" gap={10}>
        <Button
          onClick={() => setOpenModal(false)}
          className="flex-[50%] h-[40px] font-semibold"
          type="text"
        >
          Cancel
        </Button>
        <Button
          onClick={logout}
          color="danger"
          variant="solid"
          className="flex-[50%] h-[40px] font-semibold"
        >
          Sign out
        </Button>
      </Flex>
    </AppModal>
  );
}

export default LogoutModal;
