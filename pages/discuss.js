import CreateThread from "../src/components/CreateThread/CreateThread";
import GenerateThreads from "../src/components/GenerateThreads/GenerateThreads";
import {Snackbar, SnackbarContent } from "@material-ui/core";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
}) {
    const user = req.session.user;

    if (user === undefined) {
        return {
            props: {
                isLoggedIn: false,
            },
        };
    }

    const { auth } = user;

    return {
        props: { auth },
    };
},
sessionOptions);

export default function Discuss({ fallbackData, auth }) {
    const [open, setOpen] = useState(false);

    const { mutate } = useSWRConfig();
    const { data } = useSwr("/thread/all", fetcher, {
        fallbackData,
    });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const CrudAlert = () => {
        return (
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <SnackbarContent
                        style={{ backgroundColor: "green" }}
                        message={
                            <p className="text-base flex justify-between items-center gap-2">
                                Success !
                                <span> <CheckIcon /></span>
                            </p>
                        }
                    />
                </Snackbar>
            </div>
        );
    };

    const refresh = () => {
        mutate("/thread/all");
    };

    const createThread = (values) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        };

        axios
            .post("/thread/create", values, {
                headers: headers,
            })
            .then(() => {
                setOpen(true);
                mutate("/thread/all");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {!auth ? (
                <div className="m-auto pt-4 md:flex md:gap-4 md:pt-8">
                    <div className="md:w-[35%]">
                        <h1 className="text-2xl p-4 text-dark_blue">
                            Sign up or sign in to start posting.
                        </h1>
                    </div>
                    <div className="md:w-[65%]">
                        <GenerateThreads threads={data} auth={false} />
                    </div>
                </div>
            ) : (
                <div className="m-auto pt-4 md:flex md:gap-4 md:pt-8">
                    <div className="md:w-[35%]">
                        <CreateThread
                            handler={createThread}
                            refresh={refresh}
                        />
                        {CrudAlert()}
                    </div>
                    <div className="md:w-[65%]">
                        {!data ? (
                            <p className="text-center text-xl"> No threads currently </p>
                        ) : (
                            <GenerateThreads threads={data} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
