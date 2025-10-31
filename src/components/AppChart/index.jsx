import { Flex } from "antd";
import React from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartMetricsSetting from "../common/ChartMetricsSetting";
import { formatLabel, formatNumber } from "@/utils/helper";

const legendWrapperStyle = {
  padding: 16,
  backgroundColor: "#fff",
  width: "fit-content",
  transform: "translateY(-50%)",
  borderRadius: 4,
  border: "1px solid #f0f0f0",
};

const ChartLegend = () => {
  return (
    <Legend
      verticalAlign='top'
      align='left'
      wrapperStyle={legendWrapperStyle}
      formatter={(value) => formatLabel(value)}
    />
  );
};

const ChartTooltip = () => {
  return (
    <Tooltip
      formatter={(value, name) => [formatNumber(value), formatLabel(name)]}
      contentStyle={{
        backgroundColor: "#fff",
        border: "1px solid #f0f0f0",
        borderRadius: 4,
        fontSize: 12,
        padding: 10,
      }}
      labelStyle={{
        fontWeight: 600,
        marginBottom: 4,
      }}
    />
  );
};

const AppChart = ({
  children,
  chartType = "line",
  dataSource = [],
  width = "100%",
  height = "100%",
  chartMetrics = [],
  renderChart,
  loading = false,
  tooltip = "Chart Metrics Settings",
  visibleMetrics,
  setVisibleMetrics,
  xAxis = "name",
  ...restProps
}) => {
  const renderChartByType = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart data={dataSource}>
            <CartesianGrid strokeDasharray='3 3' />
            <ChartTooltip />
            <ChartLegend />
            <XAxis dataKey={xAxis} />
            <YAxis />
            {React.Children.toArray(children)
              .filter(Boolean)
              .map((child) => {
                if (!child || !child.props) return null;
                return child;
              })}
          </LineChart>
        );

      case "bar":
        return (
          <BarChart data={dataSource}>
            <ChartTooltip />
            <ChartLegend />
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxis} />
            <YAxis />
            {React.Children.toArray(children)
              .filter(Boolean)
              .map((child) => {
                if (!child || !child.props) return null;
                return child;
              })}
          </BarChart>
        );

      default:
        break;
    }
  };

  return (
    <>
      <Flex justify='flex-end' align='center'>
        <ChartMetricsSetting
          chartMetrics={chartMetrics}
          disabled={loading}
          tooltip={tooltip}
          visibleMetrics={visibleMetrics}
          setVisibleMetrics={setVisibleMetrics}
        />
      </Flex>
      <ResponsiveContainer width={width} height={height} {...restProps}>
        {renderChart ? renderChart : renderChartByType()}
      </ResponsiveContainer>
    </>
  );
};

export default AppChart;
