import { withIronSessionSsr } from "iron-session/next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { sessionOptions } from "../../lib/session";
import axios from "axios";
import {
    CardHeader,
    Avatar,
    Card,
    Snackbar,
    SnackbarContent,
    Box,
    CircularProgress,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CreatePostComment from "../../src/components/CreatePostComment/CreatePostComment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
    params,
}) {
    const user = req.session.user;

    const id = params.id;

    const main = await fetch(`http://localhost:3050/post/${id}`);

    const mainPost = await main.json();

    if (user === undefined) {
        return {
            props: {
                user: { isLoggedIn: false },
                mainPost,
            },
        };
    }

    return {
        props: {
            user,
            mainPost,
        },
    };
},
sessionOptions);

export default function DiscussPage({ user, mainPost }) {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const Router = useRouter();
    const { id } = Router.query;
    const { mutate } = useSWRConfig();

    const { data: comments } = useSWR(`http://localhost:3050/post/allcomments/${id}`, fetcher);

    const isLoading = comments;

    const createComment = (values) => {
        let obj = {
            comment_body: values.comment_body,
            post_id: parseInt(id),
            thread_id: mainPost[0].thread_id,
        };

        axios
            .post("/post/comment", obj, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
            })
            .then(() => {
                mutate(`/post/allcomments/${parseInt(id)}`);
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteComment = (comment_id) => {
        axios
            .delete("/post/deleteComment", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
                data: {
                    comment_id: comment_id,
                },
            })
            .then(() => {
                mutate(`/post/allcomments/${parseInt(id)}`);
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const CrudAlert = () => {
        return (
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
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

    const linkTo = (url, txt) => {
        return (
            <Link href={url}>
                <a> {txt} </a>
            </Link>
        );
    };

    return (
        <div>
            <div className="px-4 pt-5 pb-2">
                <h1 className="section-header mb-2">
                    Responding to {mainPost[0].username}
                </h1>
                <Link href={`/thread/${mainPost[0].thread_id}`}>
                    <a className="text-white text-lg"> Go back </a>
                </Link>
            </div>
            <Card variant="outlined" className="m-4">
                <CardHeader
                    title={linkTo(
                        `/user/${mainPost[0].username}`,
                        mainPost[0].username
                    )}
                    titleTypographyProps={{
                        variant: "subtitle1",
                        fontWeight: "500",
                    }}
                    subheader={mainPost[0].created.slice(0, 10)}
                    style={{ cursor: "pointer" }}
                    avatar={
                        <Avatar
                            alt="user-img"
                            src={mainPost[0].img_path}
                            sx={{ width: 50, height: 50 }}
                        />
                    }
                />
                <p className="post-body">
                    {mainPost[0].content}
                </p>
            </Card>

            {!user.isLoggedIn ? null : (
                <div className="mx-4">
                    <CreatePostComment handler={createComment} />
                    {CrudAlert()}
                </div>
            )}

            {!isLoading ? (
                <div className="loading">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {comments.map((posts, i) => {
                        return (
                            <Card
                                key={uuidv4()}
                                variant="outlined"
                                className="relative m-4"
                            >
                                <CardHeader
                                    title={linkTo(
                                        `/user/${posts.username}`,
                                        posts.username
                                    )}
                                    subheader={posts.created.slice(0, 10)}
                                    style={{ cursor: "pointer" }}
                                    avatar={
                                        <Avatar
                                            alt="user-img"
                                            src={posts.img_path}
                                            sx={{ width: 46, height: 46 }}
                                        />
                                    }
                                />
                                <p
                                    className="post-content"
                                >
                                    {posts.comment_body}
                                </p>
                                {user.isLoggedIn ===
                                false ? null : user.username ==
                                  posts.username ? (
                                    <DeleteOutlinedIcon
                                        className="absolute right-[5%] top-[6%]"
                                        size="small"
                                        htmlColor="red"
                                        onClick={() => {
                                            deleteComment(posts.id);
                                        }}
                                    />
                                ) : null}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
