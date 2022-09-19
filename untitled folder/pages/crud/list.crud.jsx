import React from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useSWR from "swr";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const List = () => {
  const crudsApi = `http://localhost:3000/crud/get`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);

  const { data, error } = useSWR(crudsApi, fetcher);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">name</StyledTableCell>
            <StyledTableCell align="center">status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((e, i) => {
              return (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">{e?.name}</StyledTableCell>
                  <StyledTableCell align="center">{e?.status}</StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
