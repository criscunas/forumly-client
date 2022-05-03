import createThreadStyles from './CreateThread.module.scss';
import Backdrop from "@mui/material/Backdrop";
import { Form , useFormik} from "formik";
import {
  Box,
  Button,
  Fade,
  Modal,
  Fab,
  TextField,
  InputAdornment
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import * as Yup from 'yup';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ThreadSchema = Yup.object({
    thread_subject: Yup.string().required("Subject Required"),
    initial_post: Yup.string().required("Post Required"),
  });


  const formik = useFormik({
    validationSchema: ThreadSchema,
    initialValues: {
      thread_subject: "",
      initial_post: "",
    },
    onSubmit: (values, { resetForm }) => {
      handler(values);
      resetForm();
    }
  });

  return (
    <div className={createThreadStyles.createThread}>
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
            <h1 className={createThreadStyles.createThread__header}>
              {" "}
              Start a discussion
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className={createThreadStyles.createThread__body}
            >
              <TextField
                sx={{ display: "flex" }}
                name="thread_subject"
                type="text"
                label="Subject"
                size='small'
                value={formik.values.thread_subject}
                onChange={formik.handleChange}
                error={
                  formik.touched.thread_subject &&
                  Boolean(formik.errors.thread_subject)
                }
                helperText={
                  formik.touched.thread_subject && formik.errors.thread_subject
                }
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
              <TextField
                sx={{ display: "flex" }}
                label="Post"
                name="initial_post"
                type="text"
                multiline
                value={formik.values.initial_post}
                onChange={formik.handleChange}
                error={
                  formik.touched.initial_post &&
                  Boolean(formik.errors.initial_post)
                }
                helperText={
                  formik.touched.initial_post && formik.errors.initial_post
                }
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
              <Button
                onClick={refresh}
                size="medium"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
