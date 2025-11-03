import AppChart from "@/components/AppChart";
import AppRangePicker from "@/components/AppRangePicker";
import { dataCampaignsByType, dataDailyMessageVolume, dataTodayStats } from "@/utils/mockData";
import { Card, Divider, Flex, Space, Statistic } from "antd";
import React from "react";
import {
  Line,
  Bar,
} from "recharts";
import styled from "styled-components";


const dailyMessageVolumnChartMetrics = [
  {
    key: "sent_message",
    label: "Sent Message",
    type: "line",
    color: "#8884d8",
  },
  {
    key: "delivered",
    label: "Delivered",
    type: "line",
    color: "#82ca9d",
  },
  {
    key: "interacted",
    label: "Interacted",
    type: "line",
    color: "#ffc658",
  },
];

const campaignsByTypeChartMetrics = [
  {
    key: "text_request",
    label: "Text Request",
    type: "bar",
    color: "#8884d8",
  },
  {
    key: "menu_request",
    label: "Menu Request",
    type: "bar",
    color: "#82ca9d",
  },
  {
    key: "url_request",
    label: "URL Request",
    type: "bar",
    color: "#ffc658",
  },
  {
    key: "call_request",
    label: "Call Request",
    type: "bar",
    color: "#ff7300",
  },
  {
    key: "ussd",
    label: "USSD",
    type: "bar",
    color: "#387908",
  },
];

const Overview = React.memo(() => {
  const [
    visibleDailyMessageVolumnChartMetrics,
    setVisibleDailyMessageVolumnChartMetrics,
  ] = React.useState(() => 
    dailyMessageVolumnChartMetrics.map((metric) => metric.key)
  );

  const [
    visibleCampaignsByTypeChartMetrics,
    setVisibleCampaignsByTypeChartMetrics,
  ] = React.useState(() => 
    campaignsByTypeChartMetrics.map((metric) => metric.key)
  );

  return (
    <Space direction='vertical' style={{ width: "100%" }}>
      <Section>
        <h3 className='section-title'>Today</h3>
        <Flex gap={12}>
          {dataTodayStats.map((stat) => (
            <Card
              key={stat.title}
              variant='borderless'
              style={{
                flex: 1,
              }}
            >
              <Statistic title={stat.title} value={stat.value} />
            </Card>
          ))}
        </Flex>
      </Section>
      <Divider />

      <Section>
        <Flex justify='space-between' align='center' className='section-title'>
          <h3>Daily Message Volume Chart</h3>
          <AppRangePicker style={{ margin: 0 }} />
        </Flex>
        <ChartWrapper>
          <AppChart
            dataSource={dataDailyMessageVolume}
            chartType='line'
            visibleMetrics={visibleDailyMessageVolumnChartMetrics}
            setVisibleMetrics={setVisibleDailyMessageVolumnChartMetrics}
            chartMetrics={dailyMessageVolumnChartMetrics}
            xAxis={"date"}
          >
            {
              dailyMessageVolumnChartMetrics.map((metric) => {
                if (!visibleDailyMessageVolumnChartMetrics.includes(metric.key))
                  return null;
                if (metric.type === "line") {
                  return (
                    <Line
                      key={metric.key}
                      type='linear'
                      dataKey={metric.key}
                      stroke={metric.color}
                    />
                  );
                }

                return null;
              })
            }
          </AppChart>
        </ChartWrapper>
      </Section>
      <Divider />

      <Section>
        <Flex justify='space-between' align='center' className='section-title'>
          <h3>Campaigns by Type</h3>
          <AppRangePicker style={{ margin: 0 }} />
        </Flex>
        <ChartWrapper>
          <AppChart
            chartType='bar'
            dataSource={dataCampaignsByType}
            visibleMetrics={visibleCampaignsByTypeChartMetrics}
            setVisibleMetrics={setVisibleCampaignsByTypeChartMetrics}
            chartMetrics={campaignsByTypeChartMetrics}
            xAxis={"date"}
          >
            {
              campaignsByTypeChartMetrics.map((metric) => {
                if (!visibleCampaignsByTypeChartMetrics.includes(metric.key))
                  return null;
                if (metric.type === "bar") {
                  return (
                    <Bar
                      key={metric.key}
                      dataKey={metric.key}
                      fill={metric.color}
                    />
                  );
                }

                return null;
              })
            }
          </AppChart>
        </ChartWrapper>
      </Section>
    </Space>
  );
});

export default Overview;

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const Section = styled.section`
  .section-title {
    margin-bottom: 24px;
  }
`;
