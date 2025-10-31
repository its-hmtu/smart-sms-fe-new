import { Divider, Flex } from 'antd';
import dayjs from 'dayjs'
import React, { use, useEffect, useState } from 'react'

const CURRENT_TIME = dayjs().format('HH:mm:ss');
const CURRENT_DATE = dayjs().format('DD/MM/YYYY');
const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(CURRENT_TIME);
  const [currentDate, setCurrentDate] = useState(CURRENT_DATE);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
      setCurrentDate(dayjs().format('DD/MM/YYYY'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Flex gap={4} align='center'>
      <div>{currentDate}</div>
      <Divider type='vertical' />
      <div>{currentTime}</div>
    </Flex>
    
  )
}

export default CurrentTime;