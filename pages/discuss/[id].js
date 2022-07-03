import { withIronSessionSsr } from "iron-session/next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Notification } from "../../src/components/Notification";
import { sessionOptions } from "../../lib/session";
import axios from "axios";
import { CardHeader, Avatar, Card } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CreatePostComment from "../../src/components/CreatePostComment";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { CircularProgress } from "@material-ui/core";

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

    return {
        props: {
            user,
        },
    };
},
sessionOptions);

export default function DiscussPage({ user }) {
    const [open, setOpen] = useState(false);
    const [mainPost, setMainPost] = useState(false);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const Router = useRouter();
    const { id } = Router.query;

    const fetchMainPost = () => {
        axios
            .get(`/post/${id}`)
            .then(({ data }) => {
                setMainPost(data);
                setLoading(false);
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchComments = () => {
        axios
            .get(`/post/allcomments/${id}`)
            .then(({ data }) => {
                setComments(data);
                setLoading(false);
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchMainPost();
        fetchComments();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

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
                setMessage("Comment Posted");
                fetchComments()
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
                fetchComments();
                setMessage("Comment deleted");
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const linkTo = (url, txt) => {
        return (
            <Link href={url}>
                <a> {txt} </a>
            </Link>
        );
    };

    return (
        <div className="p-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
            {loading ? (
                <div className="loading">
                    {" "}
                    <CircularProgress />{" "}
                </div>
            ) : (
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
                        <p className="content">{mainPost[0].content}</p>
                    </Card>
                </div>
            )}

            {!user.isLoggedIn ? null : (
                <div className="mx-4">
                    <CreatePostComment handler={createComment} />
                    <Notification
                        handle={handleClose}
                        open={open}
                        message={message}
                    />
                </div>
            )}

            {comments.length === 0 ? (
                <div className="text-center text-white mt-8 font-semibold text-xl">
                    <p> No comments yet </p>
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
                                <p className="content">{posts.comment_body}</p>
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
