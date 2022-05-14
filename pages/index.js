import homeStyles from '../styles/Home.module.scss';
import {TextField, Box, Button, Card, CardHeader, Grid, CardActions} from "@material-ui/core";
import {useFormik} from 'formik';
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from "yup";
import Typewriter from "typewriter-effect";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TerminalIcon from "@mui/icons-material/Terminal";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import {useState} from 'react'

export default function Home (){

  const [error, setError] = useState('')

  const NavTo = (url, avatar) => {
    return (
      <Link href={url}>
        <a>{avatar}</a>
      </Link>
    );
  };

    const Mailto = ({ email, subject, body, ...props }) => {
      return (
        <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
          {props.children}
        </a>
      );
    }; 
  

  const { mutateUser } = useUser({
    redirectTo: "/dashboard",
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
    } catch (error) {
      setError("Invalid username or email.");
    }
  };

  const usernameRegex = /^[A-Za-z0-9]+$/;

  const SignUpSchema = Yup.object({
    username: Yup.string()
      .matches(usernameRegex, "No spaces")
      .required("Username required")
      .min(4, "Too Short!")
      .max(15, "Too Long!"),
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
          <h1 className={homeStyles.home__hero_header}>
            forumly
          </h1>
          <p className={homeStyles.home__hero_subhead}>
            Frame your social space.
          </p>
        </div>

        <div className={homeStyles.home__welcome}>
          <div className={homeStyles.home__welcome_msg}>
            <Typewriter
              options={{
                strings: [
                  "Welcome to forumly",
                  "forumly is a platform that allows you to create, share & connect with everyone. ",
                  "Host your blog, create a conversation, follow other users plus many more features to come",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 10,
                pauseFor: "4000ms",
              }}
            />
          </div>
          <div className={homeStyles.home__welcome_bot}>
            <Image src="/images/landingBot.jpg" height="250px" width="200px" priority = "lazy" />
          </div>
        </div>
        <div className={homeStyles.home__bottom}>
          <form
            onSubmit={formik.handleSubmit}
            className={homeStyles.home__form}
          >
            <h1 className={homeStyles.home__form_header}>
              Lets Get You Started
            </h1>
            <p className={homeStyles.home__form_error}>{error}</p>
            <TextField
              name="username"
              type="text"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}

            />
            <TextField
              name="email"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            />
            <Button
              type="submit"
              size="medium"
              variant="contained"
              style={{
                backgroundColor: "#1C6E8C",
                color: "white",
                borderRadius: 5,
                marginTop: 2
              }}
            >
              Submit
            </Button>
          </form>
          <div className={homeStyles.home__about}>
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}>
              <CardHeader
                className={homeStyles.home__about_header}
                title="A little bit about us."
                titleTypographyProps={{ variant: "h5", gutterBottom: "true" }}
                subheader="We're new here."
              />
              <div className={homeStyles.home__about_text}>
                We are a new platform that allows users to create & share with
                each other. Users can create blog posts, create threads, post
                status updates, comment on posts, customize thier profile &
                follow other users to recieve a personal feed. We are in our
                early stages & constantly working to enhace your time here. I
                will be rolling out new features in the future. Feel free to
                contact me with any questions.
              </div>
              <CardActions
                style={{ textAlign: "center", margin: "0 0 0.5rem 0" }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    {NavTo(
                      "https://criscunas.dev",
                      <TerminalIcon fontSize="large" htmlColor="#1C6E8C" />
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {NavTo(
                      "https://github.com/criscunas",
                      <GitHubIcon fontSize="large" htmlColor="#1C6E8C" />
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {NavTo(
                      "https://www.linkedin.com/in/cristophercunas/",
                      <LinkedInIcon fontSize="large" htmlColor="#1C6E8C" />
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    <Mailto email="criscunas@criscunas.dev">
                      <AlternateEmailIcon
                        fontSize="large"
                        htmlColor="#1C6E8C"
                      />
                    </Mailto>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}>
              <CardHeader
                className={homeStyles.home__about_header}
                title="Getting Started"
                titleTypographyProps={{
                  variant: "h5",
                  fontWeight: "500",
                  gutterBottom: true 
                }}
                subheader="Creating an account is easier than ever. Simply fill out the signup form and your all set to go."

              />
              <dl>
                <dt className={homeStyles.home__about_dt}> Profile </dt>
                <dd className={homeStyles.home__about_dd}>
                  {" "}
                  Customize your profile with a public bio & a profile image.
                  You are able to manage all blog and post history as well as
                  see followers and who you follow.{" "}
                </dd>
                <dt className={homeStyles.home__about_dt}> Dashboard </dt>
                <dd className={homeStyles.home__about_dd}>
                  {" "}
                  Stay up to date with the world as we provide a feed with all
                  of the the latest headlines by top news sources. You will also
                  find a feed of all the people you follow and thier newest
                  status updates.{" "}
                </dd>
                <dt className={homeStyles.home__about_dt}> Discuss </dt>
                <dd className={homeStyles.home__about_dd}>
                  {" "}
                  Our discussion section allows users to create threads on any
                  topic they want to. Simply click on a thread and you'll be
                  taken to a main page for that conversation.{" "}
                </dd>
              </dl>
            </Card>
          </div>
        </div>
      </Box>
    </>
  );
}
