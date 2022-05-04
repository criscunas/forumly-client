import { useFormik} from "formik";
import editProfStyles from "./EditProfileForms.module.scss";
import {
  Button, 
  TextField
} from "@mui/material";
import * as Yup from 'yup';


export default function EditProfileForms(props) {

  const {handle, username, refresh } = props;
  const url = process.env.URL;

  const BioSchema = Yup.object({
    bio: Yup.string().required("Bio Required"),
  });


  const formik = useFormik({
    validationSchema : BioSchema,
    initialValues: {
      bio: "",
    },
    onSubmit : (values, { resetForm }) => {
      handle(values);
      refresh(`${url}/user/profile/${username}`);
      resetForm();
    }
  });

  return (
    <div className={editProfStyles.edit}>
      <form onSubmit={formik.handleSubmit}>
        <div className={editProfStyles.edit__form}>
          <TextField
            name="bio"
            type="text"
            placeholder="Edit Bio"
            multiline
            size="small"
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
          <Button
            className={editProfStyles.edit__form_button}
            type="submit"
            htmlColor="#60A5FA"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
