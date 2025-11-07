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
import { useMutation, useQuery } from "@tanstack/react-query";
import CampaignService from "@/features/campaign/campaignService";
import dayjs from "dayjs";
import { CAMPAIGN_STATUS, REQUEST_TYPE } from "@/configs/const";
import useUser from "@/features/user/useUser";
import { toast } from "react-toastify";

const Campaigns = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useUser();
  const [openDetail, setOpenDetail] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [queryParams, setQueryParams] = React.useState({
    cp_name: null,
    start_date: null,
    end_date: null,
    type: null,
    status: null,
  });
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["campaigns", pageSize, currentPage, queryParams],
    queryFn: () => {
      return CampaignService.getCampaign({
        perPage: pageSize,
        page: currentPage,
        ...queryParams,
      });
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const duplicateMutation = useMutation({
    mutationFn: CampaignService.duplicatieCampaign,
  })

  const handleToAddCampaign = () => {
    navigate(PATH.CAMPAIGN.CREATE_CAMPAIGN);
  };

  const handleToCampaignDetails = (record) => {
    navigate(PATH.CAMPAIGN.CAMPAIGN_DETAILS.replace(':id', record.ID), {
      state: { record }
    });
  }

  const handleDuplicateCampaign = async (record) => {
    await duplicateMutation.mutateAsync({ id: record.ID, user_create: user.userInfo.id }, {
      onSuccess: (data) => {
        toast.success("Campaign duplicated successfully!");
      },
      onError: (error) => {
        toast.error("Failed to duplicate campaign.");
      }
    }).then(() => {
      handleReset();
      refetch();
    })
  };

  const handleReset = () => {
    form.resetFields();
    setQueryParams({
      cp_name: null,
      start_date: null,
      end_date: null,
      type: null,
      status: null,
    });
  };

  const handleApply = () => {
    form.submit();
  };

  const onFinish = (values) => {
    const { cp_name, start_date, end_date, type, status } = values;
    setQueryParams({
      cp_name: cp_name || null,
      start_date:
        start_date && dayjs(start_date).isValid()
          ? dayjs(start_date).format("YYYY-MM-DD")
          : null,
      end_date:
        end_date && dayjs(end_date).isValid()
          ? dayjs(end_date).format("YYYY-MM-DD")
          : null,
      type: type || null,
      status: status || null,
    });
  };

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

  const renderContextMenuOptions = (record) => {
    // add disable: true for record STATUS based on condition
    if (record.STATUS === parseInt(CAMPAIGN_STATUS.NEW)) {
      return contextMenuOptions.map((option) => {
        if (option.key === "new") {
          return { ...option, disabled: true };
        }
        return option;
      });
    }

    if (record.STATUS === parseInt(CAMPAIGN_STATUS.TEST)) {
      return contextMenuOptions.map((option) => {
        if (option.key === "test" || option.key === "new") {
          return { ...option, disabled: true };
        }
        return option;
      });
    }

    return contextMenuOptions;
  }

  const selectTypeOptions = [
    {
      label: "All",
      value: null,
    },
    ...Object.values(REQUEST_TYPE).map((type) => ({
      label: type,
      value: type,
    })),
  ];

  const selectStatusOptions = [
    {
      label: "All",
      value: null,
    },
    ...Object.entries(CAMPAIGN_STATUS).map(([key, value]) => ({
      label: key,
      value: value,
    })),
  ];

  const columns = [
    {
      title: "No.",
      key: "no",
      dataIndex: "RN"
    },
    {
      title: "ID",
      key: "id",
      dataIndex: "ID",
    },
    {
      title: "Campaign",
      key: "campaign",
      dataIndex: "NAME",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "TYPE",
    },
    {
      title: "Created Date",
      key: "created_date",
      dataIndex: "CREATED_AT",
    },
    {
      title: "Start Time",
      key: "start_time",
      dataIndex: "START_TIME",
    },
    {
      title: "End Time",
      key: "end_time",
      dataIndex: "END_TIME",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "STATUS",
      render: (text) => {
        const statusEntry = Object.entries(CAMPAIGN_STATUS).find(
          ([, value]) => parseInt(value) === text
        );
        const statusLabel = statusEntry ? statusEntry[0] : "UNKNOWN";
        return statusLabel;
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (record) => {
        return (
          <Flex gap={6} align='center' justify='center'>
            <Tooltip title='View Details'>
              <Button
                type='text'
                icon={<EyeIcon size={16} />}
                onClick={() => handleToCampaignDetails(record)}
              />
            </Tooltip>
            <Tooltip title='Duplicate'>
              <Button type='text' icon={<CopyPlusIcon size={16} />} onClick={() => handleDuplicateCampaign(record)} />
            </Tooltip>
            <Tooltip title='Edit'>
              <Button type='text' icon={<PencilIcon size={16} />} />
            </Tooltip>
            <ContextMenu options={renderContextMenuOptions(record)} />
          </Flex>
        );
      },
    },
  ];

  return (
    <>
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
                  name='cp_name'
                  placeholder='Search Campaign'
                  formStyle={{
                    marginBottom: 0,
                  }}
                />
              </Col>
              <Col span={4}>
                <AppDatePicker
                  label='Start Date'
                  name='start_date'
                  placeholder='Start Date'
                  formStyle={{
                    marginBottom: 0,
                  }}
                />
              </Col>
              <Col span={4}>
                <AppDatePicker
                  label='End Date'
                  name='end_date'
                  placeholder='End Date'
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
          dataSource={data?.rows || []}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: data?.count || 0,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
          loading={isLoading}
        />
      </Space>
    </>
  );
};

export default Campaigns;
