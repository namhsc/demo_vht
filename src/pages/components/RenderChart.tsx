import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
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
// import { useTranslation } from "react-i18next";
const chartOptions: ChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
  //   cutout: "50%",
  layout: { padding: 10 },
};

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

interface ChartProps {
  type: string;
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option?: any;
  component?: () => JSX.Element;
}

const RenderChart: React.FC<ChartProps> = ({
  type,
  labels,
  datasets,
  option,
  component,
}) => {
  return (
    <div style={{ flexGrow: 1 }}>
      {type === "divCustom" && component && component()}
      {type === "line" && (
        <Line
          data={{ labels, datasets }}
          options={{ ...chartOptions, ...option }}
        />
      )}
      {type === "bar" && (
        <Bar
          data={{ labels, datasets }}
          options={{ ...chartOptions, ...option }}
        />
      )}
      {type === "pie" && (
        <Pie
          data={{ labels, datasets }}
          options={{ ...chartOptions, ...option }}
        />
      )}
      {type === "doughnut" && (
        <Doughnut
          data={{ labels, datasets }}
          options={{ ...chartOptions, ...option }}
        />
      )}
    </div>
  );
};

export default RenderChart;
