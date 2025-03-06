import React, { Dispatch, SetStateAction, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";

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
  total,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const { t } = useTranslation();
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
                t("username"),
                t("platform"),
                t("rating"),
                t("message"),
                t("timestamp"),
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
            {data.map((row, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                }
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{row.name}</TableCell>
                <TableCell className="text-center">{row.platform}</TableCell>
                <TableCell className="text-center">{row.rating}</TableCell>
                <TableCell className="text-center">{row.message}</TableCell>
                <TableCell className="text-center">
                  {format(parseISO(row.createAt), "dd/MM/yyyy HH:mm")}
                </TableCell>
              </TableRow>
            ))}
            <TableRow ref={ref}>
              <TableCell colSpan={6} className="text-center text-gray-500 p-3">
                {isFetching ? "Đang tải thêm dữ liệu..." : ""}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableFeedback;
