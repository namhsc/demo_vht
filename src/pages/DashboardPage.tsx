import { useState } from "react";
import GridLayout from "react-grid-layout";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  ChartOptions,
} from "chart.js";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useTranslation } from "react-i18next";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const DashboardPage = ({ pathName }: { pathName: string }) => {
  const { t } = useTranslation();

  const [layout, setLayout] = useState([
    { i: "lineChart", x: 0, y: 0, w: 4, h: 3 },
    { i: "barChart", x: 4, y: 0, w: 4, h: 3 },
    { i: "pieChart", x: 8, y: 0, w: 4, h: 3 },
  ]);

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3, 5, 2],
        backgroundColor: ["red", "blue", "yellow", "green", "purple"],
      },
    ],
  };

  const pieData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const chartContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "8px",
    background: "#eeeeee",
  };

  const chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    layout: { padding: 10 },
  };

  return (
    <div style={{ width: "100%", height: "auto", padding: 20 }}>
      <h1>{t("welcome")}</h1>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={setLayout}
        draggableHandle=".drag-handle"
      >
        <div
          key="lineChart"
          className="chart-container"
          style={chartContainerStyle}
        >
          <div
            className="drag-handle"
            style={{ cursor: "grab", background: "#ccc", padding: 5 }}
          >
            🟦 Line Chart
          </div>
          <div style={{ flexGrow: 1 }}>
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        <div
          key="barChart"
          className="chart-container"
          style={chartContainerStyle}
        >
          <div
            className="drag-handle"
            style={{ cursor: "grab", background: "#ccc", padding: 5 }}
          >
            🟥 Bar Chart
          </div>
          <div style={{ flexGrow: 1 }}>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div
          key="pieChart"
          className="chart-container"
          style={chartContainerStyle}
        >
          <div
            className="drag-handle"
            style={{ cursor: "grab", background: "#ccc", padding: 5 }}
          >
            🟡 Pie Chart
          </div>
          <div style={{ flexGrow: 1 }}>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </GridLayout>
    </div>
  );
};

export default DashboardPage;
