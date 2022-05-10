import genUserStyles from "./GenerateUserInfo.module.scss";
import { Grid, Avatar, Card, CardHeader } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateBlogForm from "../CreateBlogForm/CreateBlogForm";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import profileCardStyles from "../ProfileCard/ProfileCard.module.scss";

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
    refresh,
    createBlog,
  } = props;

  const Router = useRouter();

  const [userThread, showUserThread] = useState(false);
  const [userPost, showUserPost] = useState(true);
  const [follower, showFollower] = useState(false);
  const [postOptions, showPostOptions] = useState(false)
  const [following, showFollowing] = useState(false);
  const [status, showStatus] = useState(false);
  const [blog, showBlogs] = useState(true);

  const displayPost = () => {
    showPostOptions(true);
    showStatus(false);
    showBlogs(false);
  };

  const displayThread = () => {
    showPostOptions(false);
    showFollower(false);
    showStatus(false);
    showFollowing(false);
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

  const renderBlogs = () => {
    return (
      <div>
        <CreateBlogForm handler = {createBlog}/>
        {blogs.map((post) => {
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
                title={post.title}
                titleTypographyProps={{
                  variant: "subtitle1"
                }}
                subheader={post.created.slice(0, 10)}
                sx={{ cursor: "pointer" }}
                onClick={() => Router.push(`/blog/${post.id}`)}
              />
              <p className={genUserStyles.user__blog_preview}>
                {post.content.slice(0,100)}...
              </p>
              <p className={genUserStyles.user__delete}>
                <DeleteOutlinedIcon
                  color = "error"
                  fontSize = "small"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteHandle(
                      "https://dgisvr.xyz/blog/delete",
                      post.id,
                      `https://dgisvr.xyz/user/${user.user.username}/blogs`
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
          {personals.map((posts) => {
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
                  <p className={genUserStyles.user__status_post}>
                    {posts.personal_post}
                  </p>
                  <p className={genUserStyles.user__delete}>
                    <DeleteOutlinedIcon
                      color="error"
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteHandle(
                          "https://dgisvr.xyz/personal/delete",
                          posts.id,
                          `https://dgisvr.xyz/user/${user.user.username}/personals`
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

  const renderThreads = () => {
    return (
      <div>
          {threads.map((thread) => {
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
                  onClick={() => Router.push(`/thread/${thread.id}`)}
                  title={thread.thread_subject}
                  titleTypographyProps={{ variant: "subtitle1" }}
                  subheader={thread.created.slice(0, 10)}
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
                        "https://dgisvr.xyz/thread/delete",
                        thread.id,
                        `https://dgisvr.xyz/user/${user.user.username}/threads`
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
        {posts.map((post) => {
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
                title={post.thread_subject}
                titleTypographyProps={{ variant: "subtitle1" }}
                subheader={post.created.slice(0, 10)}
              />
              <p
                onClick={() => Router.push(`/thread/${post.thread_id}`)}
                className={genUserStyles.user__threads_post}
              >
                {post.content}
              </p>
              <p className={genUserStyles.user__delete}>
                <DeleteOutlinedIcon
                  color="error"
                  fontSize="small"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteHandle(
                      "https://dgisvr.xyz/post/delete",
                      post.id,
                      `https://dgisvr.xyz/user/${user.user.username}/posts`
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
      <div className={genUserStyles.user__posts}>
        <Grid container className={genUserStyles.user__posts_options}>
          <Grid item xs={6} style={{ borderRight: "1px solid black" }}>
            <p onClick = {() => {
              showUserPost(true)
              showUserThread(false)
            }} > User Posts</p>
          </Grid>
          <Grid item xs={6}>
            <p onClick = {() => {
              showUserPost(false)
              showUserThread(true)
            }} > User Threads</p>
          </Grid>
        </Grid>

        <div className = {genUserStyles.user__posts_body}>
          {userPost ? renderPosts() : null}
          {userThread ? renderThreads() :null}
        </div> 
      </div>
    );
  };

  const renderFollowers = () => {
    return (
      <div className={genUserStyles.user__follow}>
        <h1 className={genUserStyles.user__follow_header}> Followers </h1>
        <Grid container spacing={1}>
          {userFollowers.map((follower) => {
            return (
              <Grid item xs={3} sm={4} key={uuidv4()}>
                <div className={genUserStyles.user__follow_box}>
                  <Avatar
                    alt="user-img"
                    src={follower.img_path}
                    sx={{ width: 45, height: 45, cursor: "pointer" }}
                    onClick={() => Router.push(`/user/${follower.username}`)}
                  />
                  <p className={genUserStyles.user__follow_user}>
                    {follower.username}
                  </p>
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
      <div className={genUserStyles.user__follow}>
        <h1 className={genUserStyles.user__follow_header}> Following </h1>
        <Grid container spacing={1}>
          {userFollowing.map((user) => {
            return (
              <Grid item xs={3} sm={4} key={uuidv4()}>
                <div className={genUserStyles.user__follow_box}>
                  <Avatar
                    alt="user-img"
                    src={user.img_path}
                    sx={{ width: 45, height: 45, cursor: "pointer" }}
                    onClick={() => Router.push(`/user/${follower.username}`)}
                  />
                  <p className={genUserStyles.user__follow_user}>
                    {user.username}
                  </p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  return (
    <>
      <Grid container className={profileCardStyles.profilecard__followers}>
        <Grid item xs={4} sx={{ borderRight: "1px solid white" }}>
          <div className={profileCardStyles.profilecard__followers_length}>
            <p className={profileCardStyles.profilecard__followers_num}>
              {userFollowers.length}
            </p>
            <p
              onClick={displayFollowers}
              className={profileCardStyles.profilecard__followers_text}
            >
              Followers
            </p>
          </div>
        </Grid>
        <Grid item xs={4} sx={{ borderRight: "1px solid white" }}>
          <div className={profileCardStyles.profilecard__followers_length}>
            <p
              onClick={displayFollowing}
              className={profileCardStyles.profilecard__followers_num}
            >
              {userFollowing.length}
            </p>
            <p className={profileCardStyles.profilecard__followers_text}>
              Following
            </p>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={profileCardStyles.profilecard__followers_length}>
            <p className={profileCardStyles.profilecard__followers_num}>0</p>
            <p className={profileCardStyles.profilecard__followers_text}>
              Posts
            </p>
          </div>
        </Grid>
      </Grid>

      <Grid container sx={{ backgroundColor: "#28282B" }}>
        <Grid item xs={12}>
          <div className={genUserStyles.user__options}>
            <p
              onClick={displayBlogs}
              className={genUserStyles.user__options_list}
            >
              Blog
            </p>
            <p
              onClick={displayPersonals}
              className={genUserStyles.user__options_list}
            >
              Status
            </p>
            <p
              onClick={displayPost}
              className={genUserStyles.user__options_list}
            >
              Posts
            </p>
          </div>
        </Grid>
      </Grid>

      <div className={genUserStyles.user__content}>
        {postOptions ? renderPostOptions() : null}
        {status ? renderPersonals() : null}
        {blog ? renderBlogs() : null}
        {follower ? renderFollowers() : null}
        {following ? renderFollowing() : null}
      </div>
    </>
  );
}
