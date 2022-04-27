import { Formik, Form } from "formik";
import { useState } from "react";
import editProfStyles from "./EditProfileForms.module.scss";
import {
  TextField,
  InputAdornment,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";


export default function EditProfileForms(props) {

  const {handle, username, refresh } = props;

  const alertNotif = () => {
    setAlert(true);
  };


  return (
    <div className={editProfStyles.edit}>
      <Formik
        onSubmit={(values, { resetForm }) => {
          handle(values);
          refresh(`http://localhost:7777/user/profile/${username}`)
          resetForm();
        }}
        initialValues={{
          bio: "",
        }}
      >
        {(props) => (
          <div className={editProfStyles.edit__form}>
            <Form onSubmit={props.handleSubmit} className={editProfStyles.edit__form_body}>
              <TextField
                onChange={props.handleChange}
                value={props.values.bio}
                name="bio"
                type="text"
                size="small"
                label="Biography"
                multiline
                rows={5}
                autoComplete="new"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <Button
                className={editProfStyles.edit__form_button}
                type="submit"
                variant="contained"
                onClick = {() => {
                  refresh(`http://localhost:7777/user/profile/${username}`)
                }}
              >
                Submit
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
