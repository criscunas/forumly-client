import { useFormik } from "formik";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {TextField } from "@material-ui/core";

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
                await fetchJson("api/login", {
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
            <div className="my-8 mx-4 rounded-lg">
                <form className="max-w-[500px] bg-white px-4 pb-6 m-auto" onSubmit={formik.handleSubmit}>
                    <h1 className="text-2xl text-center pt-6 text-dark_blue"> Welcome Back <span aria-label="wave"> 👋🏼 </span></h1>
                    <p className="text-red-500 text-center"> {error} </p>
                    <div className="flex flex-col gap-6">
                        <TextField
                            className="mt-4"
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
                            className="mt-4"
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
                        <button className="form-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    );
}
