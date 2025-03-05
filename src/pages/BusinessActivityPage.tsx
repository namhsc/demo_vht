import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
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
} from "chart.js";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  chartContainerStyle,
  ChartData,
  configChartDefault,
  dataChart,
} from "./DashboardPage";
import { backgroundColor, borderColor } from "api/constants/colors";
import RenderChart from "./components/RenderChart";
import businessAPI from "api/businessAPI";
import StatCard from "./components/business/StatCard";

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

interface DataBusinessActivity {
  [key: string]: ChartData;
}

const cols = 12;

const BusinessActivityPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [layout, setLayout] = useState([
    { i: "countUp", x: 0, y: 0, w: 2, h: 1 },
    { i: "countOut", x: 2, y: 0, w: 2, h: 1 },
    { i: "typeUser", x: 4, y: 0, w: 4, h: 3 },
    { i: "revenueTotal", x: 0, y: 1, w: 4, h: 3 },
    { i: "userService", x: 4, y: 3, w: 4, h: 3 },
    { i: "totalServicePerMonth", x: 0, y: 5, w: 4, h: 3 },
    { i: "totalUserPackage", x: 4, y: 6, w: 4, h: 3 },
  ]);

  const [dataBusiness, setDataBusiness] = useState<DataBusinessActivity>({});

  useEffect(() => {
    businessAPI
      .getUserStatistic()
      .then((res) => {
        const { data } = res;

        setDataBusiness((prev) => ({
          ...prev,
          countUp: {
            title: "Tổng người dùng",
            type: "divCustom",
            labels: [],
            option: { indexAxis: "y" },
            component: () => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "32px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div>
                    <StatCard
                      total={data?.totalUser}
                      change={data?.newUserInMonth}
                      percentage={parseFloat(
                        (
                          (data?.newUserInMonth /
                            (data?.totalUser - data?.newUserInMonth)) *
                          100
                        ).toFixed(2)
                      )}
                      label="Tổng khách hàng"
                    />
                  </div>
                </div>
              );
            },
            datasets: [
              {
                ...configChartDefault,
                label: "Số lượng thiết bị",
                data: [],
                borderColor: borderColor[0],
                backgroundColor: backgroundColor[0],
              },
            ],
          },
          countOut: {
            title: "Người dùng rời mạng",
            type: "divCustom",
            labels: [],
            option: { indexAxis: "y" },
            component: () => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "32px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div>
                    <StatCard
                      total={data?.userNotUsing || 0}
                      change={0}
                      percentage={0}
                      label="Số người rời mạng"
                      isHide
                    />
                  </div>
                </div>
              );
            },
            datasets: [
              {
                ...configChartDefault,
                label: "Số lượng thiết bị",
                data: [],
                borderColor: borderColor[0],
                backgroundColor: backgroundColor[0],
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    businessAPI
      .getTypeUser()
      .then((res) => {
        const { data } = res;
        const counts = data.map((item: dataChart) => item.count);

        setDataBusiness((prev) => ({
          ...prev,
          typeUser: {
            title: "Tỷ lệ thuê bao",
            type: "pie",
            labels: ["Trả trước", "Trả sau"],
            datasets: [
              {
                ...configChartDefault,
                label: "Số thuê bao",
                data: counts,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    businessAPI
      .getEvenueMonthly()
      .then((res) => {
        const { data } = res;
        const counts = data.map((item: dataChart) => item.totalRevenue);
        const labels = data.map((item: dataChart) => {
          const info = item._id as unknown as { year: string; month: string };
          return `${info.month}/${info.year}`;
        });
        setDataBusiness((prev) => ({
          ...prev,
          revenueTotal: {
            title: "Doanh thu",
            type: "line",
            labels: labels,
            datasets: [
              {
                ...configChartDefault,
                label: "VNĐ",
                data: counts,
                borderColor: borderColor[2],
                backgroundColor: backgroundColor[2],
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    businessAPI
      .getPackagesAndService()
      .then((res) => {
        const { data } = res;
        const counts = data.map((item: dataChart) => item.totalUsing);
        const labels = data.map((item: dataChart) => `${item._id}`);
        setDataBusiness((prev) => ({
          ...prev,
          userService: {
            title: "Tỷ lệ sử dụng dịch vụ",
            type: "pie",
            labels: labels,
            datasets: [
              {
                ...configChartDefault,
                label: "Số lượng sử dụng",
                data: counts,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    businessAPI
      .totalServiceUser()
      .then((res) => {
        const { data } = res;
        const counts = data.map((item: dataChart) => item.count);
        const labels = data.map((item: dataChart) => `${item._id} ngày`);
        setDataBusiness((prev) => ({
          ...prev,
          totalUserPackage: {
            title: "Tổng người dùng đăng ký",
            type: "pie",
            labels: labels,
            datasets: [
              {
                ...configChartDefault,
                label: "Số lượng đăng ký",
                data: counts,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    businessAPI
      .durationTotalPerMonth()
      .then((res) => {
        const { data } = res;
        const dataRaw = data.reverse();
        const labels = dataRaw.map((item: dataChart) => item.timeData);

        const allIds = [
          ...new Set(
            dataRaw.flatMap((entry: any) =>
              entry.data.map((d: { _id: unknown }) => d._id)
            )
          ),
        ];

        const transformedData = allIds.reduce(
          (acc, id) => {
            acc[id] = dataRaw.map(({ data }) => {
              const found = data.find((d: { _id: unknown }) => d._id === id);
              return found ? found.count : 0;
            });
            return acc;
          },
          {} as Record<number, number[]>
        );

        setDataBusiness((prev) => ({
          ...prev,
          totalServicePerMonth: {
            title: "Số lượng dịch vụ đăng ký theo tháng",
            type: "line",
            labels: labels,
            datasets: Object.values(transformedData).map((item, i) => {
              return {
                ...configChartDefault,
                label: Object.keys(transformedData)[i] + " ngày",
                data: item,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
              };
            }),
          },
        }));
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setGridWidth(containerRef.current.offsetWidth - 30);
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
          key={JSON.stringify(dataBusiness)}
          className="layout"
          layout={layout}
          cols={cols}
          rowHeight={gridWidth / cols}
          width={gridWidth}
          onLayoutChange={setLayout}
          draggableHandle=".drag-handle"
        >
          {layout.map((data) => {
            const dataChar = dataBusiness[data.i];
            if (!dataChar) return <div key={data.i}></div>;
            const { title, type, labels, datasets, option, component } =
              dataChar;

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
    </div>
  );
};

export default BusinessActivityPage;
