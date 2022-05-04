import { Formik, Form } from "formik";
import {
  Card,
  TextField,
  InputAdornment,
  Button,
  Collapse,
} from "@mui/material";
import createPostStyles from "./CreatePostForm.module.scss";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import * as Yup from 'yup';



export default function CreatePostForm(props) {
  
  const {handler} = props;

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
    content: Yup.string().required('Post required')
  })

  return (
    <>
      <Card className={createPostStyles.postCard}>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <p className={createPostStyles.postCard__title}> Create new post </p>
        </IconButton>
        <Collapse in={expanded} timeout="auto">
          <div>
            <Formik
              validationSchema={PostSchema}
              onSubmit={(values, { resetForm }) => {
                handler(values)
                resetForm();
              }}
              initialValues={{
                content: "",
              }}
            >
              {(props) => (
                <div>
                  <Form
                    style={{ padding: "1rem" }}
                    onSubmit={props.handleSubmit}
                    className={createPostStyles.postCard__form}
                  >
                    <TextField
                      className={createPostStyles.postCard__form_input}
                      onChange={props.handleChange}
                      value={props.values.content}
                      name="content"
                      size="medium"
                      type="text"
                      multiline
                      rows={4}
                      label="Post"
                      error={
                        props.touched.content && Boolean(props.errors.content)
                      }
                      helperText={props.touched.content && props.errors.content}
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
