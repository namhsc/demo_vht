import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
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
import { useTranslation } from "react-i18next";
import userExperienceAPI from "api/customerExperienceAPI";

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

export const chartContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "8px",
  background: "white",
  border: "1px solid #ccc",
};

export const chartOptions: ChartOptions = {
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

interface Dataset {
  label?: string;
  data: number[];
  fill?: boolean;
  borderColor?: string | string[];
  tension?: number;
  backgroundColor?: string | string[];
  type?: string;
  borderWidth?: number;
  yAxisID?: string;
}

interface ChartData {
  title: string;
  type: string;
  labels: string[];
  datasets: any[];
  option?: any;
}

interface DataUserExperience {
  [key: string]: ChartData;
}

const cols = 12;

const DashboardPage = ({ pathName }: { pathName: string }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);

  const [layout, setLayout] = useState([
    { i: "timeDistributon", x: 0, y: 0, w: 4, h: 3 },
    { i: "platformStats", x: 4, y: 0, w: 4, h: 3 },
    { i: "statusDistribution", x: 8, y: 0, w: 4, h: 3 },
    { i: "feedbackRating", x: 0, y: 3, w: 4, h: 3 },
  ]);

  const [dataExperience, setDataExperience] = useState<DataUserExperience>({});

  useEffect(() => {
    userExperienceAPI
      .getTimeDistribution()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: any) => item._id);
        const counts = data.map((item: any) => item.count);
        setDataExperience((prev) => ({
          ...prev,
          timeDistributon: {
            title: "Tỷ lệ trải nghiệm tốc độ API",
            type: "doughnut",
            labels: ids,
            datasets: [
              {
                label: "Lượt",
                data: counts,
                fill: false,
                tension: 0.4,
                borderWidth: 1,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    userExperienceAPI
      .getPlatformStats()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: any) => item._id);
        const counts = data.map((item: any) => item.count);
        setDataExperience((prev) => ({
          ...prev,
          platformStats: {
            title: "Số lượng người dùng trên các nền tảng",
            type: "bar",
            labels: ids,
            datasets: [
              {
                label: "Lượt truy cập",
                data: counts,
                fill: false,
                borderColor: "#42A5F5",
                tension: 0.4,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    userExperienceAPI
      .getStatusDistribution()
      .then((res) => {
        const { data } = res;

        const ids = data.map((item: any) => item._id);
        const counts = data.map((item: any) => item.count);

        setDataExperience((prev) => ({
          ...prev,
          statusDistribution: {
            title: "Đánh giá trạng thái sử dụng API",
            type: "bar",
            labels: ids,
            datasets: [
              {
                label: "Lượt truy cập",
                data: counts,
                fill: false,
                borderColor: "#42A5F5",
                tension: 0.4,
                backgroundColor: ["red", "blue", "yellow", "green", "purple"],
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    userExperienceAPI
      .getFeedbackRating()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: any) => item._id);
        const counts = data.map((item: any) => item.count);
        const averageRating = data.map((item: any) =>
          item.averageRating.toFixed(1)
        );

        setDataExperience((prev) => ({
          ...prev,
          feedbackRating: {
            title: "Bảng đánh giá của khách hàng",
            type: "bar",
            labels: ids,
            option: {
              scales: {
                "y-axis-2": {
                  type: "linear",
                  position: "right",
                  min: 0, // Đảm bảo trục y bắt đầu từ 0
                  max: 5, // Giới hạn tối đa là 5
                  ticks: {
                    stepSize: 1, // Chia nhỏ thang đo từ 0 - 5
                  },
                },
              },
            },
            datasets: [
              {
                type: "bar",
                label: "Số lượt đánh giá",
                data: counts,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                yAxisID: "y-axis-1",
              },
              {
                type: "line",
                label: "Điểm trung bình",
                data: averageRating,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                pointRadius: 4,
                yAxisID: "y-axis-2",
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setGridWidth(containerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      updateSize();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div ref={containerRef} style={{ width: "100%", height: "auto" }}>
      <GridLayout
        key={JSON.stringify(dataExperience)}
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={gridWidth / cols}
        width={gridWidth}
        onLayoutChange={setLayout}
        draggableHandle=".drag-handle"
      >
        {layout.map((data) => {
          const dataChar = dataExperience[data.i];
          if (!dataChar) return <div key={data.i}></div>;

          const { title, type, labels, datasets, option } = dataChar;
          return (
            <div
              key={data.i}
              className="chart-container"
              style={chartContainerStyle}
            >
              <div
                className="drag-handle"
                style={{ cursor: "grab", background: "#ccc", padding: 5 }}
              >
                {title}
              </div>
              <div style={{ flexGrow: 1 }}>
                {type === "line" && (
                  <Line data={{ labels, datasets }} options={chartOptions} />
                )}
                {type === "bar" && (
                  <Bar data={{ labels, datasets }} options={chartOptions} />
                )}
                {type === "pie" && (
                  <Pie data={{ labels, datasets }} options={chartOptions} />
                )}
                {type === "doughnut" && (
                  <Doughnut
                    data={{ labels, datasets }}
                    options={{ ...chartOptions, ...option }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default DashboardPage;
