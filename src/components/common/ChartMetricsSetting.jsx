import { SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const ChartMetricsSetting = ({
  chartMetrics,
  disabled = false,
  tooltip = 'Chart Metrics Settings',
  visibleMetrics,
  setVisibleMetrics,
}) => {
  const [openMetricsSettings, setOpenMetricsSettings] = useState(false);

  const handleMetricsVisibilityChange = (checkedMetrics) => {
    setVisibleMetrics(checkedMetrics);
  };

  const metricsMenu = (
    <MetricsMenu>
      <Checkbox.Group
        options={chartMetrics.map((metric) => ({
          label: metric.label,
          value: metric.key,
        }))}
        value={visibleMetrics}
        onChange={handleMetricsVisibilityChange}
        className="flex flex-col gap-2"
      />
    </MetricsMenu>
  );

  return (
    <Tooltip title={tooltip}>
      <Dropdown
        open={openMetricsSettings}
        onOpenChange={setOpenMetricsSettings}
        trigger={['click']}
        popupRender={() => metricsMenu}
        arrow
        autoAdjustOverflow
      >
        <Button
          type="text"
          onClick={() => setOpenMetricsSettings(!openMetricsSettings)}
          disabled={disabled}
          icon={<SettingOutlined />}
          className="flex items-center gap-1"
        ></Button>
      </Dropdown>
    </Tooltip>
  );
};

export default ChartMetricsSetting;

const MetricsMenu = styled.div`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  width: 220px;

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`
