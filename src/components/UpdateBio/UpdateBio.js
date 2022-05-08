import { useState } from "react";
import { useFormik} from "formik";
import updateBio from "./UpdateBio.module.scss";
import {
  Button, 
  TextField,
  Modal,
  Backdrop,
  Fade,
  Box
} from "@mui/material";
import * as Yup from 'yup';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 1.5
};


export default function UpdateBio(props) {

  const {handle, username, refresh } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const BioSchema = Yup.object({
    bio: Yup.string().required("Bio Required"),
  });


  const formik = useFormik({
    validationSchema : BioSchema,
    initialValues: {
      bio: "",
    },
    onSubmit : (values, { resetForm }) => {
      handle(values);
      refresh(`https://dgisvr.xyz/user/profile/${username}`);
      resetForm();
    }
  });

  return (
    <div className={updateBio.edit}>
      <p onClick={handleOpen}>Edit Bio </p>
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
            <form onSubmit={formik.handleSubmit}>
              <div className={updateBio.edit__form}>
                <h1 className={updateBio.edit__form_title}> Edit bio </h1>
                <TextField
                  name="bio"
                  type="text"
                  placeholder="Edit Bio"
                  multiline
                  size="small"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <Button
                  className={updateBio.edit__form_button}
                  type="submit"
                  htmlColor="#60A5FA"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
