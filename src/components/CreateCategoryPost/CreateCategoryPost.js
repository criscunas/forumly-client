import categoryPost from "./CreateCategoryPost.module.scss";
import Backdrop from "@mui/material/Backdrop";
import { Formik, Form } from "formik";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  FontFace: "Nunito Sans",
  
};

export default function CreateCategorizedPost(props) {
  const { handler , refresh } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={categoryPost.categoryPost}>
      <Fab
        style={{ backgroundColor: " #112d4e" , color : 'white'}}
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
            
            <Formik
              onSubmit={(values, { resetForm }) => {
                handler(values)
                refresh()
                handleClose()
                resetForm();
              }}
              initialValues={{
                title: "",
                post: "",
              }}
            >
              {(props) => (
                <Form
                  onSubmit={props.handleSubmit}
                  className={categoryPost.categoryPost__form}
                >
                  <TextField
                    onChange={props.handleChange}
                    value={props.values.title}
                    name="title"
                    size="small"
                    type="text"
                    label="Title"
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
                    value={props.values.post}
                    name="post"
                    size="small"
                    type="text"
                    label="Post"
                    multiline
                    rows = {8}
                    autoComplete="new"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                  <Button size="medium" type="submit" variant="contained" style = {{backgroundColor: "#112d4e", color : 'white', borderRadius: 3}} >
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
