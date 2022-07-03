import { Formik, Form } from "formik";
import {
    Card,
    TextField,
    Collapse,
} from "@mui/material";
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
        comment_body: Yup.string().required("Comment required"),
    });

    return (
        <Card>
            <IconButton
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
                <p className="post-header"> Comment </p>
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
                                style={{ padding: "1rem" }}
                                onSubmit={props.handleSubmit}
                                className="flex flex-col m-auto bg-white"
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
                                        Boolean(props.errors.comment_body)
                                    }
                                    helperText={
                                        props.touched.comment_body &&
                                        props.errors.comment_body
                                    }
                                />
                                <div className="mt-4 text-right">
                                <button type="submit" className="form-btn">Submit</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </Collapse>
        </Card>
    );
}
