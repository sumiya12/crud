import * as React from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";
import Loading from "../../components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddCrud = ({ handleClose, open }) => {
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(e.target.name.value);
    console.log(e.target.status.value);
    axios
      .post("http://localhost:3000/crud/create", {
        name: e.target.name.value,
        status: e.target.status.value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("amjilltai");
          setIsLoading(false);
          location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              backgroundColor: "white",
              color: "black",
              display: "flex",
              padding: 10,
              borderRadius: "16px",
              gap: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={submitHandler}
          >
            <Typography>Add Crud</Typography>
            <TextField label="Name" name="name"></TextField>
            <TextField label="Status" name="status"></TextField>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCrud;
