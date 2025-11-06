import AppDatePicker from "@/components/AppDatePicker";
import AppSearch from "@/components/AppSearch";
import AppSelect from "@/components/AppSelect";
import AppTable from "@/components/AppTable";
import ContextMenu from "@/components/common/ContextMenu";
import PATH from "@/configs/PATH";
import { Table, Space, Flex, Button, Tooltip, Form, Row, Col } from "antd";
import {
  CircleGaugeIcon,
  CircleXIcon,
  CopyPlusIcon,
  EyeIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { QueryBoxWrapper } from "@/components/common";
import { useQuery } from "@tanstack/react-query";
import CampaignService from "@/features/campaign/campaignService";

const Campaigns = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['campaigns', pageSize, currentPage],
    queryFn: () => {
      return CampaignService.getCampaign({
        perPage: pageSize,
        page: currentPage,
      });
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log("Campaign data:", data);

  const handleToAddCampaign = () => {
    navigate(PATH.CAMPAIGN.CREATE_CAMPAIGN);
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
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Campaign",
      key: "campaign",
      dataIndex: "campaign",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Created Date",
      key: "created_date",
      dataIndex: "created_date",
    },
    {
      title: "Start Time",
      key: "start_time",
      dataIndex: "start_time",
    },
    {
      title: "End Time",
      key: "end_time",
      dataIndex: "end_time",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Flex gap={6} align='center' justify='center'>
            <Tooltip title='View Details'>
              <Button type='text' icon={<EyeIcon size={16} />} />
            </Tooltip>
            <Tooltip title='Duplicate'>
              <Button type='text' icon={<CopyPlusIcon size={16} />} />
            </Tooltip>
            <Tooltip title='Edit'>
              <Button type='text' icon={<PencilIcon size={16} />} />
            </Tooltip>
            <ContextMenu options={contextMenuOptions} />
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
            <Col span={4}>
              <AppSearch
                label='Search Campaign'
                name='campaign'
                placeholder='Search Campaign'
                formStyle={{
                  marginBottom: 0
                }}
              />
            </Col>
            <Col span={4}>
              <AppDatePicker
                label='Created Date'
                name='created_date'
                placeholder='Created Date'
                formStyle={{
                  marginBottom: 0,
                }}
              />
            </Col>
            <Col span={4}>
              <AppDatePicker
                label='Created Date'
                name='created_date'
                placeholder='Created Date'
                formStyle={{
                  marginBottom: 0,
                }}
              />
            </Col>
            <Col span={4}>
              <AppSelect
                label='Select Type'
                name='type'
                placeholder='Select Type'
                options={selectTypeOptions}
                formStyle={{
                  marginBottom: 0,
                }}
              />
            </Col>
            <Col span={4}>
              <AppSelect
                label='Select Status'
                name='status'
                placeholder='Select Status'
                options={selectStatusOptions}
                formStyle={{
                  marginBottom: 0,
                }}
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
          Add Campaign
        </Button>
      </Flex>
      <AppTable
        columns={columns}
        dataSource={[
          
        ]}
        pagination={
          {
            pageSize: pageSize,
            current: currentPage,
            total: data?.count || 0,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }
          }
        }
      />
    </Space>
  );
};

export default Campaigns;
