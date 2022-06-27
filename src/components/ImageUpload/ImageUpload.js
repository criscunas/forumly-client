import { useState } from "react";
import axios from "axios";

import { Modal, Backdrop, Fade, Box, Input } from "@mui/material";

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
    const { handler} = props;

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
            .post(process.env.CLOUD_URL, formData)
            .then((response) => {
                const img = { img_path: response.data.secure_url };
                handler(img);
                setImageSelected("");
                setOpen(false);
            })
            .catch(() => {
                setError("Invalid Image");
            });
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
                    <Box sx={style} className="flex flex-col w-[250px]">
                        <h1 className="text-xl"> Upload Profile Photo </h1>
                        <p className='text-red-500 text-center'>{error}</p>
                        <Input
                            className ="mt-3 mb-4"
                            type="file"
                            size="xs"
                            onChange={(event) => {
                                setImageSelected(event.target.files[0]);
                            }}
                        />
                        <button className="font-btn" onClick={UploadImage}>
                            Submit
                        </button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
