import {useFormik} from "formik";
import {
  Button,
  TextField
} from "@mui/material";
import statusFormStyles from "./CreateStatusForm.module.scss";
import * as Yup from 'yup';


export const CreateStatusForm = (props) => {

  const {handler,username,refresh} = props;

  const StatusSchema = Yup.object({
    personal_post: Yup.string().required("Status Required"),
  });


  const formik = useFormik({
    validationSchema: StatusSchema,
    initialValues: {
      personal_post: "",
    },
    onSubmit: (values, { resetForm }) => {
      handler(values)      
      refresh(`http://dgisvr.xyz/user/${username}/personals`);
      resetForm();
    },
  });

  return (
    <div className={statusFormStyles.status}>
      <form
        className={statusFormStyles.status__form}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          className={statusFormStyles.status__input}
          name="personal_post"
          type="text"
          size="small"
          label="Status"
          value={formik.values.personal_post}
          onChange={formik.handleChange}
          error={formik.touched.personal_post && Boolean(formik.errors.personal_post)}
          helperText={formik.touched.personal_post && formik.errors.personal_post}
        />
        <Button
          size="medium"
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#60A5FA" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
