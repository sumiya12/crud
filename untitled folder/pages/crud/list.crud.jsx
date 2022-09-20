import React from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Link,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useSWR from "swr";
import AddCrud from "../../components/addCrud";
// import Loading from "../../components/Loading";
import Modal from "@mui/material/Modal";

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const List = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [opendel, setOpendel] = React.useState(false);
  const [openEd, setOpenEd] = React.useState(false);
  const [isId, setIsId] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleOpendel = () => setOpendel(true);
  const handleOpenEd = () => setOpenEd(true);
  const handleClose = () => setOpen(false);
  const handleClosedel = () => setOpendel(false);
  const handleCloseEd = () => setOpenEd(false);

  const crudsApi = `http://localhost:3000/crud/get`;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data, error } = useSWR(crudsApi, fetcher);

  const submitHandler = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    axios
      .delete(`http://localhost:3000/crud/delete/${isId._id}`)
      .then((res) => {
        if (res.status === 200) {
          // setIsLoading(false);
          location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
      });
  };

  const submitHand = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    axios
      .put(`http://localhost:3000/crud/update?id=${isId._id}`, {
        name: e.target.name.value,
        status: e.target.status.value,
      })
      .then((res) => {
        if (res.status == 200) {
          // setIsLoading(false);
          location.reload();
          // router.push("/crud/list.crud");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
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
                    <StyledTableCell align="center">{e?.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {e?.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => {
                          handleOpenEd(setIsId(e));
                        }}
                      >
                        edit
                      </Button>
                      <Modal
                        open={openEd}
                        onClose={handleCloseEd}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{ style }}
                          component="form"
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            padding: 20,
                            width: 400,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                          }}
                          onSubmit={submitHand}
                        >
                          <Typography>Edit</Typography>
                          <TextField
                            label="Name"
                            defaultValue={isId && isId?.name}
                            name="name"
                          ></TextField>
                          <TextField
                            label="Status"
                            defaultValue={isId && isId?.status}
                            name="status"
                          ></TextField>
                          <Button variant="contained" type="submit">
                            Save
                          </Button>
                        </Box>
                      </Modal>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => {
                          handleOpendel(setIsId(e));
                        }}
                      >
                        delete
                      </Button>
                      <Modal
                        open={opendel}
                        onClose={handleClosedel}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={{ style }}>
                          <Box
                            component="form"
                            sx={{
                              backgroundColor: "white",
                              color: "black",
                              display: "flex",
                              padding: 10,
                              borderRadius: "16px",
                              width: 400,
                              gap: 5,
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onSubmit={submitHandler}
                          >
                            <Typography>Are you sure?</Typography>
                            <div
                              sx={{
                                display: "flex",
                              }}
                            >
                              <Button variant="contained" type="submit">
                                Yes
                              </Button>
                              <Button
                                variant="contained"
                                onClose={handleClosedel}
                              >
                                No
                              </Button>
                            </div>
                          </Box>
                        </Box>
                      </Modal>
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
      {/* )} */}
    </>
  );
};

export default List;
