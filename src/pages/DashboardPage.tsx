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
// import { useTranslation } from "react-i18next";
import userExperienceAPI from "api/customerExperienceAPI";
import { backgroundColor, borderColor } from "api/constants/colors";

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

export const configChartDefault = { fill: false, tension: 0.6, borderWidth: 1 };

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

export interface ChartData {
  title: string;
  type: string;
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option?: any;
}
interface dataMonth {
  year: number;
  month: number;
  count: number;
}

export interface dataChart {
  _id: string;
  count: number;
  averageRating: number;
  nameType: string;
  vendorName: string;
  deviceCount: number;
  monthlyData: dataMonth[];
}

export interface responseChart {
  data: dataChart[];
}

interface DataUserExperience {
  [key: string]: ChartData;
}

const cols = 12;

const DashboardPage = () => {
  // const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);

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
      .then((res: responseChart) => {
        const { data } = res;
        const ids = data.map((item: dataChart) => item._id);
        const counts = data.map((item: dataChart) => item.count);

        setDataExperience((prev) => ({
          ...prev,
          timeDistributon: {
            title: "Tỷ lệ trải nghiệm tốc độ API",
            type: "doughnut",
            labels: ids,
            datasets: [
              {
                ...configChartDefault,
                label: "Lượt",
                data: counts,
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
        const labels = data[0].monthlyData.map(
          (item: dataMonth) => `${item.month}/${item.year}`
        );

        const countApp = data[0].monthlyData.map(
          (item: dataMonth) => `${item.count}`
        );
        const countTV = data[1].monthlyData.map(
          (item: dataMonth) => `${item.count}`
        );

        const countWeb = data[2].monthlyData.map(
          (item: dataMonth) => `${item.count}`
        );

        console.log("labels", labels);
        setDataExperience((prev) => ({
          ...prev,
          platformStats: {
            title: "Số lượng người dùng trên các nền tảng",
            type: "bar",
            labels: labels,
            datasets: [
              {
                ...configChartDefault,
                label: "App",
                data: countApp,
                borderColor: borderColor[0],
                backgroundColor: backgroundColor[0],
                stack: "Stack 0",
              },
              {
                ...configChartDefault,
                label: "Tv",
                data: countTV,
                borderColor: borderColor[1],
                backgroundColor: backgroundColor[1],
                stack: "Stack 0",
              },
              {
                ...configChartDefault,
                label: "Web",
                data: countWeb,
                borderColor: borderColor[2],
                backgroundColor: backgroundColor[2],
                stack: "Stack 0",
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
        const ids = data.map((item: dataChart) => item._id);
        const counts = data.map((item: dataChart) => item.count);

        setDataExperience((prev) => ({
          ...prev,
          statusDistribution: {
            title: "Đánh giá trạng thái sử dụng API",
            type: "bar",
            labels: ids,
            option: { indexAxis: "y" },
            datasets: [
              {
                ...configChartDefault,
                label: "Lượt truy cập",
                data: counts,
                backgroundColor: [
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
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
      .getFeedbackRating()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: dataChart) => item._id);
        const counts = data.map((item: dataChart) => item.count);
        const averageRating = data.map((item: dataChart) =>
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
                borderColor: borderColor[8],
                backgroundColor: backgroundColor[8],
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
        setGridWidth(containerRef.current.offsetWidth - 20);
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
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default DashboardPage;
