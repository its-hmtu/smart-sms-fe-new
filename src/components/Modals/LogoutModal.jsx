import React from "react";
import { CircleAlert } from "lucide-react";
import { Button, Flex } from "antd";
import useUser from "@/features/user/useUser";
import AppModal from "../AppModal";

function LogoutModal({ openModal, setOpenModal }) {
  const { logout } = useUser();
  return (
    <AppModal
      open={openModal}
      onOk={logout}
      onCancel={() => setOpenModal(false)}
      okText='Sign out'
      cancelText='Cancel'
      footer={false}
    >
      <Flex align="center" vertical gap={16}>
        <CircleAlert color='#ff4d4f' size={48} />
        <h1 style={{
        }}>Sign out</h1>
        <p>Are you sure you want to sign out?</p>
      </Flex>

      <Flex align='center' justify='space-between' gap={10} style={{
        marginTop: 16
      }}>
        <Button
          onClick={() => setOpenModal(false)}
          className='flex-[50%] h-[40px] font-semibold'
          type='text'
          style={{
            height: 40,
            flexBasis: "50%",
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={logout}
          color='danger'
          variant='solid'
          className='flex-[50%] h-[40px] font-semibold'
          style={{
            height: 40,
            flexBasis: "50%",
            fontWeight: 500,
          }}
        >
          Sign out
        </Button>
      </Flex>
    </AppModal>
  );
}

export default LogoutModal;
