"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import physicianData from "@/metrics/cihi/physician_supply.json";
import populationData from "@/metrics/statscan/population.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface FederalPhysicianSupplyPerCapitaChartProps {
  title?: string;
  startYear?: number;
  endYear?: number;
  height?: number;
  showTarget?: boolean;
  targetValue?: number;
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
  borderWidth: number;
  pointRadius: number;
  pointHoverRadius: number;
  borderDash?: number[];
}

export default function FederalPhysicianSupplyPerCapitaChart({
  title = "Federal Physician Supply Per Capita",
  startYear = 2019,
  endYear = 2023,
  height = 400,
  showTarget = true,
  targetValue = 3.5,
}: FederalPhysicianSupplyPerCapitaChartProps) {
  // Get federal physician supply data
  const physicianDataObj = physicianData as any;
  const federalPhysicianData = physicianDataObj.Canada["Physician Supply"] || [];

  // Get federal population data
  const populationDataObj = populationData as any;
  const canadaPopulationData = populationDataObj.data.Canada || [];

  // Filter physician data by year range
  const filteredPhysicianData = federalPhysicianData.filter(function (item: any) {
    const year = parseInt(item[0]);
    return year >= startYear && year <= endYear;
  });

  // Calculate per capita values (physicians per 1000 people)
  const perCapitaData = filteredPhysicianData.map(function (physicianItem: any) {
    const year = physicianItem[0];
    const physicianCount = physicianItem[1];
    
    // Find population data for January 1st of the year
    const yearStr = `${year}-01`;
    const populationItem = canadaPopulationData.find((popItem: any) => 
      popItem[0] === yearStr
    );
    
    if (populationItem) {
      const population = populationItem[1];
      const perCapita = (physicianCount / population) * 1000; // per 1000 people
      return [year, perCapita];
    }
    
    return [year, 0];
  });

  // Extract labels and values
  const labels = perCapitaData.map(function (item: any) {
    return item[0].toString(); // Year as string
  });

  const chartValues = perCapitaData.map(function (item: any) {
    return item[1]; // Per capita value
  });

  const datasets: ChartDataset[] = [
    {
      label: "Physicians per 1,000 people",
      data: chartValues,
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.1)",
      tension: 0.3,
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
    },
  ];

  // Add target line if requested
  if (showTarget && targetValue) {
    datasets.push({
      label: `Target (${targetValue} per 1,000)`,
      data: Array(labels.length).fill(targetValue),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      pointHoverRadius: 0,
      tension: 0,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            return `Year: ${context[0].label}`;
          },
          label: function (context: any) {
            const value = context.parsed.y;
            if (context.dataset.label.includes("Target")) {
              return `${context.dataset.label}: ${value.toFixed(1)} per 1,000 people`;
            }
            return `${context.dataset.label}: ${value.toFixed(2)} per 1,000 people`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.min(2.0, Math.min(...chartValues) - 0.1),
        max: Math.max(targetValue ? targetValue + 0.3 : 4.0, Math.max(...chartValues) + 0.1),
        title: {
          display: true,
          text: "Physicians per 1,000 people",
          font: {
            size: 14,
          },
          padding: {
            bottom: 10,
          },
        },
        ticks: {
          padding: 8,
          callback: function (value: any) {
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
          font: {
            size: 14,
          },
          padding: {
            top: 10,
          },
        },
        ticks: {
          padding: 5,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    layout: {
      padding: {
        left: 15,
        right: 15,
        top: 20,
        bottom: 20,
      },
    },
    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        position: "relative",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
}