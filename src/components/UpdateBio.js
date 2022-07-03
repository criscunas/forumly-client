import { useState } from "react";
import { useFormik } from "formik";
import {TextField, Modal, Backdrop, Fade, Box } from "@mui/material";
import * as Yup from "yup";

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

export default function UpdateBio(props) {
    const { handler, username, refresh } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const BioSchema = Yup.object({
        bio: Yup.string().required("Bio Required"),
    });

    const formik = useFormik({
        validationSchema: BioSchema,
        initialValues: {
            bio: "",
        },
        onSubmit: (values, { resetForm }) => {
            handler(values);
            setOpen(false);
            refresh(process.env.URL + `/user/profile/${username}`);
            resetForm();
        },
    });

    return (
        <div>
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
                            <div className="flex flex-col w-[250px]">
                                <h1 className="text-lg">Edit bio</h1>
                                <TextField
                                    name="bio"
                                    type="text"
                                    placeholder="Edit Bio"
                                    multiline
                                    size="small"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.bio &&
                                        Boolean(formik.errors.bio)
                                    }
                                    helperText={
                                        formik.touched.bio && formik.errors.bio
                                    }
                                />
                                <button className="form-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
