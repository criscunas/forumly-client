import { useFormik } from "formik";
import {TextField } from "@mui/material";
import * as Yup from "yup";

export default function CreateThread(props) {
    const { handler, refresh } = props;

    const ThreadSchema = Yup.object({
        thread_subject: Yup.string().required("Subject Required"),
        initial_post: Yup.string().required("Post Required"),
    });

    const formik = useFormik({
        validationSchema: ThreadSchema,
        initialValues: {
            thread_subject: "",
            initial_post: "",
        },
        onSubmit: (values, { resetForm }) => {
            handler(values);
            resetForm();
        },
    });

    return (
        <div className="p-4 md:p-6">
            <p className="section-header">
                Create New
            </p>
            <form
                onSubmit={formik.handleSubmit}
                className="my-4 py-6 px-4 mx-auto bg-white rounded-lg"
            >
            <p className = "text-xl mb-2">Thread Title</p>
                <TextField
                    sx={{ display: "flex" }}
                    name="thread_subject"
                    type="text"
                    label="Title"
                    size="small"
                    value={formik.values.thread_subject}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.thread_subject &&
                        Boolean(formik.errors.thread_subject)
                    }
                    helperText={
                        formik.touched.thread_subject &&
                        formik.errors.thread_subject
                    }
                />
                <p className="text-xl mt-4 mb-2">Content</p>
                <TextField
                    sx={{ display: "flex" }}
                    label="Post"
                    name="initial_post"
                    type="text"
                    multiline
                    value={formik.values.initial_post}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.initial_post &&
                        Boolean(formik.errors.initial_post)
                    }
                    helperText={
                        formik.touched.initial_post &&
                        formik.errors.initial_post
                    }
                />
                <div className="text-right pt-4">
                    <button onClick={refresh} class='form-btn'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
