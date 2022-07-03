import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import { CardHeader, Avatar, Card, TextField, Collapse } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";

const MainThreadContent = ({deleteHandle, handle, loggedIn, main, username }
) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const PostSchema = Yup.object({
        content: Yup.string().required("Post required"),
    });

    const linkTo = (url, txt) => {
        return (
            <Link href={url}>
                <a> {txt} </a>
            </Link>
        );
    };

    const formik = useFormik({
        validationSchema: PostSchema,
        initialValues: {
            content: "",
        },
        onSubmit: (values, { resetForm }) => {
            handle(values);
            resetForm();
        },
    });

    return (
        <div>
            <Card variant="outlined" className="mt-4 mb-2">
                <CardHeader
                    title={linkTo(
                        `/user/${main.thread[0].username}`,
                        main.thread[0].username
                    )}
                    titleTypographyProps={{
                        variant: "subtitle1",
                        fontWeight: "500",
                    }}
                    subheader={main.thread[0].created.slice(0, 10)}
                    style={{ cursor: "pointer" }}
                    avatar={
                        <Avatar
                            alt="user-img"
                            src={main.thread[0].img_path}
                            sx={{ width: 55, height: 55 }}
                        />
                    }
                />
                <h1 className="pl-4 content-title">
                    {main.thread[0].thread_subject}
                </h1>
                <p className="content">{main.thread[0].initial_post}</p>
            </Card>

            {loggedIn ? (
                <div className="py-2">
                    <div className="bg-white rounded-lg">
                        <IconButton
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                            <p className="text-lg pl-2">Create new post</p>
                        </IconButton>
                        <Collapse in={expanded} timeout="auto">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="flex flex-col max-w-[900px] m-auto gap-4 p-4"
                            >
                                <TextField
                                    name="content"
                                    type="text"
                                    label="Content"
                                    multiline
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.content &&
                                        Boolean(formik.errors.content)
                                    }
                                    helperText={
                                        formik.touched.content &&
                                        formik.errors.content
                                    }
                                />
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="px-3 py-2 rounded-lg bg-medium_blue text-white font-semibold"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </Collapse>
                    </div>
                </div>
            ) : null}

            <div className="flex flex-col gap-4 mt-2">
                {main.posts.map((post, i) => {
                    const commentLen = main.comments.filter(
                        (ele) => ele.post_id === post.id
                    );
                    return (
                        <Card key={uuidv4()} variant="outlined">
                            <CardHeader
                                title={linkTo(
                                    `/user/${post.username}`,
                                    post.username
                                )}
                                subheader={post.created.slice(0, 10)}
                                style={{ cursor: "pointer" }}
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={post.img_path}
                                        sx={{ width: 46, height: 46 }}
                                    />
                                }
                            />
                            <p className="content">{post.content}</p>
                            <div className="py-2  px-4 flex items-center justify-between">
                                {commentLen.length === 1 ? (
                                    <Link href={`/discuss/${post.id}`}>
                                        <a className="flex gap-2">
                                            <span>
                                                <CommentIcon fontSize="small" />{" "}
                                            </span>{" "}
                                            {commentLen.length} Comment
                                        </a>
                                    </Link>
                                ) : (
                                    <Link href={`/discuss/${post.id}`}>
                                        <a className="flex gap-2">
                                            <span>
                                                <CommentIcon fontSize="small" />{" "}
                                            </span>{" "}
                                            {commentLen.length} Comments
                                        </a>
                                    </Link>
                                )}
                                {post.username === username ? (
                                <div className="">
                                    <DeleteOutlineIcon
                                        size="small"
                                        htmlColor="red"
                                        onClick={() => {
                                            deleteHandle(post.id);
                                        }}
                                    />
                                </div>
                            ) : null}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default MainThreadContent;
