import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { CardHeader, Avatar, Card } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Link from "next/link";

const MainThreadContent = (props, {username, refresh, deleteHandle, createHandle, loggedIn}) => {

    const { main } = props;

    const { thread, posts, comments } = main;

    const linkTo = (url, txt) => {
        return (
            <Link href={url}>
                <a> {txt} </a>
            </Link>
        );
    };

    return (
        <div>
            <Card variant="outlined" className="mt-4 mb-2">
                <CardHeader
                    title={linkTo(
                        `/user/${thread[0].username}`,
                        thread[0].username
                    )}
                    titleTypographyProps={{
                        variant: "subtitle1",
                        fontWeight: "500",
                    }}
                    subheader={thread[0].created.slice(0, 10)}
                    style={{ cursor: "pointer" }}
                    avatar={
                        <Avatar
                            alt="user-img"
                            src={thread[0].img_path}
                            sx={{ width: 55, height: 55 }}
                        />
                    }
                />
                <h1 className="pl-4 post-header">
                    {thread[0].thread_subject}
                </h1>
                <p className="post-body">
                    {thread[0].initial_post}
                </p>
            </Card>

            {loggedIn === true ? (
                <div className="py-2">
                    <CreatePostForm handler={createHandle} />
                </div>
            ) : null}

            <h1> </h1>

            <div className="flex flex-col gap-4 mt-4">
                {posts.map((post, i) => {
                    const commentLen = comments.filter(
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
                            <p className='post-body'>{post.content}</p>
                            <div className = "py-2 px-4">
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
                            </div>

                            {post.username === username ? (
                                <div className="pr-2 pb-2">
                                    <DeleteOutlineIcon
                                        size="small"
                                        htmlColor="red"
                                        onClick={() => {
                                            deleteHandle(post.id);
                                            refresh();
                                        }}
                                    />
                                </div>
                            ) : null}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default MainThreadContent;
