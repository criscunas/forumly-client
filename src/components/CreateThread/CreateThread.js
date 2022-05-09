import createThreadStyles from "./CreateThread.module.scss";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
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
    <Box className={createThreadStyles.createThread}>
      <p className={createThreadStyles.createThread__header}>Create New</p>
      <form
        onSubmit={formik.handleSubmit}
        className={createThreadStyles.createThread__form}
      >
        <TextField
          sx={{ display: "flex" }}
          name="thread_subject"
          type="text"
          label="Subject"
          size="small"
          value={formik.values.thread_subject}
          onChange={formik.handleChange}
          error={
            formik.touched.thread_subject &&
            Boolean(formik.errors.thread_subject)
          }
          helperText={
            formik.touched.thread_subject && formik.errors.thread_subject
          }
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
        <p className={createThreadStyles.createThread__subhead}>
          Describe your topic well, while keeping it short as possible.{" "}
        </p>
        <TextField
          sx={{ display: "flex" }}
          label="Post"
          name="initial_post"
          type="text"
          multiline
          value={formik.values.initial_post}
          onChange={formik.handleChange}
          error={
            formik.touched.initial_post && Boolean(formik.errors.initial_post)
          }
          helperText={formik.touched.initial_post && formik.errors.initial_post}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
        <div className={createThreadStyles.createThread__button}>
          <Button
            onClick={refresh}
            size="small"
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}
