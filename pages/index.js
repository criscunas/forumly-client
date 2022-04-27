import homeStyles from '../styles/Home.module.scss';
import { Box, Container, Button} from "@material-ui/core";
import {Formik, Form, Field} from 'formik';
import {useRouter} from 'next/router';
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import * as Yup from "yup";
import {TextField} from '../src/components/TextField.js';

const SignupSchema = Yup.object({
  username: Yup.string().min(5, "Too Short!").max(30, "Too Long!"),
  email: Yup.string().required(" Email Required"),
  password: Yup.string()
    .min(5, "Must be at least 5 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password Required"),
});

export const Home = () => {

  const router = useRouter()

  const { mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });


  const createUser = async (data) => {
    const body = {
      username: data.username,
      hashed_password: data.password,
      email: data.email,
    };

    try {
      mutateUser(
        await fetchJson("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Container maxWidth="xl" disableGutters className={homeStyles.home}>
        <Box className={homeStyles.home__main}>
          <div className={homeStyles.home__welcome}>
            <h1 className={homeStyles.home__welcome__header}> digi. </h1>
            <p className={homeStyles.home__welcome__subhead}>
              Frame your social space.
            </p>
            <p className={homeStyles.home__welcome__subhead}>
              Join our growing community & get connected today.
            </p>
          </div>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { resetForm }) => {
              createUser(values)
              resetForm();
            }}
          >
            {() => (
              <div className={homeStyles.home__create}>
                <h1 className={homeStyles.home__create__header}> Lets Get You Started </h1>
                <Form className={homeStyles.home__create__form}>
                  <TextField
                    className={homeStyles.home__create__input}
                    label="Username"
                    name="username"
                    type="text"
                  />
                  <TextField
                    className={homeStyles.home__create__input}
                    label="Email"
                    name="email"
                    type="email"
                  />
                  <TextField
                    className={homeStyles.home__create__input}
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <TextField
                    className={homeStyles.home__create__input}
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <Button type='submit' size = "small" variant="contained" style = {{backgroundColor: "#112d4e", color : 'white', borderRadius: 5}}>
                    Submit
                  </Button>
                </Form>
              </div>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
}

export default Home;