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
import { useTranslation } from "react-i18next";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLayoutDefault?: React.Dispatch<React.SetStateAction<any>>;
  pathName?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  setLayoutDefault,
  pathName,
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);

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
    // return layoutDefault[`layout_${pathName}_default`];
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataTable, setDataTable] = useState<any>([]);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, total } = res as unknown as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setDataTable((prev: any) => {
          const mergedData = [...prev, ...data];
          const uniqueData = mergedData.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );
          return uniqueData;
        });

        const mergedData = [...dataTable, ...data];
        const uniqueData = mergedData.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setDataExperience((prev) => ({
          ...prev,
          tableRating: {
            title: "app_review_table",
            type: "divCustom",
            component: () => {
              return (
                <div
                  className="w-full h-auto"
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "auto",
                  }}
                >
                  <TableFeedback
                    queryTable={queryTable}
                    data={uniqueData}
                    setQueryTable={setQueryTable}
                    total={total | 0}
                  />
                </div>
              );
            },
            labels: [],
            datasets: [],
          },
        }));
      })
      .catch((e) => console.error(e));
  }, [queryTable]);

  useEffect(() => {
    userExperienceAPI
      .getTimeDistribution()
      .then((res: responseChart) => {
        const { data } = res;
        const order = ["0-1s", "1-2s", "2-4s", ">4s"];
        const dataRaw = data.sort(
          (a, b) => order.indexOf(a._id) - order.indexOf(b._id)
        );
        const ids = dataRaw.map((item: dataChart) => item._id);
        const counts = dataRaw.map((item: dataChart) => item.count);

        setDataExperience((prev) => ({
          ...prev,
          timeDistributon: {
            title: "api_speed_experience_ratio",
            type: "doughnut",
            labels: ids,
            datasets: [
              {
                ...configChartDefault,
                label: t("api_usage_count"),
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
            title: "user_count_by_platform",
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
        const platforms = ["app", "tv", "web"];

        const transformedData = platforms.reduce(
          (acc, platform) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[platform] = dataRaw.map(({ platforms }: any) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            title: "customer_reviews",
            type: "bar",
            labels: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
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
        setGridWidth(containerRef.current.offsetWidth - 15);
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
    <>
      <div
        className="flex-1"
        ref={containerRef}
        style={{ width: "100%", height: "auto", display: "flex" }}
      >
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

            const { title, type, labels, datasets, option, component } =
              dataChar;
            return (
              <div
                key={data.i}
                className="chart-container"
                style={chartContainerStyle}
              >
                <RenderChart
                  title={title}
                  type={type}
                  labels={labels}
                  datasets={datasets}
                  option={option}
                  component={component}
                />
              </div>
            );
          })}
        </GridLayout>
      </div>
    </>
  );
};

export default DashboardPage;
