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
} from "chart.js";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import { useTranslation } from "react-i18next";
import userExperienceAPI from "api/customerExperienceAPI";
import {
  chartContainerStyle,
  ChartData,
  chartOptions,
  cols,
  configChartDefault,
} from "./DashboardPage";
import vendorAPI from "api/VendorActivityAPI";
import TableVendorDevice from "./components/vendor/tableVendorDevice";

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

interface DataVendorActivity {
  [key: string]: ChartData;
}

const VendorActivityPage = () => {
  // const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridWidth, setGridWidth] = useState(0);

  const [layout, setLayout] = useState([
    { i: "timeDistributon", x: 0, y: 0, w: 4, h: 3 },
    { i: "platformStats", x: 4, y: 0, w: 4, h: 3 },
    { i: "statusDistribution", x: 8, y: 0, w: 4, h: 3 },
    { i: "feedbackRating", x: 0, y: 3, w: 4, h: 3 },
  ]);

  const [dataExperience, setDataExperience] = useState<DataVendorActivity>({});

  useEffect(() => {
    vendorAPI
      .getTyeDistributionDevice()
      .then((res) => {
        console.log("getTyeDistributionDevice", res);
      })
      .catch((e) => console.error(e));

    vendorAPI
      .getNewDevice()
      .then((res) => {
        console.log("getNewDevice", res);
      })
      .catch((e) => console.error(e));

    vendorAPI
      .tableVendorAndDevice({ page: 1, pageSize: 10 })
      .then((res) => {
        console.log("tableVendorAndDevice", res);
      })
      .catch((e) => console.error(e));

    vendorAPI
      .countDeviceByVendor()
      .then((res) => {
        console.log("countDeviceByVendor", res);
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
    <div
      ref={containerRef}
      style={{ width: "100%", height: "auto", display: "flex" }}
    >
      <div>
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
      <div>
        <TableVendorDevice />
      </div>
    </div>
  );
};

export default VendorActivityPage;
