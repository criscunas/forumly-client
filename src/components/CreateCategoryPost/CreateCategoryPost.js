import categoryPost from "./CreateCategoryPost.module.scss";
import Backdrop from "@mui/material/Backdrop";
import { useFormik } from "formik";
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  Fade,
  Modal,
  Fab,
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
  FontFace: "Nunito Sans",
};

export default function CreateCategorizedPost(props) {
  const { handler, refresh } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CategorySchema = Yup.object({
    title: Yup.string().required("Title Required"),
    post: Yup.string().required("Post Required"),
  });

  const formik = useFormik({
    validationSchema: CategorySchema,
    initialValues: {
      thread_subject: "",
      initial_post: "",
    },
    onSubmit: (values, { resetForm }) => {
      handler(values);
      refresh();
      handleClose();
      resetForm();
    },
  });

  return (
    <div className={categoryPost.categoryPost}>
      <Fab
        style={{ backgroundColor: " #112d4e", color: "white" }}
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
          <Box sx={style}>
            <h1 className={categoryPost.categoryPost__header}>
              Create New Post
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className={categoryPost.categoryPost__form}
            >
              <TextField
                name="title"
                size="small"
                type="text"
                label="Title"
                autoComplete="new"
                value ={formik.values.title}
                onChange={formik.handleChange}
                error ={
                  formik.touched.title &&
                  Boolean(formik.errors.title)
                }
                helperText={
                  formik.touched.title && formik.errors.title
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                sx={{ display: "flex" }}
                name="post"
                size="small"
                type="text"
                label="Post"
                multiline
                autoComplete="new"
                value={formik.values.post}
                onChange={formik.handleChange}
                error={formik.touched.post && Boolean(formik.errors.post)}
                helperText={formik.touched.post && formik.errors.post}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <Button
                size="medium"
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#112d4e",
                  color: "white",
                  borderRadius: 3,
                }}
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
