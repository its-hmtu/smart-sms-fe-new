import AppTable from "@/components/AppTable";
import PATH from "@/configs/PATH";
import CampaignService from "@/features/campaign/campaignService";
import useCampaign from "@/features/campaign/useCampaign";
import { useQuery } from "@tanstack/react-query";
import { App, Button, Card, Descriptions, Flex, Space } from "antd";
import dayjs from "dayjs";
import { countBy, isArray, keyBy } from "lodash";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
const columns = [
  {
    title: "No.",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
];

const CampaignDetails = () => {
  const location = useLocation();
  const { record } = location.state || {};
  // const campaignData = campaign.stepData.step1 || {};
  const {
    data: subscriberList,
    isLoading: isLoadingSubscriberList,
    refetch: refetchSubscriberList,
  } = useQuery({
    queryKey: ["subscriberList"],
    queryFn: CampaignService.getSubscriberGroup,
  });
  const navigate = useNavigate();
  console.log(record)

  const thisSubscriberListById = useMemo(() => {
    if (!isArray(subscriberList) || !subscriberList) {
      return {};
    }

    return (
      subscriberList?.filter(
        (item) => item.id === record.SUB_GROUP_ID
      )[0] || { subscribers: [] }
    );
  });

  const mapCampaignData = useMemo(() => {
    const parsedData = JSON.parse(record.DATA || {});

    return {
      name: record.NAME,
      type: record.TYPE,
      ...parsedData,
    };
  }, []);

  const mapItemCampaignData = useMemo(() => {
    const parsedData = JSON.parse(record.DATA || {});
    if (parsedData.items && isArray(parsedData.items)) {
      return parsedData.items;
    }
    return null;
  }, []);

  return (
    <>
      <Space
        direction='vertical'
        style={{
          width: "100%",
        }}
      >
        <Card title='Campaign Details'>
          <Descriptions column={2}>
            {Object.entries(mapCampaignData).map(([key, value]) => {
              if (key === "items") {
                return null;
              }

              return (
                <Descriptions.Item
                  label={key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  key={key}
                >
                  {value || "N/A"}
                </Descriptions.Item>
              );
            })}
          </Descriptions>

          {mapItemCampaignData && (
            <Flex
              vertical
              style={{
                width: "100%",
                marginTop: 24,
              }}
            >
              <h4>Items:</h4>
              <AppTable
                columns={[
                  {
                    title: "No.",
                    render: (text, record, index) => index + 1,
                  },
                  {
                    title: "Item Name",
                    dataIndex: "item_name",
                    key: "item_name",
                  },
                  {
                    title: "MO",
                    dataIndex: "mo",
                    key: "mo",
                  },
                  {
                    title: "Short Code",
                    dataIndex: "short_code",
                    key: "short_code",
                  },
                ]}
                dataSource={mapItemCampaignData}
                pagination={null}
              />
            </Flex>
          )}
        </Card>
        <Flex gap={16} justify='space-between'>
          <Card
            title={`
            Subscriber List: ${thisSubscriberListById.group_name}
          `}
          >
            <Descriptions column={1}>
              <Descriptions.Item label='Total Subscribers'>
                {thisSubscriberListById.total_subscriber || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label='Last Updated'>
                {dayjs(thisSubscriberListById.last_update).format('DD/MM/YYYY HH:mm A') || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title='Spam Settings'>
            <Descriptions column={1}>
              <Descriptions.Item label='Repeat Display (non-interactive)'>
                {record.MAX_SHOW_LIMIT || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label='Daily Message Limit per Subscriber'>
                {record.DAILY_MESSAGE_LIMIT || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Flex>
        <Card
          title={`Test Numbers (${record.TEST_NUMBERS?.length || 0} numbers)`}
        >
          <AppTable
            columns={columns}
            dataSource={record.TEST_NUMBERS?.map((item) => {
              return {
                phone_number: item,
              };
            })}
            pagination={null}
          ></AppTable>
        </Card>
        <Card title='Time Settings'>
          <Descriptions column={2}>
            <Descriptions.Item label='Start Date' span={1}>
              {dayjs(record.START_TIME).format("DD/MM/YYYY") || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label='Start With' span={2}>
              {dayjs(record.START_TIME).format("HH:mm A") || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label='End Date' span={1}>
              {dayjs(record.END_TIME).format("DD/MM/YYYY") || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label='End With' span={2}>
              {dayjs(record.END_TIME).format("HH:mm A") || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label='Time Slots' span='filled'>
              {JSON.parse(record.TIME_SLOT)?.map((slot, index) => {
                return <Tag key={index}>{slot}</Tag>;
              }) || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </>
  );
};

export default CampaignDetails;

const Tag = styled.span`
  display: inline-block;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
`;
