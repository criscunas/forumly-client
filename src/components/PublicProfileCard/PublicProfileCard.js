import pubCardStyles from "./PublicProfileCard.module.scss";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { v4 as uuidv4 } from "uuid";
import Link from 'next/link';

export default function PublicProfileCard(props) {
  const {
    user,
    posts,
    blogs,
    followings,
    unfollowHandle,
    followHandle,
    loggedin,
    followCount,
    followingCount
  } = props;

  const [blog, showBlogs] = useState(false);
  const [status, showStatus] = useState(true);

  const displayBlogs = () => {
    showBlogs(true);
    showStatus(false);
  };

  const displayStatus = () => {
    showStatus(true);
    showBlogs(false);
  };

  const renderFollowing = () => {
    const filterFollowing = followings.following.filter(
      (o1) => o1.username == user[0].username
    );

    const filterFollowers = followings.followers.filter(
      (o1) => o1.username == user[0].username
    );

    if (filterFollowing.length === 1 && filterFollowers.length === 1) {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={unfollowHandle} variant="contained" size="small">
            <PersonRemoveIcon />
          </Button>
        </div>
      );
    }

    if (filterFollowing.length === 1) {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={unfollowHandle} variant="contained" size="small">
            <PersonRemoveIcon />
          </Button>
        </div>
      );
    }
    if (filterFollowers.length === 1) {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={followHandle} variant="contained" size="small">
            <PersonAddAltIcon />
          </Button>
        </div>
      );
    } else {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={followHandle} variant="contained" size="small">
            <PersonAddAltIcon />
          </Button>
        </div>
      );
    }
  };

  const renderStatus = () => {
    return (
      <div
        style={{ backgroundColor: "white" }}
        className={pubCardStyles.public__userposts}
      >
        {posts.map((post, i) => {
          return (
            
              <Card
                key={uuidv4()}
                className={pubCardStyles.public__status}
              >
                <CardHeader
                  title={user[0].username}
                  titleTypographyProps={{ variant: "subtitle1" }}
                  subheader={post.created.slice(0,10)}
                  avatar={
                    <Avatar
                      alt="user-img"
                      src={user[0].img_path}
                      sx={{ width: 46, height: 46 }}
                    />
                  }
                />
                <CardContent className={pubCardStyles.public__status_content}>
                  <p className={pubCardStyles.public__status_text}>
                    {post.personal_post}
                  </p>
                </CardContent>
              </Card>
            
          );
        })}
      </div>
    );
  };

  const renderBlogs = () => {
    return (
      <div
        style={{ backgroundColor: "white" }}
        className={pubCardStyles.public__userposts}
      >
        {blogs.map((post) => {
          return (
            <Card
              key={uuidv4()}
              variant="outlined"
              className={pubCardStyles.public__status}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt="user-img"
                    src={user[0].img_path}
                    sx={{ width: 46, height: 46 }}
                  />
                }
                title={user[0].username}
                titleTypographyProps={{ variant: "subtitle1" }}
                subheader={post.created.slice(0, 10)}
              />
              <div className={pubCardStyles.public__blog_content}>
                <Link href={`/blog/${post.id}`}>
                  <a style = {{fontWeight: 500}} className={pubCardStyles.public__blog_title}>
                    {post.title}
                  </a>
                </Link>

                <p className={pubCardStyles.public__blog_descr}>
                  {post.content.slice(0, 500)} ...
                </p>
                <p className={pubCardStyles.public__blog_footer}></p>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={pubCardStyles.public}>
        <Grid container>
          <Grid item xs={12}>
            <div className={pubCardStyles.public__main}>
              <div className={pubCardStyles.public__main_img}>
                <Avatar
                  alt="user-img"
                  src={user[0].img_path}
                  sx={{ width: 75, height: 75 }}
                />
                {loggedin ? renderFollowing() : null}
              </div>
              <div className={pubCardStyles.public__main_bio}>
                <h1 className={pubCardStyles.public__main_username}>
                  {user[0].username}
                </h1>
                <p className={pubCardStyles.public__main_bio}>{user[0].bio}</p>
                <p className={pubCardStyles.public__main_created}>
                  {" "}
                  Member since {user[0].created.slice(0, 10)}
                </p>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <div className={pubCardStyles.public__followers}>
              <div className={pubCardStyles.public_followers_length}>
                {!followCount ? (
                  <p className={pubCardStyles.public_followers_num}> 0 </p>
                ) : (
                  <p className={pubCardStyles.public_followers_num}>
                    {followCount}
                  </p>
                )}
                <p className={pubCardStyles.public_followers_text}>Followers</p>
              </div>
              <div className={pubCardStyles.public_followers_length}>
                {!followingCount ? (
                  <p className={pubCardStyles.public_followers_num}> 0 </p>
                ) : (
                  <p className={pubCardStyles.public_followers_num}>
                    {followingCount}
                  </p>
                )}
                <p className={pubCardStyles.public_followers_text}>Followers</p>
              </div>
              <div className={pubCardStyles.public__followers_length}>
                <p className={pubCardStyles.public__followers_num}>
                  {posts.length}
                </p>
                <p className={pubCardStyles.public__followers_text}>Posts</p>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <p
              onClick={displayStatus}
              className={pubCardStyles.public__options_text}
            >
              Status
            </p>
          </Grid>

          <Grid item xs={6}>
            <p
              onClick={displayBlogs}
              className={pubCardStyles.public__options_text_right}
            >
              Blog Posts
            </p>
          </Grid>
        </Grid>
      </div>

      {blog ? renderBlogs() : null}
      {status ? renderStatus() : null}
    </>
  );
}
