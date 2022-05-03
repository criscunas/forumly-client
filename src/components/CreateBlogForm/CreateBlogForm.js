import { useFormik} from "formik";
import {
  Card,
  Button,
  Collapse,
  TextField
} from "@mui/material";
import CreateBlogStyles from "./CreateBlogForm.module.scss";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import * as Yup from 'yup';

export default function CreateBlogForm(props) {
  
  const [open, setOpen] = useState(false);
  
  const { username, handler, refresh } = props;

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
    <>
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
          <form
            onSubmit={formik.handleSubmit}
            className={CreateBlogStyles.blogCard__form}
          >
            <TextField
              name="title"
              label="Title"
              type="text"
              size="small"
              value={formik.values.title}
              onChange={formik.handleChange}
              FormHelperTextProps={{ focused: true }}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              name="content"
              type="text"
              label="Content"
              multiline
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <Button
              style={{
                margin: "0.5rem 0 0.5rem 0",
                maxWidth: "100px",
                backgroundColor: "#60A5FA",
              }}
              size="small"
              type="submit"
              variant="contained"
              onClick = {refresh(`http://137.184.241.88:3000/user/${username}/blogs`)}
            >
              Submit
            </Button>
          </form>
        </Collapse>
      </Card>
    </>
  );
}
