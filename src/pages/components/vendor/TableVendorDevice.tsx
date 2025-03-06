import React, { Dispatch, SetStateAction } from "react";
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
import useDeviceTypeMap from "hooks/useDeviceTypeMap";

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
  queryTable,
  total,
}) => {
  const handleChangePage = (_event: unknown, newPage: number) => {
    setQueryTable((prev) => ({ ...prev, page: newPage }));
  };
  const deviceTypeMap = useDeviceTypeMap();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryTable({
      pageSize: parseInt(event.target.value, 10),
      page: 1,
    });
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["STT", "Vendor Tên", "Device Type", "Số lượng thiết bị"].map(
                (title) => (
                  <TableCell
                    key={title}
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {title}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: tabelVendor, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.vendorName}</TableCell>
                <TableCell>{deviceTypeMap.get(row.deviceType)}</TableCell>
                <TableCell>{row.deviceCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={total}
        rowsPerPage={queryTable.pageSize}
        page={queryTable.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableVendorDevice;
