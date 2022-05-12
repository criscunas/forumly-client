import {useFormik} from "formik";
import { Button, TextField, Fade, Modal, Fab, Backdrop, IconButton, Box } from "@mui/material";
import statusFormStyles from "./CreateStatusForm.module.scss";
import * as Yup from 'yup';
import {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";

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


export default function CreateStatusForm (props) {

  const {handler} = props;

  const [open, setOpen] = useState(false);
  const [count,setCount] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  const StatusSchema = Yup.object({
    personal_post: Yup.string().max(280).required("Status Required"),
  });


  const formik = useFormik({
    validationSchema: StatusSchema,
    initialValues: {
      personal_post: "",
    },
    onSubmit: (values, { resetForm }) => {
      handler(values)      
      resetForm();
    },
  });

  useEffect(() => {
    setCount(formik.values.personal_post.length)
  })

  return (
    <>
      <IconButton onClick={handleOpen} size="large" style={{ padding: "0" }}>
        <AddBoxIcon className={statusFormStyles.status__icon} />
      </IconButton>
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
            <form
              className={statusFormStyles.status__form}
              onSubmit={formik.handleSubmit}
            >
              <h1 className={statusFormStyles.status__form_header}>
                Status Update
              </h1>
              <TextField
                className={statusFormStyles.status__input}
                name="personal_post"
                type="text"
                size="small"
                multiline
                label="Status"
                value={formik.values.personal_post}
                onChange={formik.handleChange}
                error={
                  formik.touched.personal_post &&
                  Boolean(formik.errors.personal_post)
                }
                helperText={
                  formik.touched.personal_post && formik.errors.personal_post
                }
              />
              <Button
                size="medium"
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#007ee5" }}
              >
                Post
              </Button>

              {count <= 280 ? (
                <p style = {{color:"black", textAlign: "center", paddingTop: "1rem"}}>
                  {" "}
                  {280 - count} characters remaining
                </p>
              ) : (
                <p style = {{color:"red", textAlign: "center", paddingTop: "1rem"}}> {280 - count} characters over </p>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
