import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import useDeviceTypeMap from "hooks/useDeviceTypeMap";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

interface tabelVendor {
  _id: {
    type: number;
    vendorId: string;
  };
  deviceCount: number;
  deviceType: number;
  vendorId: string;
  vendorName: string;
}

interface TableVendorProps {
  data: tabelVendor[];
  queryTable: { page: number; pageSize: number };
  setQueryTable: Dispatch<SetStateAction<{ page: number; pageSize: number }>>;
  total: number;
}

const TableVendorDevice: React.FC<TableVendorProps> = ({
  data,
  setQueryTable,
  total,
}) => {
  const { t } = useTranslation();
  const deviceTypeMap = useDeviceTypeMap();
  const [isFetching, setIsFetching] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  React.useEffect(() => {
    if (inView && !isFetching && data.length < total) {
      setIsFetching(true);
      setQueryTable((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [inView, isFetching, data.length, total]);

  React.useEffect(() => {
    setIsFetching(false);
  }, [data]);

  return (
    <Paper className="w-full">
      <TableContainer component={Paper} className="overflow-y-auto">
        <Table>
          <TableHead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <TableRow>
              {[
                t("stt"),
                t("vendor_name"),
                t("device_type"),
                t("device_count"),
              ].map((title) => (
                <TableCell
                  key={title}
                  style={{ fontWeight: "bold" }}
                  className="whitespace-nowrap font-bold text-center uppercase p-3"
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: tabelVendor, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                }
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{row.vendorName}</TableCell>
                <TableCell className="text-center">
                  {deviceTypeMap.get(row.deviceType)}
                </TableCell>
                <TableCell className="text-center">{row.deviceCount}</TableCell>
              </TableRow>
            ))}
            <TableRow ref={ref}>
              <TableCell colSpan={4} className="text-center text-gray-500 p-3">
                {isFetching ? t("loading_more_data") : ""}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableVendorDevice;
