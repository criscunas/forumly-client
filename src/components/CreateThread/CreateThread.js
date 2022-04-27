
import createThreadStyles from './CreateThread.module.scss';
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  Alert,
  Snackbar,
  Fade,
  Modal,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  FontFace: "Nunito Sans",
  p: 1.5,
};


export default function CreateThread(props) {
  
  const {handler, refresh} = props;

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  return (
    <div className={createThreadStyles.createThread}>
      <Snackbar open={alert} autoHideDuration={3000} onClose={closeAlert}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thread Created !
        </Alert>
      </Snackbar>
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        onClick={handleOpen}
        sx={{ zIndex: 0 }}
      >
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {}}
        closeAfterTransition
        onBackdropClick={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={createThreadStyles.createThread__modal}>
            <h1 className={createThreadStyles.createThread__header}> Start a discussion</h1>

            <Formik
              onSubmit={(values, { resetForm }) => {
                handler(values);
                refresh();
                resetForm();
              }}
              initialValues={{
                thread_subject: "",
                initial_post: "",
              }}
            >
              {(props) => (
                <Form
                  onSubmit={props.handleSubmit}
                  className={createThreadStyles.createThread__body}
                >
                  <TextField
                    sx={{ display: "flex" }}
                    onChange={props.handleChange}
                    value={props.values.thread_subject}
                    name="thread_subject"
                    size="small"
                    type="text"
                    label="Subject"
                    autoComplete="new"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{ display: "flex" }}
                    onChange={props.handleChange}
                    value={props.values.initial_post}
                    name="initial_post"
                    size="medium"
                    type="text"
                    multiline
                    rows={6}
                    autoComplete="new"
                    label="Post"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                  <Button onClick = {refresh}  size="small" type="submit" variant="contained">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
