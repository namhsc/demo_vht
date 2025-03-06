import { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import { useTranslation } from "react-i18next";
import {
  chartContainerStyle,
  ChartData,
  configChartDefault,
  dataChart,
} from "./DashboardPage";
import vendorAPI from "api/VendorActivityAPI";
import TableVendorDevice from "./components/vendor/TableVendorDevice";
import { backgroundColor, borderColor } from "api/constants/colors";
import RenderChart from "./components/RenderChart";
import useDeviceTypeMap from "hooks/useDeviceTypeMap";
import { LayoutItem } from "app/app";
import { layoutDefault } from "constants/layoutGrid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface DataVendorActivity {
  [key: string]: ChartData;
}

const cols = 8;

interface VendorPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLayoutDefault?: React.Dispatch<React.SetStateAction<any>>;
  pathName?: string;
}
const VendorActivityPage: React.FC<VendorPageProps> = ({
  setLayoutDefault,
  pathName,
}) => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  // const { t } = useTranslation();
  const [total, setTotalItem] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const deviceTypeMap = useDeviceTypeMap();
  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem(`layout_${pathName}`);
    return savedLayout
      ? JSON.parse(savedLayout)
      : layoutDefault[`layout_${pathName}_default`];
  });

  const [dataTable, setDataTable] = useState([]);
  const [queryTable, setQueryTable] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 10,
  });

  const [dataVendor, setDataVendor] = useState<DataVendorActivity>({});

  useEffect(() => {
    if (setLayoutDefault) {
      setLayoutDefault(layout);
    }
  }, [layout, setLayoutDefault]);

  useEffect(() => {
    vendorAPI
      .tableVendorAndDevice(queryTable)
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, total } = res as unknown as any;
        setDataTable(data);
        setTotalItem(total | 0);
      })
      .catch((e) => console.error(e));
  }, [queryTable]);

  useEffect(() => {
    vendorAPI
      .getTyeDistributionDevice()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: dataChart) =>
          deviceTypeMap.get(parseInt(item._id))
        );
        const counts = data.map((item: dataChart) => item.count);
        const colors = data.map(
          (_item: dataChart, i: number) => borderColor[i]
        );
        const border = data.map(
          (_item: dataChart, i: number) => backgroundColor[i]
        );

        setDataVendor((prev) => ({
          ...prev,
          countDeviceByTy: {
            title: "Số lượng thiết bị mỗi loại",
            type: "bar",
            labels: ids,
            option: {
              scales: {
                x: { ticks: { autoSkip: false } },
                y: { beginAtZero: true },
              },
              plugins: {
                legend: { display: false },
              },
            },
            datasets: [
              {
                ...configChartDefault,
                label: "Thiết bị mới",
                data: counts,
                borderColor: border,
                backgroundColor: colors,
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    vendorAPI
      .getNewDevice()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: dataChart) => item._id);
        const counts = data.map((item: dataChart) => item.count);

        setDataVendor((prev) => ({
          ...prev,
          newDeviceVendor: {
            title: "Số lượng thiết bị mới",
            type: "line",
            labels: ids,
            option: {
              plugins: {
                legend: { display: false },
              },
              elements: {
                line: { tension: 0 }, // Bắt buộc thẳng
              },
            },
            datasets: [
              {
                ...configChartDefault,
                label: "Thiết bị mơi",
                data: counts,
                borderColor: borderColor[2],
                backgroundColor: backgroundColor[2],
              },
            ],
          },
        }));
      })
      .catch((e) => console.error(e));

    vendorAPI
      .countDeviceByVendor()
      .then((res) => {
        const { data } = res;
        const ids = data.map((item: dataChart) => item.vendorName);
        const counts = data.map((item: dataChart) => item.deviceCount);

        setDataVendor((prev) => ({
          ...prev,
          countDeviceByVendor: {
            title: "Số lượng thiết bị của Vendor",
            type: "bar",
            labels: ids,
            option: {
              plugins: {
                legend: { display: false },
              },
            },
            datasets: [
              {
                ...configChartDefault,
                label: "Số lượng thiết bị",
                data: counts,
                borderColor: borderColor[0],
                backgroundColor: backgroundColor[0],
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
    <>
      <div
        className="flex-1"
        ref={containerRef}
        style={{ width: "100%", height: "auto", display: "flex" }}
      >
        <GridLayout
          key={JSON.stringify(dataVendor)}
          className="layout"
          layout={layout}
          cols={cols}
          rowHeight={gridWidth / cols}
          width={gridWidth}
          onLayoutChange={setLayout}
          draggableHandle=".drag-handle"
        >
          {layout.map((data: LayoutItem) => {
            const dataChar = dataVendor[data.i];
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
                  // key={gridWidth}
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
      <div
        className={`relative bg-white shadow-lg transition-all duration-300 ${
          isTableVisible ? "w-[500px] opacity-100" : "w-0 opacity-1"
        }`}
      >
        {isTableVisible && (
          <div className="w-[500px] h-full overflow-y-auto">
            <TableVendorDevice
              queryTable={queryTable}
              data={dataTable}
              setQueryTable={setQueryTable}
              total={total}
            />
          </div>
        )}

        <button
          onClick={() => setIsTableVisible(!isTableVisible)}
          style={{ left: "-16px" }}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-16 bg-gray-200 rounded-l-md flex items-center justify-center shadow-md transition-all"
        >
          {isTableVisible ? (
            <ChevronRightIcon fontSize="small" />
          ) : (
            <ChevronLeftIcon fontSize="small" />
          )}
        </button>
      </div>
    </>
  );
};

export default VendorActivityPage;
