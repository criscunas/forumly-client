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
import ForumIcon from "@mui/icons-material/Forum";
import NoteIcon from "@mui/icons-material/Note";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CreateBlogForm from '../CreateBlogForm/CreateBlogForm';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

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
                        sx={{ width: 60, height: 60 }}
                      />
                    }
                    title={post.title}
                    titleTypographyProps={{ variant: "subtitle1" }}
                    subheader={post.created.slice(0, 10)}
                    sx={{ cursor: "pointer" }}
                  />
                  <p
                    onClick={() => router.push(`/blog/${post.id}`)}
                    className={genUserStyles.user__blog_content}
                  >
                    {post.content}
                  </p>
                  <p className={genUserStyles.user__blog_created}>
                    <DeleteIcon
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
                      sx={{ width: 60, height: 60 }}
                    />
                  }
                  title={user.user.username}
                  titleTypographyProps = {{variant: "subtitle1"}}
                  subheader={posts.created.slice(0, 10)}
                />
                <p className={genUserStyles.user__personal_post}>
                  {posts.personal_post}
                </p>
                <p className={genUserStyles.user__personal_created}>
                  <DeleteIcon
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
                        sx={{ width: 60, height: 60 }}
                      />
                    }
                    title={thread.thread_subject}
                    titleTypographyProps={{ variant: "subtitle1" }}
                    subheader={thread.created.slice(0, 10)}
                  />
                  <p className={genUserStyles.user__thread_initial}>
                    {thread.initial_post}
                  </p>
                  <p
                    onClick={() => router.push(`/thread/${thread.id}`)}
                    className={genUserStyles.user__thread_delete}
                  >
                    <DeleteIcon
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
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={user.user.img_path}
                        sx={{ width: 60, height: 60 }}
                      />
                    }
                    title={post.thread_subject}
                    titleTypographyProps={{ variant: "subtitle1" }}
                    subheader={post.created.slice(0, 10)}
                  />
                  <p
                    onClick={() => router.push(`/thread/${post.thread_id}`)}
                    className={genUserStyles.user__thread_initial}
                  >
                    {post.content}
                  </p>
                  <p className={genUserStyles.user__thread_delete}>
                    <DeleteIcon
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
          <Grid container spacing={1}>
            {userFollowers.map((follower) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={uuidv4()}>
                  <li>
                    <Card
                      className={genUserStyles.user__follow_card}
                      variant="outlined"
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            alt="user-img"
                            src={follower.img_path}
                            sx={{ width: 60, height: 60 }}
                          />
                        }
                        title={follower.username}
                        sx={{ cursor: "pointer" }}
                        titleTypographyProps={{ variant: "h6" }}
                        subheader={follower.bio}
                        onClick={() =>
                          router.push(`/user/${follower.username}`)
                        }
                      />
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
                <Grid item xs={12} sm={6} md={4} key={uuidv4()}>
                  <li>
                    <Card
                      className={genUserStyles.user__follow_card}
                      variant="outlined"
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            alt="user-img"
                            src={follower.img_path}
                            sx={{ width: 60, height: 60 }}
                          />
                        }
                        sx={{ cursor: "pointer" }}
                        title={user.username}
                        titleTypographyProps={{ variant: "h6" }}
                        subheader={user.bio}
                        onClick={() => router.push(`/user/${user.username}`)}
                      />
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
        <Grid container spacing={1}>
          <Grid item xs={4} sm={2} onClick={displayBlogs}>
            <p className={genUserStyles.user__options_list}>
              Blogs
              <span>
                <LibraryBooksIcon htmlColor="#1976d2" />
              </span>
            </p>
          </Grid>
          <Grid item xs={4} sm={2} onClick={displayPersonals}>
            <p className={genUserStyles.user__options_list}>
              Status
              <span>
                <TextsmsIcon htmlColor="#1976d2" />
              </span>
            </p>
          </Grid>
          <Grid item xs={4} sm={2} onClick={displayThread}>
            <p className={genUserStyles.user__options_list}>
              Threads
              <span>
                <ForumIcon htmlColor="#1976d2" />
              </span>
            </p>
          </Grid>
          <Grid item xs={4} sm={2} onClick={displayPost}>
            <p className={genUserStyles.user__options_list}>
              Posts
              <span>
                <NoteIcon htmlColor="#1976d2" />
              </span>
            </p>
          </Grid>
          <Grid item xs={4} sm={2} onClick={displayFollowers}>
            <p className={genUserStyles.user__options_list}>
              Followers
              <span>
                <GroupIcon htmlColor="#1976d2" />
              </span>
            </p>
          </Grid>
          <Grid item xs={4} sm={2} onClick={displayFollowing}>
            <p className={genUserStyles.user__options_list}>
              Following
              <span>
                <FollowTheSignsIcon htmlColor="#1976d2" />
              </span>
            </p>
          </Grid>
        </Grid>
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
