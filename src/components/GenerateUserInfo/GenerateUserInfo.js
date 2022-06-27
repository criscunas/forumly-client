import genUserStyles from "./GenerateUserInfo.module.scss";
import { Grid, Avatar, Card, CardHeader } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CreateBlogForm from "../CreateBlogForm/CreateBlogForm";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";

export default function GenerateUserInfo(props) {
    const {
        user,
        personals,
        threads,
        posts,
        blogs,
        userFollowing,
        userFollowers,
        deleteHandle,
        createBlog,
    } = props;

    const [userThread, showUserThread] = useState(false);
    const [userPost, showUserPost] = useState(true);
    const [follower, showFollower] = useState(false);
    const [postOptions, showPostOptions] = useState(false);
    const [following, showFollowing] = useState(false);
    const [status, showStatus] = useState(false);
    const [blog, showBlogs] = useState(true);

    const displayPost = () => {
        showPostOptions(true);
        showStatus(false);
        showFollowing(false);
        showFollower(false);
        showBlogs(false);
    };

    const displayFollowers = () => {
        showStatus(false);
        showFollower(true);
        showPostOptions(false);
        showFollowing(false);
        showBlogs(false);
    };

    const displayFollowing = () => {
        showFollowing(true);
        showFollower(false);
        showPostOptions(false);
        showStatus(false);
        showBlogs(false);
    };

    const displayPersonals = () => {
        showFollowing(false);
        showFollower(false);
        showPostOptions(false);
        showStatus(true);
        showBlogs(false);
    };

    const displayBlogs = () => {
        showFollowing(false);
        showFollower(false);
        showPostOptions(false);
        showStatus(false);
        showBlogs(true);
    };

    const linkTo = (url, txt) => {
        return (
            <Link href={url}>
                <a> {txt} </a>
            </Link>
        );
    };

    const renderBlogs = () => {
        return (
            <div>
                <CreateBlogForm handler={createBlog} />
                {blogs.length === 0 ? <p className='mt-12 text-center font-semibold text-lg'> Create a blog post to get started ! </p>
                : blogs.map((post) => {
                    return (
                        <Card
                            variant="outlined"
                            key={uuidv4()}
                            className={genUserStyles.user__blog}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={user.user.img_path}
                                        sx={{ width: 55, height: 55 }}
                                    />
                                }
                                title={linkTo(`/blog/${post.id}`, post.title)}
                                titleTypographyProps={{
                                    variant: "subtitle1",
                                }}
                                subheader={post.created.slice(0, 10)}
                                sx={{ cursor: "pointer" }}
                            />
                            <div className={genUserStyles.user__blog_preview}>
                                <Link href={`/blog/${post.id}`}>
                                    <a>{post.content.slice(0, 100)}... </a>
                                </Link>
                            </div>
                            <p className={genUserStyles.user__delete}>
                                <DeleteOutlinedIcon
                                    color="error"
                                    fontSize="small"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        deleteHandle(
                                            "/blog/delete",
                                            post.id,
                                            `/user/${user.user.username}/blogs`
                                        );
                                    }}
                                />
                            </p>
                        </Card>
                    );
                })}
            </div>
        );
    };

    const renderPersonals = () => {
        return (
            <div>
            {personals.length === 0 ? <p className='mt-12 text-center font-semibold text-lg'> Post a status update to get started ! </p>
                : personals.map((posts) => {
                    return (
                        <Card
                            key={uuidv4()}
                            className={genUserStyles.user__status}
                            variant="outlined"
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={user.user.img_path}
                                        sx={{ width: 55, height: 55 }}
                                    />
                                }
                                title={user.user.username}
                                titleTypographyProps={{ variant: "subtitle1" }}
                                subheader={posts.created.slice(0, 10)}
                            />
                            <p className={genUserStyles.user__status_post}>{posts.personal_post}</p>
                            <div className={genUserStyles.user__delete}>
                                <DeleteOutlinedIcon
                                    color="error"
                                    fontSize="small"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        deleteHandle(
                                            "/personal/delete",
                                            posts.id,
                                            `/user/${user.user.username}/personals`
                                        );
                                    }}
                                />
                            </div>
                        </Card>
                    );
                })}
            </div>
        );
    };

    const renderThreads = () => {
        return (
            <div>
            {threads.length === 0 ? <p className='mt-12 text-center font-semibold text-lg'> Create a thread to get started ! </p>
                : threads.map((thread) => {
                    return (
                        <Card
                            className={genUserStyles.user__threads}
                            variant="outlined"
                            key={uuidv4()}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={user.user.img_path}
                                        sx={{ width: 55, height: 55 }}
                                    />
                                }
                                title={linkTo(
                                    `/thread/${thread.id}`,
                                    thread.thread_subject
                                )}
                                titleTypographyProps={{ variant: "subtitle1" }}
                                subheader={thread.created.slice(0, 10)}
                                style={{ cursor: "pointer" }}
                            />
                            <p className={genUserStyles.user__threads_post}>
                                {thread.initial_post}
                            </p>
                            <p className={genUserStyles.user__delete}>
                                <DeleteOutlinedIcon
                                    fontSize="small"
                                    color="error"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        deleteHandle(
                                            "/thread/delete",
                                            thread.id,
                                            `/user/${user.user.username}/threads`
                                        );
                                    }}
                                />
                            </p>
                        </Card>
                    );
                })}
            </div>
        );
    };

    const renderPosts = () => {
        return (
            <div>
                {posts.length === 0 ? <p className='mt-12 text-center font-semibold text-lg'> Post on a thread to get started ! </p>
                    : posts.map((post) => {
                    return (
                        <Card
                            className={genUserStyles.user__threads}
                            variant="outlined"
                            key={uuidv4()}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={user.user.img_path}
                                        sx={{ width: 55, height: 55 }}
                                    />
                                }
                                title={"On: " + post.thread_subject}
                                titleTypographyProps={{ variant: "subtitle1" }}
                                subheader={post.created.slice(0, 10)}
                            />

                            <div className={genUserStyles.user__threads_post}>
                                <Link href={`/thread/${post.thread_id}`}>
                                    <a>{post.content}</a>
                                </Link>
                            </div>

                            <p className={genUserStyles.user__delete}>
                                <DeleteOutlinedIcon
                                    color="error"
                                    fontSize="small"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        deleteHandle(
                                            "/post/delete",
                                            post.id,
                                            `/user/${user.user.username}/posts`
                                        );
                                    }}
                                />
                            </p>
                        </Card>
                    );
                })}
            </div>
        );
    };

    const renderPostOptions = () => {
        return (
            <div className="mt-4">
                <Grid container className="text-center text-dark_blue">
                    <Grid
                        item
                        xs={6}
                        style={{ borderRight: "1px solid black" }}
                    >
                        <p
                            className = "text-base"
                            onClick={() => {
                                showUserPost(true);
                                showUserThread(false);
                            }}
                        >
                            User Posts
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                        <p
                        className = "text-base text-dark_blue"
                            onClick={() => {
                                showUserPost(false);
                                showUserThread(true);
                            }}
                        >
                            User Threads
                        </p>
                    </Grid>
                </Grid>

                <div className="my-4">
                    {userPost ? renderPosts() : null}
                    {userThread ? renderThreads() : null}
                </div>
            </div>
        );
    };

    const renderFollowers = () => {
        return (
            <div className="my-4">
                <h1 className="text-lg">Followers</h1>
                <Grid container spacing={1}>
                    {userFollowers.length === 0 ? <p> No followers yet. </p>
                    : userFollowers.map((follower) => {
                        return (
                            <Grid item xs={3} sm={4} key={uuidv4()}>
                                <div className="flex flex-col items-center gap-4">
                                    <Link href={`/user/${follower.username}`}>
                                        <a>
                                            <Avatar
                                                alt="user-img"
                                                src={follower.img_path}
                                                sx={{
                                                    width: 55,
                                                    height: 55,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </a>
                                    </Link>
                                    <p className="text-base">{follower.username}</p>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    };

    const renderFollowing = () => {
        return (
            <div className="my-4">
                <h1 className="text-xl">Following</h1>
                <Grid container spacing={1}>
                    {userFollowing.length === 0 ? <p> You don't follow anyone yet. </p>
                        :userFollowing.map((user) => {
                            return (
                                <Grid item xs={3} sm={4} key={uuidv4()}>
                                    <div className={genUserStyles.user__follow_box}>
                                        <Link href={`/user/${user.username}`}>
                                            <a>
                                            <Avatar
                                                alt="user-img"
                                                src={user.img_path}
                                                sx={{
                                                    width: 55,
                                                    height: 55,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </a>
                                    </Link>
                                    <p className="text-base">{user.username}</p>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    };

    return (
        <div className="">
            <div className ="flex py-2 justify-evenly gap-4 max-w-xl m-auto border-t-2 border-b-2 border-slate-400">
                <div className = 'text-xl' onClick={displayBlogs}> Blog </div>
                <div className = 'text-xl' onClick={displayPersonals} > Blurbs </div>
                <div className = 'text-xl' onClick={displayPost}> Posts </div>
            </div>

            <div className ="m-auto px-4">
                {postOptions ? renderPostOptions() : null}
                {status ? renderPersonals() : null}
                {blog ? renderBlogs() : null}
                {follower ? renderFollowers() : null}
                {following ? renderFollowing() : null}
            </div>
        </div>
    );
}
