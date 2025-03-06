import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";

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
import { LayoutItem } from "app/app";
import { layoutDefault } from "constants/layoutGrid";

interface DataBusinessActivity {
  [key: string]: ChartData;
}

const cols = 12;

interface BusinessPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLayoutDefault?: React.Dispatch<React.SetStateAction<any>>;
  pathName?: string;
}

const BusinessActivityPage: React.FC<BusinessPageProps> = ({
  setLayoutDefault,
  pathName,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [layout, setLayout] = useState(
    // const savedLayout = localStorage.getItem(`layout_${pathName}`);
    // return savedLayout
    //   ? JSON.parse(savedLayout)
    //   :
    layoutDefault[`layout_${pathName}_default`]
  );

  const [dataBusiness, setDataBusiness] = useState<DataBusinessActivity>({});

  useEffect(() => {
    if (setLayoutDefault) {
      setLayoutDefault(layout);
    }
  }, [layout, setLayoutDefault]);

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
            title: "Tỷ lệ thuê bao đăng ký",
            type: "divCustom",
            labels: ["Trả trước", "Trả sau"],
            component: () => {
              return (
                <div className="p-4 bg-white rounded-lg text-center">
                  <div className="text-xl font-bold text-gray-800">
                    Tổng số: {counts[0] + counts[1]} thuê bao
                  </div>

                  <div className="flex justify-center items-center mt-2 text-gray-600">
                    <span className="mr-4">
                      Trả trước:
                      <span className="text-blue-500 font-semibold">
                        {counts[0]} (
                        {((counts[0] / (counts[0] + counts[1])) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </span>

                    <div className="w-[2px] h-6 bg-gray-300"></div>

                    <span className="ml-4">
                      Trả sau:
                      <span className="text-green-500 font-semibold">
                        {counts[1]} (
                        {((counts[1] / (counts[0] + counts[1])) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </span>
                  </div>
                </div>
              );
            },
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
            title: "Doanh thu (VNĐ)",
            type: "line",
            labels: labels,
            option: {
              plugins: {
                legend: { display: false },
                datalabels: { display: false },
              },
            },
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
            type: "divCustom",
            labels: labels,
            component: () => {
              return (
                <div className="p-4 bg-white rounded-lg text-center">
                  <div className="text-xl font-bold text-gray-800">
                    Tổng số: {counts[0] + counts[1]} gói
                  </div>

                  <div className="flex justify-center items-center mt-2 text-gray-600">
                    <span className="mr-4">
                      Record:
                      <span className="text-blue-500 font-semibold">
                        {counts[0]} (
                        {((counts[0] / (counts[0] + counts[1])) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </span>

                    <div className="w-[2px] h-6 bg-gray-300"></div>
                    <span className="ml-4">
                      Cloud:
                      <span className="text-green-500 font-semibold">
                        {counts[1]} (
                        {((counts[1] / (counts[0] + counts[1])) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </span>
                  </div>
                </div>
              );
            },
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataRaw.flatMap((entry: any) =>
              entry.data.map((d: { _id: unknown }) => d._id)
            )
          ),
        ];

        const transformedData = allIds.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, id: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[id] = dataRaw.map(({ data }: any) => {
              const found = data.find((d: { _id: unknown }) => d._id === id);
              return found ? found.count : 0;
            });
            return acc;
          },
          {} as Record<number, number[]>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any;

        setDataBusiness((prev) => ({
          ...prev,
          totalServicePerMonth: {
            title: "Số lượng dịch vụ đăng ký theo tháng",
            type: "line",
            labels: labels,
            option: {
              plugins: {
                datalabels: { display: false },
              },
            },
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
    <div
      className="flex-1"
      ref={containerRef}
      style={{ width: "100%", height: "auto", display: "flex" }}
    >
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
        {layout.map((data: LayoutItem) => {
          const dataChar = dataBusiness[data.i];
          if (!dataChar) return <div key={data.i}></div>;
          const { title, type, labels, datasets, option, component } = dataChar;

          return (
            <div
              key={data.i}
              className="chart-container"
              style={chartContainerStyle}
            >
              <div className="drag-handle cursor-grab bg-[#ed023114] p-2">
                {title}
              </div>
              <RenderChart
                // key={gridWidth}
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
  );
};

export default BusinessActivityPage;
