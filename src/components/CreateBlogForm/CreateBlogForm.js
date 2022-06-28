import { useFormik } from "formik";
import { Collapse, TextField } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";

export default function CreateBlogForm(props) {
    const [open, setOpen] = useState(false);

    const { handler } = props;

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const BlogSchema = Yup.object({
        title: Yup.string().required("Title Required"),
        content: Yup.string().required("Content Required"),
    });

    const formik = useFormik({
        validationSchema: BlogSchema,
        initialValues: {
            title: "",
            content: "",
        },
        onSubmit: (values, { resetForm }) => {
            handler(values);
            resetForm();
        },
    });

    return (
        <div className="my-4 bg-white rounded-lg">
            <IconButton
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
                <p className="text-lg pl-2 text-slate-700">New Blog Post</p>
            </IconButton>
            <Collapse in={expanded} timeout="auto">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col max-w-[900px] m-auto gap-4 p-4"
                >
                    <TextField
                        name="title"
                        label="Title"
                        type="text"
                        size="small"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        FormHelperTextProps={{ focused: true }}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        name="content"
                        type="text"
                        label="Content"
                        multiline
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.content &&
                            Boolean(formik.errors.content)
                        }
                        helperText={
                            formik.touched.content && formik.errors.content
                        }
                    />
                    <div className="text-right">
                        <button className="px-3 py-2 rounded-lg bg-medium_blue text-white font-semibold">
                            Submit
                        </button>
                    </div>
                </form>
            </Collapse>
        </div>
    );
}
