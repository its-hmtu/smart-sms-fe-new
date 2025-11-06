import CurrentTime from '@/components/common/CurrentTime'
import useUser from '@/features/user/useUser'
import { Avatar, Flex } from 'antd'
import React from 'react'

const Header = () => {
  const { user } = useUser();
  return (
    <Flex justify='space-between' align='center'>
      <CurrentTime />
      <Flex align='center' gap={8}>
        <Avatar>{user?.userInfo?.username?.charAt(0)}</Avatar>
        <span>{user?.userInfo?.username || 'Admin'}</span>
      </Flex>
    </Flex>
  )
}

export default Header