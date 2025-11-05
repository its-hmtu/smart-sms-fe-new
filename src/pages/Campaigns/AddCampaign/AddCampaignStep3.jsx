import { Card, Descriptions, List, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const AddCampaignStep3 = ({ form, initialData, allStepData }) => {
  const step1Data = allStepData?.step1 || {};
  const step2Data = allStepData?.step2 || {};

  return (
    <div>
      <Title level={3}>Campaign Summary</Title>
      
      <Card title="Step 1: Campaign Information" style={{ marginBottom: 16 }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Campaign Name">
            {step1Data.campaignName || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Campaign Type">
            {step1Data.campaignType || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {step1Data.startDate || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            {step1Data.endDate || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Message" span={2}>
            {step1Data.message || 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Step 2: Test Numbers">
        <List
          dataSource={step2Data.testNumbers || []}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.phone_number}</Typography.Text>
            </List.Item>
          )}
          locale={{ emptyText: 'No test numbers added' }}
        />
      </Card>
    </div>
  );
};

export default AddCampaignStep3;
