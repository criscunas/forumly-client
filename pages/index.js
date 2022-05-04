import homeStyles from '../styles/Home.module.scss';
import {TextField, Box, Button, InputAdornment} from "@material-ui/core";
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import Image from 'next/image';
import * as Yup from "yup";
import Typewriter from "typewriter-effect";

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

  const SignUpSchema = Yup.object({
    username: Yup.string().min(5, "Too Short!").max(30, "Too Long!"),
    email: Yup.string().required(" Email Required"),
    password: Yup.string()
      .min(5, "Must be at least 5 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Password Required"),
  });

  const formik = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      createUser(values);
      resetForm();
    },
  });

  return (
    <>
      <Box className={homeStyles.home}>
        <div className={homeStyles.home__hero}>
          <h1 className={homeStyles.home__hero_header}> digi. </h1>
          <p className={homeStyles.home__hero_subhead}>
            Frame your social space.
          </p>
        </div>

        <div className={homeStyles.home__welcome}>
          <div className={homeStyles.home__welcome_msg}>
            <Typewriter
              options={{
                strings: [
                  "Welcome to digi :)",
                  "digi is a platform that allows you to connect with other developers and tech enthusiasts. ",
                  "Host your blog, discuss the latest tech, follow other users & many more exciting features to come. Join our growing community today !",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 8,
                pauseFor: "4000ms",
              }}
            />
          </div>
          <div className={homeStyles.home__welcome_bot}>
            <Image src="/images/landingBot.jpg" height="250px" width="200px" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className={homeStyles.home__form}>
          <h1 className={homeStyles.home__form_header}>Lets Get You Started</h1>
          <TextField
            name="username"
            type="text"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              required: false,
              startAdornment: <InputAdornment position="start" />,
            }}
          />
          <Button
            type="submit"
            size="medium"
            variant="contained"
            style={{
              backgroundColor: "#112d4e",
              color: "white",
              borderRadius: 5,
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default Home;