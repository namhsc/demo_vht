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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem(`layout_${pathName}`);
    return savedLayout
      ? JSON.parse(savedLayout)
      : layoutDefault[`layout_${pathName}_default`];
  });

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
            title: t("total_users"),
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
                  <div className="h-full flex justify-center items-center flex-col">
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
                      label={t("total_customers")}
                    />
                  </div>
                </div>
              );
            },
            datasets: [
              {
                ...configChartDefault,
                label: t("device_count"),
                data: [],
                borderColor: borderColor[0],
                backgroundColor: backgroundColor[0],
              },
            ],
          },
          countOut: {
            title: t("users_disconnected"),
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
                  <div className="h-full flex justify-center items-center flex-col">
                    <StatCard
                      total={data?.userNotUsing || 0}
                      change={0}
                      percentage={0}
                      label={t("disconnected_users_count")}
                      isHide
                    />
                  </div>
                </div>
              );
            },
            datasets: [
              {
                ...configChartDefault,
                label: t("device_count"),
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
            title: t("subscription_rate"),
            type: "divCustom",
            labels: [t("prepaid"), t("postpaid")],
            component: () => {
              return (
                <div className="p-4 bg-white rounded-lg text-center h-full flex justify-center items-center flex-col">
                  <div className="text-xl font-bold text-gray-800">
                    {t("Total")}: {counts[0] + counts[1]} {t("subscribers")}
                  </div>

                  <div className="flex justify-center items-center mt-2 text-gray-600">
                    <span className="mr-4">
                      {t("prepaid")}:
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
                      {t("postpaid")}:
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
                label: t("subscriber_count"),
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
            title: t("revenue_vnd"),
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
                label: t("vnd"),
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
            title: t("service_usage_rate"),
            type: "divCustom",
            labels: labels,
            component: () => {
              return (
                <div className="p-4 bg-white rounded-lg text-center h-full flex justify-center items-center flex-col">
                  <div className="text-xl font-bold text-gray-800">
                    {t("total")}: {counts[0] + counts[1]} {t("package")}
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
                label: t("usage_count"),
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
        const labels = data.map((item: dataChart) => `${item._id} ${t("day")}`);
        setDataBusiness((prev) => ({
          ...prev,
          totalUserPackage: {
            title: t("total_registered_users"),
            type: "pie",
            labels: labels,
            datasets: [
              {
                ...configChartDefault,
                label: t("registration_count"),
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
            title: t("monthly_service_registrations"),
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
                label: Object.keys(transformedData)[i] + " " + t("day"),
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
              <div className="drag-handle cursor-grab bg-[#ed023114] p-2 font-semibold">
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
  );
};

export default BusinessActivityPage;
