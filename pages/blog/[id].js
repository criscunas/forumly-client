import {
    Box,
    CardHeader,
    Card,
    CardContent,
    Avatar,
    Snackbar,
    SnackbarContent,
    CircularProgress,
} from "@material-ui/core";
import { useRouter } from "next/router";
import CreateBlogComment from "../../src/components/CreateBlogComment/CreateBlogComment";
import { v4 as uuidv4 } from "uuid";
import { sessionOptions } from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import Link from "next/link";

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
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

export default function BlogPage({ user }) {
    const [open, setOpen] = useState(false);

    const Router = useRouter();
    const { id } = Router.query;

    const { data: blogs } = useSWR(
        `http://localhost:3050/blog/find/${id}`,
        fetcher
    );
    const isLoading = blogs;

    const { mutate } = useSWRConfig();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const CrudAlert = () => {
        return (
            <Box>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <SnackbarContent
                        style={{ backgroundColor: "green" }}
                        message={
                            <p className="text-base flex items-center justify-between gap-2">
                                Success !
                                <span>
                                    <CheckIcon />
                                </span>
                            </p>
                        }
                    />
                </Snackbar>
            </Box>
        );
    };

    const createBlogComment = (values) => {
        let obj = {
            comment: values.comment_body,
            blog_id: id,
        };

        axios
            .post("blog/comment", obj, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
            })
            .then(() => {
                mutate(`blog/find/${id}`);
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteBlogComment = (comment_id) => {
        axios
            .delete("blog/comment/delete", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
                data: {
                    comment_id: comment_id,
                },
            })
            .then(() => {
                mutate(`blog/find/${id}`);
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
        <>
            {!isLoading ? (
                <div className="loading">
                    {" "}
                    <CircularProgress />{" "}
                </div>
            ) : (
                <div className="my-8 mx-4">
                    <Card className="m-auto">
                        <CardHeader
                            avatar={
                                <Avatar
                                    alt="user-img"
                                    src={blogs.user[0].img_path}
                                    style={{ height: 65, width: 65 }}
                                />
                            }
                            title={linkTo(
                                `/user/${blogs.user[0].username}`,
                                blogs.user[0].username
                            )}
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <CardContent>
                            <h1 className="post-header">
                                {blogs.post[0].title}
                            </h1>
                            <p className="pb-4">
                                Posted on {blogs.post[0].created.slice(0, 10)}{" "}
                            </p>
                            <p className="post-body px-0">
                                {" "}
                                {blogs.post[0].content}{" "}
                            </p>
                        </CardContent>
                    </Card>

                    <div className="my-4">
                        {!user.isLoggedIn ? null : (
                            <CreateBlogComment handler={createBlogComment} />
                        )}
                        {CrudAlert()}
                        {blogs.comments.map((posts, i) => {
                            return (
                                <Card
                                    key={uuidv4()}
                                    variant="outlined"
                                    className="relative my-4"
                                >
                                    <CardHeader
                                        title={linkTo(
                                            `/user/${posts.username}`,
                                            posts.username
                                        )}
                                        subheader={posts.created.slice(11, 19)}
                                        style={{ cursor: "pointer" }}
                                        avatar={
                                            <Avatar
                                                alt="user-img"
                                                src={posts.img_path}
                                                sx={{
                                                    width: 46,
                                                    height: 46,
                                                }}
                                            />
                                        }
                                    />
                                    <p className="post-body">
                                        {" "}
                                        {posts.comment_body}
                                    </p>
                                    {posts.username !== user.username ? null : (
                                        <DeleteOutlinedIcon
                                            className="absolute right-[3%] top-[5%]"
                                            size="small"
                                            htmlColor="red"
                                            onClick={() => {
                                                deleteBlogComment(posts.id);
                                            }}
                                        />
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
