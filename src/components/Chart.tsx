import React from "react";

//Library
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

export interface DoughnutChartProps {
  data: {
    label: string;
    confirmedCases: number;
    deaths: number;
  };
}

const DoughnutChart = ({ data }: DoughnutChartProps) => {
  const chartData = {
    labels: ["Confirmed Cases", "Deaths"],
    datasets: [
      {
        label: data.label,
        data: [data.confirmedCases, data.deaths],
        backgroundColor: ["#2ECC71", "#FF6347"],
        hoverBackgroundColor: ["#27AE60", "#E74C3C"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            if (context.parsed !== undefined) {
              const value = context.parsed.toFixed(2);
              return `${label}: ${value}`;
            }
            return label;
          },
        },
      },
    },
    legend: {
      display: true,
      position: "bottom",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div style={{ height: 300, width: 300 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
