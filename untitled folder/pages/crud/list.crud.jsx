import React from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Link,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useSWR from "swr";
import AddCrud from "../../components/addCrud";
import { useState } from "react";
import Loading from "../../components/Loading";

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
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const crudsApi = `http://localhost:3000/crud/get`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data, error } = useSWR(crudsApi, fetcher);

  const handledelete = (e) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:3000/crud/delete/${e}`)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer
          component={Paper}
          style={{
            flexDirection: "column",
            display: "flex",
            // padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">name</StyledTableCell>
                <StyledTableCell align="center">status</StyledTableCell>
                <StyledTableCell align="center">edit</StyledTableCell>
                <StyledTableCell align="center">delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((e, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">{e?._id}</StyledTableCell>
                      <StyledTableCell align="center">
                        {e?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {e?.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button>
                          <Link href={`/crud/edit/${e._id}`}>edit</Link>
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => {
                            handledelete(e._id);
                          }}
                        >
                          delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Button variant="contained" onClick={handleOpen}>
            add crud
          </Button>
          <AddCrud handleClose={handleClose} open={open} />
        </TableContainer>
      )}
    </>
  );
};

export default List;
