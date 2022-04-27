import genUserStyles from "./GenerateUserInfo.module.scss";
import {
  Grid,
  Avatar,
  Card,
  CardHeader
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import NoteIcon from "@mui/icons-material/Note";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CreateBlogForm from '../CreateBlogForm/CreateBlogForm';

export default function GenerateUserInfo(props) {

  const { user, personals, threads, posts , blogs, userFollowing, userFollowers, deleteHandle, refresh, createBlog} = props

  const router = useRouter();

  const [thread, showThread] = useState(false);
  const [post, showPost] = useState(false);
  const [follower, showFollower] = useState(false);
  const [following, showFollowing] = useState(false);
  const [status, showStatus] = useState(false);
  const [blog, showBlogs] = useState(true)
  

  const displayPost = () => {
    showPost(true);
    showThread(false);
    showFollower(false);
    showFollowing(false);
    showStatus(false);
    showBlogs(false);
  };

  const displayThread = () => {
    showThread(true);
    showPost(false);
    showFollower(false);
    showStatus(false);
    showFollowing(false);
    showBlogs(false);
  };

  const displayFollowers = () => {
    showStatus(false);
    showFollower(true);
    showPost(false);
    showFollowing(false);
    showThread(false);
    showBlogs(false);
  };

  const displayFollowing = () => {
    showFollowing(true);
    showFollower(false);
    showPost(false);
    showThread(false);
    showStatus(false);
    showBlogs(false);
  };

  const displayPersonals = () => {
    showFollowing(false);
    showFollower(false);
    showPost(false);
    showThread(false);
    showStatus(true);
    showBlogs(false);
  };

  const displayBlogs = () => {
    showFollowing(false);
    showFollower(false);
    showPost(false);
    showThread(false);
    showStatus(false);
    showBlogs(true);
  };
  
  const renderBlogs = () => {
    return (
      <div>
      <CreateBlogForm username = {user.user.username} handler = {createBlog} refresh = {refresh} />
        <ul>
          {blogs.map((post) => {
            return (
              <li key={uuidv4()} style={{ listStyleType: "none" }}>
                <Card variant="outlined" className={genUserStyles.user__blog}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={user.user.img_path}
                        sx={{ width: 46, height: 46 }}
                      />
                    }
                    title={post.title}
                    onClick = {()=> router.push(`/blog/${post.id}`)}
                  />
                  <p className={genUserStyles.user__blog_content}>
                    {post.content}
                  </p>
                  <p className={genUserStyles.user__blog_created}>
                    <DeleteIcon
                      onClick={() => {
                        deleteHandle(
                          "http://localhost:7777/blog/delete",
                          post.id
                        );
                        refresh(
                          `http://localhost:7777/user/${user.user.username}/blogs`
                        );
                      }}
                    />
                    {post.created.slice(0, 10)}{" "}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </div> 
    )
  }

  const renderPersonals = () => {
    return (
      <div>
        <ul>
        {personals.map((posts) => {
          return (
            <li key={uuidv4()} style={{ listStyleType: "none" }}>
              <Card
                className={genUserStyles.user__personal_card}
                variant="outlined"
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt="user-img"
                      src={user.user.img_path}
                      sx={{ width: 46, height: 46 }}
                    />
                  }
                  title={user.user.username}
                />
                <h1 className={genUserStyles.user__personal_post}>
                  {posts.personal_post}
                </h1>
                <p className={genUserStyles.user__personal_created}>
                  <DeleteIcon
                    onClick={() => {
                      deleteHandle(
                        "http://localhost:7777/personal/delete",
                        posts.id
                      );
                      refresh(
                        `http://localhost:7777/user/${user.user.username}/personals`
                      );
                    }}
                  />
                  {posts.created.slice(0, 10)}
                </p>
              </Card>
            </li>
          );}
        )}
      </ul>
    </div>
    )    
  };

  const renderThreads = () => {
    return (
      <div className={genUserStyles.user__thread}>
        <ul>
          {threads.map((thread) => {
            return (
              <li key={uuidv4()}>
                <Card
                  className={genUserStyles.user__thread_card}
                  variant="outlined"
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={user.user.img_path}
                        sx={{ width: 46, height: 46 }}
                      />
                    }
                    title={thread.thread_subject}
                  />
                  <h1 className={genUserStyles.user__thread_initial}>
                    {thread.initial_post}
                  </h1>
                  <p className={genUserStyles.user__thread_created}>
                    <DeleteIcon
                      onClick={() => {
                        deleteHandle(
                          "http://localhost:7777/thread/delete",
                          thread.id
                        );
                        refresh(
                          `http://localhost:7777/user/${user.user.username}/threads`
                        );
                      }}
                    />
                    {thread.created.slice(0, 10)}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderPosts = () => {
    return (
      <div className={genUserStyles.user__thread}>
        <ul>
          {posts.map((post) => {
            return (
              <li key={uuidv4()}>
                <Card
                  className={genUserStyles.user__thread_card}
                  variant="outlined"
                  title="hello"
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={post.img_path}
                        sx={{ width: 46, height: 46 }}
                      />
                    }
                    title={post.thread_subject}
                    subheader={post.username}
                  />
                  <h1 className={genUserStyles.user__thread_initial}>
                    {post.content}
                  </h1>
                  <p className={genUserStyles.user__thread_created}>
                    <DeleteIcon
                      onClick={() => {
                        deleteHandle(
                          "http://localhost:7777/post/delete",
                          post.id
                        );
                        refresh(
                          `http://localhost:7777/user/${user.user.username}/posts`
                        );
                      }}
                    />
                    {post.created.slice(0, 10)}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderFollowers = () => {
    return (
      <div className={genUserStyles.user__follow}>
        <ul>
          <Grid container spacing={2}>
            {userFollowers.map((follower) => {
              return (
                <Grid key={uuidv4()} item xs={12} sm={6} md={6} lg={2}>
                  <li>
                    <Card
                      className={genUserStyles.user__follow_body}
                      variant="outlined"
                    >
                      <Avatar
                        alt="user-img"
                        sx={{ width: 56, height: 56, margin: "0 auto" }}
                      />
                      <h1
                        onClick={() => {
                          router.push(`/user/${follower.username}`);
                        }}
                        className={genUserStyles.user__follow_user}
                      >
                        {follower.username}
                      </h1>
                      <p className={genUserStyles.user__follow_bio}>
                        {" "}
                        {follower.bio}{" "}
                      </p>
                    </Card>
                  </li>
                </Grid>
              );
            })}
          </Grid>
        </ul>
      </div>
    );
  };

  const renderFollowing = () => {
    return (
      <div className={genUserStyles.user__follow}>
        <ul>
          <Grid container spacing={2}>
            {userFollowing.map((user) => {
              return (
                <Grid key={uuidv4()} item xs={12} sm={6} md={2}>
                  <li>
                    <Card
                      className={genUserStyles.user__follow_body}
                      variant="outlined"
                    >
                      <Avatar
                        alt="user-img"
                        src={user.img_path}
                        sx={{ width: 56, height: 56, margin: "0 auto" }}
                      />
                      <h1
                        onClick={() => {
                          router.push(`/user/${user.username}`);
                        }}
                        className={genUserStyles.user__follow_user}
                      >
                        {user.username}
                      </h1>
                      <p className ={genUserStyles.user__follow_bio}> {user.bio} </p>
                    </Card>
                  </li>
                </Grid>
              );
            })}
          </Grid>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Card
        variant="outlined"
        className={genUserStyles.user__options}
        style={{ boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}
      >
        <li onClick={displayBlogs} className={genUserStyles.user__options_list}>
          Personal <AccountCircleIcon htmlColor="#1976d2" />
        </li>
        <li
          onClick={displayPersonals}
          className={genUserStyles.user__options_list}
        >
          Status <TextsmsIcon htmlColor="#1976d2" />
        </li>
        <li
          onClick={displayThread}
          className={genUserStyles.user__options_list}
        >
          Threads <ForumIcon htmlColor="#1976d2" />
        </li>
        <li onClick={displayPost} className={genUserStyles.user__options_list}>
          Posts <NoteIcon htmlColor="#1976d2" />
        </li>
        <li
          onClick={displayFollowers}
          className={genUserStyles.user__options_list}
        >
          Followers <GroupIcon htmlColor="#1976d2" />
        </li>
        <li
          onClick={displayFollowing}
          className={genUserStyles.user__options_list}
        >
          Following <FollowTheSignsIcon htmlColor="#1976d2" />
        </li>
      </Card>

      {post ? renderPosts() : null}
      {thread ? renderThreads() : null}
      {status ? renderPersonals() : null}
      {blog ? renderBlogs() : null}
      {follower ? renderFollowers() : null}
      {following ? renderFollowing() : null}
    </>
  );
}