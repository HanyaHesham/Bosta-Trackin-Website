import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";

export default function CustomTable({ tableRows }) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("table.branch")}</TableCell>
            <TableCell>{t("table.date")}</TableCell>
            <TableCell>{t("table.time")}</TableCell>
            <TableCell>{t("table.details")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows && tableRows?.length > 0
            ? tableRows?.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row?.hub || "---"}</TableCell>
                  <TableCell>
                    {moment(row?.timestamp).format("MMM Do YY") || "---"}
                  </TableCell>
                  <TableCell>
                    {moment(row?.timestamp).format("h:mm:ss") || "---"}
                  </TableCell>
                  <TableCell>{row?.reason || "---"}</TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
