import loginStyles from "../styles/Login.module.scss";
import { Formik, Form } from "formik";
import {useRouter} from 'next/router';

import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import { useEffect } from "react";
import * as Yup from "yup";
import {
  Button,
  Box
} from "@material-ui/core";
import { TextField } from "../src/components/TextField";

const LogInSchema = Yup.object({
  username: Yup.string().required('Username Required'),
  password: Yup.string().required("Password Required"),
});

export default function LoginPage () {
  
  
  const {mutateUser} = useUser({
    redirectTo: "/dashboard" ,
    redirectIfFound: true ,
  });

  async function logIn(values) {
    
    const body = {
      username: values.username,
      hashed_password: values.password ,
    };

    try {
      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  }

  useEffect(() => {
    try {
      mutateUser(fetchJson("/api/user"));
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <Box>
      <Formik
      validationSchema={LogInSchema}
        onSubmit={async (values, { resetForm }) => {
          logIn(values);
          resetForm();
        }}
        initialValues={{
          username: "",
          password: "",
        }}
      >
        {() => (
          <div className={loginStyles.login}>
            <h1 className={loginStyles.login__header}> Welcome Back</h1>
            <Form className={loginStyles.login__body}>
              <TextField
                className={loginStyles.login__body__input}
                label="Username"
                name="username"
                type="text"
                />
              <TextField
                className={loginStyles.login__body__input}
                label="Password"
                name="password"
                type="password"
                />
              <Button type="submit" size = "small" variant="contained" style = {{backgroundColor : "#0798ec", color : "white"}}>
                Submit
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </Box>
  );
} 