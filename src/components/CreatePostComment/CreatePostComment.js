import { Formik, Form } from "formik";
import {
  Card,
  TextField,
  InputAdornment,
  Button,
  Collapse,

} from "@mui/material";
import createPostCommentStyles from "./CreatePostComment.module.scss";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";

export default function CreatePostForm(props) {
  const { handler} = props;

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
      <Card className={createPostCommentStyles.postCard}>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <p className={createPostCommentStyles.postCard__title}> Comment </p>
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
                <div>
                  <Form
                    style={{ padding: "1rem" }}
                    onSubmit={props.handleSubmit}
                    className={createPostCommentStyles.postCard__form}
                  >
                    <TextField
                      className={createPostCommentStyles.postCard__form_input}
                      onChange={props.handleChange}
                      value={props.values.comment_body}
                      name="comment_body"
                      size="medium"
                      type="text"
                      multiline
                      label="Comment"
                      error={
                        props.touched.comment_body && Boolean(props.errors.comment_body)
                      }
                      helperText={props.touched.comment_body && props.errors.comment_body}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      style={{
                        margin: "1rem 0 0.5rem 0",
                        maxWidth: "175px",
                        alignSelf: "flex-end",
                      }}
                      size="small"
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </Collapse>
      </Card>
    </>
  );
}
