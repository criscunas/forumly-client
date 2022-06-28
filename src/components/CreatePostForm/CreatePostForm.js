import { Formik, Form } from "formik";
import {TextField, Collapse } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";

export default function CreatePostForm({handler}) {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const PostSchema = Yup.object({
        content: Yup.string().required("Post required"),
    });

    return (
        <div className="bg-white rounded-lg">
            <IconButton
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
                <p className="text-lg pl-2">Create new post</p>
            </IconButton>
            <Collapse in={expanded} timeout="auto">
                <div>
                    <Formik
                        validationSchema={PostSchema}
                        onSubmit={(values, { resetForm }) => {
                            handler(values);
                            resetForm();
                        }}
                        initialValues={{
                            content: "",
                        }}
                    >
                        {(props) => (
                            <div className="px-4 py-2">
                                <Form className = "flex flex-col m-auto pb-4">
                                    <TextField
                                        onChange={props.handleChange}
                                        value={props.values.content}
                                        name="content"
                                        size="medium"
                                        type="text"
                                        multiline
                                        rows={5}
                                        label="Post"
                                        error={
                                            props.touched.content &&
                                            Boolean(props.errors.content)
                                        }
                                        helperText={
                                            props.touched.content &&
                                            props.errors.content
                                        }
                                    />
                                    <button className="mt-4 form-btn">Submit</button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </Collapse>
        </div>
    );
}
