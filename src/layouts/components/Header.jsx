import CurrentTime from '@/components/common/CurrentTime'
import LogoutModal from '@/components/Modals/LogoutModal'
import useUser from '@/features/user/useUser'
import { Avatar, Button, Flex } from 'antd'
import { LogOutIcon } from 'lucide-react'
import React from 'react'

const Header = () => {
  const { user } = useUser();
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <Flex justify='space-between' align='center'>
      <CurrentTime />
      <Flex align='center' gap={8}>
        <Avatar>{user?.userInfo?.username?.charAt(0)}</Avatar>
        <span>{user?.userInfo?.username || 'Admin'}</span>
        <Button type='text' icon={<LogOutIcon size={14} />} onClick={() => setOpenModal(true)}></Button>
        <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />
      </Flex>
    </Flex>
  )
}

export default Header