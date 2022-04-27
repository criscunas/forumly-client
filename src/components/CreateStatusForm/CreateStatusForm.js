import { Formik, Form } from "formik";
import {
  TextField,
  InputAdornment,
  Button,
  Card,
} from "@mui/material";
import statusFormStyles from "./CreateStatusForm.module.scss";


export const CreateStatusForm = (props) => {

  const {handler,username,refresh} = props;

  return (
    <div className={statusFormStyles.status}>
      <Formik
        onSubmit={(values, { resetForm }) => {
          handler(values);
          refresh(`http://localhost:7777/user/${username}/personals`);
          resetForm();
        }}
        initialValues={{
          personal_post: "",
        }}
      >
        {(props) => (
          <>
            <Form
              style={{ maxWidth: "600px" }}
              onSubmit={props.handleSubmit}
              className={statusFormStyles.status__form}
            >
              <TextField
                className={statusFormStyles.status__input}
                onChange={props.handleChange}
                value={props.values.personal_post}
                name="personal_post"
                size="small"
                type="text"
                label="Status"
              />
              <Button
                size="medium"
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#1976d2" }}
              >
                Submit
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
