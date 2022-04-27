import { Formik, Form } from "formik";
import {
  Card,
  TextField,
  InputAdornment,
  Button,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import CreateBlogStyles from "./CreateBlogForm.module.scss";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

export default function CreatePostForm(props) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

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

  const {username , handler, refresh } = props;

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Posted Successfully !
        </Alert>
      </Snackbar>
      <Card className={CreateBlogStyles.blogCard}>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <p className={CreateBlogStyles.blogCard__header}> New Blog Post </p>
        </IconButton>
        <Collapse in={expanded} timeout="auto">
          <div>
            <Formik
              onSubmit={(values, { resetForm }) => {
                handler(values);
                refresh(`http://localhost:7777/user/${username}/blogs`)
                resetForm();
              }}
              initialValues={{
                title: "",
                content: "",
              }}
            >
              {(props) => (
                <div>
                  <Form
                    style={{ padding: "1rem" }}
                    onSubmit={props.handleSubmit}
                    className={CreateBlogStyles.blogCard__form}
                  >
                    <TextField
                      className={CreateBlogStyles.blogCard__form_input}
                      onChange={props.handleChange}
                      value={props.values.title}
                      name="title"
                      size="small"
                      type="text"
                      label="Post"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      className={CreateBlogStyles.blogCard__form_input}
                      onChange={props.handleChange}
                      value={props.values.content}
                      name="content"
                      size="medium"
                      type="text"
                      multiline
                      rows={5}
                      label="Post"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      style={{ margin: "1rem 0 0.5rem 0", maxWidth: "100px" }}
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
