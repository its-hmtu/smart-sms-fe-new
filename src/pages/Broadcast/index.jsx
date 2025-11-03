import AppDatePicker from "@/components/AppDatePicker";
import AppSearch from "@/components/AppSearch";
import AppSelect from "@/components/AppSelect";
import AppTable from "@/components/AppTable";
import ContextMenu from "@/components/common/ContextMenu";
import PATH from "@/configs/PATH";
import { Table, Space, Flex, Button, Tooltip, Form, Row, Col, Switch } from "antd";
import {
  CircleGaugeIcon,
  CircleXIcon,
  CopyPlusIcon,
  EyeIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  PlusIcon,
  SheetIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { QueryBoxWrapper } from "@/components/common";
import AppInput from "@/components/AppInput";

const Broadcast = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleToAddCampaign = () => {
    navigate(PATH.CAMPAIGN.ADD_CAMPAIGN);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleApply = () => {
    form.submit();
  };

  const onFinish = (values) => {};

  const contextMenuOptions = [
    {
      label: "New",
      icon: <PlusIcon size={14} />,
      key: "new",
    },
    {
      label: "Test",
      icon: <CircleGaugeIcon size={14} />,
      key: "test",
    },
    {
      label: "Active",
      icon: <PlayIcon size={14} />,
      key: "active",
    },
    {
      label: "Pause",
      icon: <PauseIcon size={14} />,
      key: "pause",
    },
    {
      label: "Cancel",
      icon: <CircleXIcon size={14} />,
      key: "cancel",
    },
    {
      label: "Delete",
      icon: <Trash2Icon size={14} />,
      key: "delete",
      danger: true,
    },
  ];

  const selectTypeOptions = [
    {
      label: "Active",
      value: "active",
    },
  ];

  const selectStatusOptions = [
    {
      label: "Active",
      value: "active",
    },
  ];

  const columns = [
    {
      title: "No.",
      key: "no",
    },
    {
      title: "List Name",
      key: "list_name",
      dataIndex: "list_name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Total Subscribers",
      key: "total_sub",
      dataIndex: "total_sub",
    },
    {
      title: "Date Upload",
      key: "date_upload",
      dataIndex: "date_upload",
    },
    {
      title: "User Upload",
      key: "user_upload",
      dataIndex: "user_upload",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Flex gap={6} align='center' justify='center'>
            <Tooltip title='View Details'>
              <Switch />
            </Tooltip>
            <Tooltip title='Edit'>
              <Button type='text' icon={<PencilIcon size={16} />} />
            </Tooltip>
            <Tooltip title='Delete'>
              <Button variant='text' color="danger" icon={<Trash2Icon size={16} />} />
            </Tooltip>
            <Tooltip title='Export Excel'>
              <Button type="text" icon={<SheetIcon size={16} />} />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  return (
    <Space direction='vertical' style={{ width: "100%" }}>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <QueryBoxWrapper justify='space-between' align='flex-end'>
          <Row
            style={{
              width: "100%",
              flexWrap: "nowrap",
            }}
            gutter={[8, 8]}
          >
            <Col span={6}>
              <AppSearch
                label='Search Campaign'
                name='campaign'
                placeholder='Search Campaign'
                noStyle
              />
            </Col>
            <Col span={6}>
              <AppDatePicker
                label='Created Date'
                name='created_date'
                placeholder='Created Date'
                noStyle
              />
            </Col>
            <Col span={6}>
              <AppInput
                label='User Upload'
                name='user_upload'
                placeholder='User Upload'
                noStyle
              />
            </Col>
          </Row>

          <Flex align='center' justify='end' gap={8}>
            <Button type='primary' htmlType='submit' onClick={handleApply}>
              Apply
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Flex>
        </QueryBoxWrapper>
      </Form>
      <Flex align='center' justify='flex-end'>
        <Button
          type='primary'
          icon={<PlusIcon size={14} />}
          onClick={handleToAddCampaign}
        >
          Add List
        </Button>
      </Flex>
      <AppTable
        columns={columns}
        dataSource={[
          {
            id: 1,
            no: 1,
            campaign: "123",
          },
        ]}
      />
    </Space>
  );
};

export default Broadcast;
