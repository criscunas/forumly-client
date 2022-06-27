import {
    Snackbar,
    SnackbarContent,
    CircularProgress,
} from "@material-ui/core";
import ProfileCard from "../src/components/ProfileCard/ProfileCard";
import GenerateUserInfo from "../src/components/GenerateUserInfo/GenerateUserInfo";
import axios from "axios";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import fetcher from "../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { useState, useMemo } from "react";
import CheckIcon from "@mui/icons-material/Check";

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
}) {
    const user = req.session.user;

    if (user === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                user: { isLoggedIn: false },
            },
        };
    }

    const { auth, username } = user;

    return {
        props: { auth, username },
    };
},
sessionOptions);

export default function Profile({ auth, username }) {
    const [open, setOpen] = useState(false);

    const config = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${auth}`,
                "Content-Type": "application/json",
            },
        }),
        [auth]
    );

    const { data: user } = useSWR(
        [`http://localhost:3050/user/profile/${username}`, config],
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const { mutate } = useSWRConfig();

    const refresh = () => {
        mutate([`http://localhost:3050/user/profile/${username}`, config]);
    };

    const sendImage = (img) => {
        axios
            .post("/user/uploadImage", img, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            })
            .then(() => {
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const createBlogPost = (values) => {
        axios
            .post("/blog/new", values, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            })
            .then(() => {
                refresh();
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteHandle = async (url, id, mutateUrl) => {
        await axios
            .delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
                data: {
                    id: id,
                },
            })
            .then(() => {
                setOpen(true);
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const postBio = (values) => {
        axios
            .post("/user/bio", values, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            })
            .then(() => {
                setOpen(true);
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isLoading = user;

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
                            <div className="text-lg flex justify-between items-center gap-2">
                                Success
                                <span>
                                    <CheckIcon />
                                </span>
                            </div>
                        }
                    />
                </Snackbar>
            </div>
        );
    };

    return (
        <>
            {!isLoading ? (
                <div className="text-center mt-12">
                        <CircularProgress />
                </div>
            ) : (
                <div className="bg-white h-screen">
                    <ProfileCard
                        userInfo={user}
                        bioHandle={postBio}
                        username={username}
                        refresh={refresh}
                        imgHandle={sendImage}

                    />
                    {CrudAlert()}
                    <GenerateUserInfo
                        personals={user.personals}
                        threads={user.threads}
                        posts={user.posts}
                        blogs={user.blog}
                        userFollowing={user.following}
                        userFollowers={user.followers}
                        deleteHandle={deleteHandle}
                        refresh={refresh}
                        user={user}
                        createBlog={createBlogPost}
                    />
                </div>
            )}
        </>
    );
}
