import {Snackbar, SnackbarContent } from "@material-ui/core";
import PublicProfileCard from "../../src/components/PublicProfileCard/PublicProfileCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { sessionOptions } from "../../lib/session";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const fetchFollow = (url, token) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
    params,
}) {
    const user = req.session.user;

    if (user === undefined) {
        return {
            props: {
                user: { isLoggedIn: false },
            },
        };
    }

    if (user.username == params.username) {
        res.setHeader("location", "/profile");
        res.statusCode = 302;
        res.end();
    }

    return {
        props: {
            user,
        },
    };
},
sessionOptions);

export default function PublicProfile({ user }) {
    const [open, setOpen] = useState(false);
    const Router = useRouter();
    const { username } = Router.query;

    const { data: profile } = useSWR(`http://localhost:3050/user/public/${username}`, fetcher);
    const { data: relations } = useSWR(
        user.isLoggedIn === true ? [`http://localhost:3050/follow/get`, user.auth] : null,
        fetchFollow
    );

    const { mutate } = useSWRConfig();

    const isLoading = profile && relations;

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
                            <p
                                style={{
                                    fontSize: "1rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                {" "}
                                Success !
                                <span>
                                    {" "}
                                    <CheckIcon />
                                </span>
                            </p>
                        }
                    />
                </Snackbar>
            </div>
        );
    };

    const followUser = () => {
        axios
            .post(
                "/follow",
                { id: profile.user[0].user_id },
                {
                    headers: {
                        Authorization: `Bearer ${user.auth}`,
                    },
                }
            )
            .then(() => {
                mutate(["/follow/get", user.auth]);
                mutate(`/user/public/${username}`);
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const unfollowUser = () => {
        axios
            .delete("/follow/unfollow", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
                data: {
                    id: profile.user[0].user_id,
                },
            })
            .then(() => {
                mutate(["/follow/get", user.auth]);
                mutate(`/user/public/${username}`);
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {!user.isLoggedIn ? (
                !profile ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <div className="bg-forumly_blk">
                            <PublicProfileCard
                                user={profile.user}
                                blogs={profile.blogs}
                                posts={profile.status}
                                loggedin={false}
                            />
                        </div>
                    </div>
                )
            ) : !isLoading ? (
                <div className="absolute top-0 bottom-0 left-0 right-0 m-auto">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <div className="bg-forumly_blk">
                        <PublicProfileCard
                            user={profile.user}
                            followCount={profile.followers}
                            followingCount={profile.followings}
                            blogs={profile.blogs}
                            posts={profile.status}
                            followings={relations}
                            followHandle={followUser}
                            unfollowHandle={unfollowUser}
                            loggedin={true}
                        />
                        {CrudAlert()}
                    </div>
                </div>
            )}
        </>
    );
}
