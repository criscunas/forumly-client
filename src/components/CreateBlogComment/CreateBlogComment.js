import { Formik, Form } from "formik";
import { Card, TextField, Collapse } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";

export default function CreateBlogComment({handler}) {

    const [open, setOpen] = useState(false);
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

    const PostSchema = Yup.object({
        comment_body: Yup.string().required("Comment required"),
    });

    return (
        <>
            <Card>
                <IconButton
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                    <p className="pl-4 text-lg">Comment</p>
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
                                comment_body: "",
                            }}
                        >
                            {(props) => (
                                    <Form
                                        onSubmit={props.handleSubmit}
                                        className="flex flex-col m-auto p-4"
                                    >
                                        <TextField
                                            onChange={props.handleChange}
                                            value={props.values.comment_body}
                                            name="comment_body"
                                            size="medium"
                                            type="text"
                                            multiline
                                            label="Comment"
                                            error={
                                                props.touched.comment_body &&
                                                Boolean(
                                                    props.errors.comment_body
                                                )
                                            }
                                            helperText={
                                                props.touched.comment_body &&
                                                props.errors.comment_body
                                            }
                                        />
                                        <button className = "form-btn mt-4">
                                            Submit
                                        </button>
                                    </Form>

                            )}
                        </Formik>
                    </div>
                </Collapse>
            </Card>
        </>
    );
}
