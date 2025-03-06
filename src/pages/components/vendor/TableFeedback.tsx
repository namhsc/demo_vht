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
import { format, parseISO } from "date-fns";

interface feedback {
  _id: string;
  name: string;
  platform: string;
  rating: string;
  message: string;
  createAt: string;
}

interface TableFeedbackProps {
  data: feedback[];
  queryTable: { page: number; pageSize: number };
  total: number;
  setQueryTable: Dispatch<SetStateAction<{ page: number; pageSize: number }>>;
}

const TableFeedback: React.FC<TableFeedbackProps> = ({
  data,
  setQueryTable,
  queryTable,
  total,
}) => {
  const handleChangePage = (_event: unknown, newPage: number) => {
    setQueryTable((prev) => ({ ...prev, page: newPage }));
  };

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
              {[
                "STT",
                "Người dùng",
                "Nền tảng",
                "Điểm",
                "Tin nhắn",
                "hời điểm",
              ].map((title) => (
                <TableCell
                  key={title}
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: feedback, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.platform}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.message}</TableCell>
                <TableCell>
                  {format(parseISO(row.createAt), "dd/MM/yyyy HH:mm")}
                </TableCell>
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

export default TableFeedback;
