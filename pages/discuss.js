import CreateThread from "../src/components/CreateThread"
import GenerateThreads from "../src/components/GenerateThreads";
import axios from "axios";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { useState, useEffect } from "react";
import { Notification } from "../src/components/Notification";


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

export default function Discuss({ auth }) {

    const [open, setOpen] = useState(false);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true)

    const message = "Thread Created !"


    const fetchThreads = async () => {
        axios
            .get(`/thread/all`)
            .then(({data}) => {
                setLoading(false)
                setThreads(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchThreads()
    }, [])


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
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
                fetchThreads()
                setOpen(true);
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
                        <GenerateThreads threads={threads} auth={false} />
                    </div>
                </div>
            ) : (
                <div className="p-4 max-w-4xl before_tablet:pt-8 before_tablet:flex before_tablet:m-auto before_tablet:items-baseline">
                    <div className="md:w-[45%]">
                        <CreateThread
                            handler={createThread}
                        />
                        <Notification open={open} handle={handleClose} message={message} />
                    </div>
                    <div className="md:w-[55%]">
                        {!loading ? (
                            <div>
                                <GenerateThreads threads={threads} />
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    );
}
