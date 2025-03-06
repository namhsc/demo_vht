import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  ArcElement,
  ChartDataLabels
);

const getChartOptions = (customOptions: ChartOptions = {}): ChartOptions => ({
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    datalabels: {
      color: "#000",
      anchor: "center",
      align: "top",
      formatter: (value) => `${value}`,
    },
    ...(customOptions.plugins || {}),
  },
  elements: {
    line: { tension: 0 },
  },
  layout: { padding: 10 },
  ...customOptions,
});

interface ChartProps {
  type: string;
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option?: any;
  component?: () => JSX.Element;
  title: string;
}

const RenderChart: React.FC<ChartProps> = ({
  type,
  labels,
  datasets,
  option,
  component,
  title,
}) => {
  const { t } = useTranslation();
  const options = getChartOptions(option);

  return (
    <>
      <div className="drag-handle cursor-grab bg-[#ed023114] p-2 font-semibold">
        {t(title)}
      </div>
      <div
        style={{
          flexGrow: 1,
          minHeight: 0,
          // overflow: type === "divCustom" ? "auto" : "none",
        }}
      >
        {type === "divCustom" && component && component()}
        {type === "line" && (
          <Line data={{ labels, datasets }} options={options} />
        )}
        {type === "bar" && (
          <Bar data={{ labels, datasets }} options={options} />
        )}
        {type === "pie" && (
          <Pie data={{ labels, datasets }} options={options} />
        )}
        {type === "doughnut" && (
          <Doughnut data={{ labels, datasets }} options={options} />
        )}
      </div>
    </>
  );
};

export default RenderChart;
