import { useState } from "react";
import imageStyles from "./ImageUpload.module.scss";
import axios from "axios";

import { Button, Modal, Backdrop, Fade, Box, Input } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 1.5,
};


export default function ImageUpload(props) {
  
  const { handler, username} = props;

  const [error, setError] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const UploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qbey2sfk");

    axios
      .post("https://api.cloudinary.com/v1_1/djvcow1p8/image/upload", formData)
      .then((response) => {
        const img = { img_path: response.data.secure_url };
        handler(img);
        setImageSelected("");
      })
      .catch(() => {
        setError("Invalid Image")
      })
  };

  return (
    <div>
      <p onClick={handleOpen}>Edit Photo </p>
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
          <Box sx={style} className={imageStyles.imageForm}>
            <h1 className={imageStyles.imageForm__title}>
              Upload Profile Photo
            </h1>
            <p style = {{color:"red", "textAlign": "center"}}>
              {error} 
            </p>
            <Input
              className={imageStyles.imageForm__input}
              type="file"
              size="xs"
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
              }}
            />
            <Button variant="contained" onClick={UploadImage}>
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
