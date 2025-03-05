import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DeviceTypeMap } from "pages/VendorActivityPage";

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

const TableVendorDevice = ({ data }: { data: tabelVendor[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Vendor Tên</TableCell>
            <TableCell>Device Type</TableCell>
            <TableCell>Số lượng thiết bị</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: tabelVendor, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.vendorName}</TableCell>
              <TableCell>{DeviceTypeMap[row.deviceType]}</TableCell>
              <TableCell>{row.deviceCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableVendorDevice;
