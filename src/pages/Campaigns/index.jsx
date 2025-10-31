import AppTable from '@/components/AppTable'
import { Table, Space } from 'antd'
import React from 'react'

const columns = [
  {
    title: 'No.',
    key: 'no',
  },
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Campaign',
    key: 'campaign',
    dataIndex: 'campaign',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'Created Date',
    key: 'created_date',
    dataIndex: 'created_date',
  },
  {
    title: 'Start Time',
    key: 'start_time',
    dataIndex: 'start_time',
  },
  {
    title: 'End Time',
    key: 'end_time',
    dataIndex: 'end_time',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
  }
]

const Campaigns = () => {
  return (
    <Space direction='vertical' style={{ width: "100%" }}>
      <AppTable
        columns={columns}
      />
    </Space>
  )
}

export default Campaigns