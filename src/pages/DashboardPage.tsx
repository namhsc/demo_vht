import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import { useTranslation } from "react-i18next";
import userExperienceAPI from "api/customerExperienceAPI";
import { backgroundColor, borderColor } from "api/constants/colors";
import RenderChart from "./components/RenderChart";
import TableFeedback from "./components/vendor/TableFeedback";
import { LayoutItem } from "app/app";
import { layoutDefault } from "constants/layoutGrid";

// eslint-disable-next-line react-refresh/only-export-components
export const configChartDefault = { fill: false, tension: 0.6, borderWidth: 1 };

// eslint-disable-next-line react-refresh/only-export-components
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

export interface ChartData {
  title: string;
  type: string;
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasets: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option?: any;
  component?: () => JSX.Element;
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
  total: number;
  totalRevenue: number;
  totalUsing: number;
  timeData: string;
}

export interface responseChart {
  data: dataChart[];
}

interface DataUserExperience {
  [key: string]: ChartData;
}
const cols = 12;

interface DashboardPageProps {
  setLayoutDefault?: React.Dispatch<React.SetStateAction<any>>;
  pathName?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  setLayoutDefault,
  pathName,
}) => {
  // const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);

  const [dataTable, setDataTable] = useState([]);
  const [queryTable, setQueryTable] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 10,
  });

  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem(`layout_${pathName}`);
    return savedLayout
      ? JSON.parse(savedLayout)
      : layoutDefault[`layout_${pathName}_default`];
  });

  const [dataExperience, setDataExperience] = useState<DataUserExperience>({});

  useEffect(() => {
    if (setLayoutDefault) {
      setLayoutDefault(layout);
    }
  }, [layout, setLayoutDefault]);

  useEffect(() => {
    userExperienceAPI
      .getDataListFeedback(queryTable)
      .then((res) => {
        const { data } = res;
        setDataTable(data);
      })
      .catch((e) => console.error(e));
  }, [queryTable]);

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
                borderColor: borderColor,
                backgroundColor: backgroundColor,
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

        const ids = data.map((item: dataChart) => item._id);
        const counts = data.map((item: dataChart) => item.total);

        setDataExperience((prev) => ({
          ...prev,
          platformStats: {
            title: "Số lượng người dùng trên các nền tảng",
            type: "doughnut",
            labels: ids,
            datasets: [
              {
                ...configChartDefault,
                label: "App",
                data: counts,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
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
        const dataRaw = data.reverse();
        const ids = dataRaw.map((item: dataChart) => `${item._id} rating`);
        // 🔹 1. Lấy danh sách tất cả platform (app, tv, web)
        const platforms = ["app", "tv", "web"];

        // 🔹 2. Tạo object chứa platform với danh sách count theo đúng thứ tự _id
        const transformedData = platforms.reduce(
          (acc, platform) => {
            acc[platform] = dataRaw.map(({ platforms }: any) => {
              const found = platforms.find((p: any) => p.platform === platform);
              return found ? found.count : 0;
            });
            return acc;
          },
          {} as Record<string, number[]>
        );

        setDataExperience((prev) => ({
          ...prev,
          feedbackRating: {
            title: "Bảng đánh giá của khách hàng",
            type: "bar",
            labels: ids,
            datasets: platforms.map((platform, i) => ({
              type: "bar",
              label: platform,
              data: transformedData[platform],
              borderColor: borderColor[i],
              backgroundColor: backgroundColor[i],
              borderWidth: 1,
              stack: "stocks",
            })),
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
    <div style={{ width: "100%", height: "auto", display: "flex" }}>
      <div style={{ flex: 1 }} ref={containerRef}>
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
          {layout.map((data: LayoutItem) => {
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
                  style={{
                    cursor: "grab",
                    background: "#ed023114",
                    padding: 5,
                  }}
                >
                  {title}
                </div>
                <RenderChart
                  key={gridWidth}
                  type={type}
                  labels={labels}
                  datasets={datasets}
                  option={option}
                />
              </div>
            );
          })}
        </GridLayout>
      </div>
      <div style={{ width: "500px", minWidth: "500px" }}>
        <TableFeedback
          queryTable={queryTable}
          data={dataTable}
          setQueryTable={setQueryTable}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
