import { useFormik } from "formik";
import {
    TextField,
    Fade,
    Modal,
    Backdrop,
    IconButton,
    Box,
} from "@mui/material";
import * as Yup from "yup";
import { useEffect, useState } from "react";
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

export default function CreateStatusForm(props) {
    const { handler } = props;

    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
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
            handler(values);
            setOpen(false);
            resetForm();
        },
    });

    useEffect(() => {
        setCount(formik.values.personal_post.length);
    });

    return (
        <>
            <IconButton
                onClick={handleOpen}
                size="large"
                style={{ padding: "0" }}
            >
                <AddBoxIcon className="text-white" />
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
                        <form className="flex flex-col w-[200px]" onSubmit={formik.handleSubmit}>
                            <h1 className="font-semibold text-xl">Status Update</h1>
                            <TextField
                                className="my-4"
                                name="personal_post"
                                type="text"
                                size="small"
                                multiline
                                label="Enter Status"
                                value={formik.values.personal_post}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.personal_post &&
                                    Boolean(formik.errors.personal_post)
                                }
                                helperText={
                                    formik.touched.personal_post &&
                                    formik.errors.personal_post
                                }
                            />
                            <button className = "px-3 py-2 uppercase text-white font-semibold bg-medium_blue rounded-lg" type="submit">
                                Post
                            </button>

                            {count <= 280 ? (
                                <p className="text-black text-center pt-4"> {280 - count} characters remaining </p>
                            ) : (
                                <p className="text-red-500 text-center pt-4"> {280 - count} characters over{" "} </p>
                            )}
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
