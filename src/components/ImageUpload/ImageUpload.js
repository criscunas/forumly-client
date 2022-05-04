import { useState } from "react";
import imageStyles from "./ImageUpload.module.scss";
import axios from "axios";
import { Button, Input} from "@mui/material";


export default function ImageUpload(props) {
  
  const { handler, username, refresh } = props;
  const [status, setStatus] = useState("");
  const [imageSelected, setImageSelected] = useState(null);
  

  const UploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qbey2sfk");

    axios
      .post("https://api.cloudinary.com/v1_1/djvcow1p8/image/upload", formData)
      .then((response) => {
        const img = { img_path: response.data.secure_url };
        handler(img);
        refresh(`https://dgisvr.xyz/user/profile/${username}`);
        setImageSelected("");
      });
  };

  return (
    <div className={imageStyles.imageForm}>
      <h1 className={imageStyles.imageForm__title}> Upload Profile Photo </h1>
      <Input
        className={imageStyles.imageForm__input}
        type="file"
        key={imageSelected}
        size="xs"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />

        <Button variant="contained" onClick={UploadImage}>
          Submit
        </Button>
    </div>
  );
}
