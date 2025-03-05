import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Xử lý thay đổi trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số dòng mỗi trang
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu
  };

  return (
    <Paper>
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
      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage} // Sự kiện đổi trang
        onRowsPerPageChange={handleChangeRowsPerPage} // Sự kiện đổi số dòng mỗi trang
      />
    </Paper>
  );
};

export default TableVendorDevice;
