import styles from "../styles/Login.module.scss";
import { useFormik } from "formik";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Box, TextField } from "@material-ui/core";

export default function LoginPage() {
    const [error, setError] = useState("");

    const { mutateUser } = useUser({
        redirectTo: "/dashboard",
        redirectIfFound: true,
    });

    async function logIn(values) {
        const body = {
            username: values.username,
            hashed_password: values.password,
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
            setError("Invalid username or Password");
        }
    }

    useEffect(() => {
        try {
            mutateUser(fetchJson("/api/user"));
        } catch (err) {
            console.log(err);
        }
    }, [mutateUser]);

    const LogInSchema = Yup.object({
        username: Yup.string().required("Username Required"),
        password: Yup.string().required("Password Required"),
    });

    const formik = useFormik({
        validationSchema: LogInSchema,
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values, { resetForm }) => {
            logIn(values);
            resetForm();
        },
    });

    return (
        <Box className={styles.login}>
            <div className={styles.login__container}>
                <form
                    onSubmit={formik.handleSubmit}
                    className={styles.login__form}
                >
                    <h1 className={styles.login__form_header}>
                        {" "}
                        Welcome Back <span aria-label="wave"> 👋🏼 </span>
                    </h1>
                    <p className={styles.login__form_error}> {error} </p>
                    <div className={styles.login__form_body}>
                        <TextField
                            className={styles.login__form_input}
                            label="Username"
                            name="username"
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.username &&
                                Boolean(formik.errors.username)
                            }
                            helperText={
                                formik.touched.username &&
                                formik.errors.username
                            }
                        />
                        <TextField
                            className={styles.login__form_input}
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <Button
                            type="submit"
                            size="medium"
                            variant="contained"
                            style={{
                                backgroundColor: "#0798ec",
                                color: "white",
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    );
}
