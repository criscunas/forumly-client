import pubCardStyles from './PublicProfileCard.module.scss';
import { Card, CardContent, CardHeader, Avatar, Grid, Button } from "@mui/material";
import {useState} from 'react';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ForumIcon from "@mui/icons-material/Forum";
import { v4 as uuidv4 } from "uuid";
import {useRouter} from 'next/router';
import profileCardStyles from '../ProfileCard/ProfileCard.module.scss'

export default function PublicProfileCard(props) {

  const {user , posts, blogs, followings, unfollowHandle, followHandle} = props;
  
  const [blog, showBlogs] = useState(false);
  const [status,showStatus] = useState(true)

  const router = useRouter()

  const displayBlogs = () => {
    showBlogs(true)
    showStatus(false)
  }

  const displayStatus = () => {
    showStatus(true)
    showBlogs(false)
  }

  const renderFollowing =  () => {

    const filterFollowing = followings.following.filter(
      (o1) => o1.username == user[0].username
    );
    
    const filterFollowers = followings.followers.filter(
      (o1) => o1.username == user[0].username
    );

    if (filterFollowing.length === 1 && filterFollowers.length === 1) {
      return (
        <div className= {pubCardStyles.public__button}>
          <Button onClick = {unfollowHandle} variant = "contained"
          size = "small" >
            <PersonRemoveIcon />
          </Button>
        </div>
      );
    }

    if (filterFollowing.length === 1) {
      return (
        <div className= {pubCardStyles.public__button}>
          <Button onClick = {unfollowHandle} variant = "contained" size = "small" >
            <PersonRemoveIcon/>
          </Button>
        </div>
      );
    }
    if (filterFollowers.length === 1) {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={followHandle} variant ="contained" size = "small" >
            <PersonAddAltIcon />
          </Button>
        </div>
      );    
    }

    else {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={followHandle} variant = "contained" size = "small" >
            <PersonAddAltIcon />
          </Button>
        </div>
      );
    }

  }


  const renderStatus = () => {
    return (
      <div style ={{backgroundColor: "white"}} >
        {posts.map((post, i) => {
          return (
            <>
              <Card
                key={i}
                variant="outlined"
                className={pubCardStyles.public__status}
                sx={{
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}
              >
                <CardHeader
                  title={user[0].username}
                  titleTypographyProps={{ variant: "subtitle1" }}
                  subheader={post.created.slice(11, 19)}
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
            </>
          );
        })}
      </div>
    );
  }

  const renderBlogs = () => {
    return (
      <div style ={{backgroundColor: "white"}} >
          {blogs.map((post) => {
            return (
              <Card
                key={uuidv4()}
                variant="outlined"
                className={pubCardStyles.public__blog}
                sx={{
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}
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
                  subheader={post.created.slice(11, 19)}
                />
                <div className={pubCardStyles.public__blog_content}>
                  <h1
                    onClick={() => router.push(`/blog/${post.id}`)}
                    className={pubCardStyles.public__blog_title}
                  >
                    {post.title}
                  </h1>
                  <p className={pubCardStyles.public__blog_descr}>
                    {post.content.slice(0, 350)} ...
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
      <div className={profileCardStyles.profilecard}>
        <Grid container>
          <Grid item xs={12} className={pubCardStyles.public__card}>
            <Avatar alt="user-img" src = {user[0].img_path} sx={{ width: 75, height: 75 }} />
            <div className={pubCardStyles.public__bio}>
              <h1 className={pubCardStyles.public__username}>
                {user[0].username}
              </h1>
              <p className={pubCardStyles.public__bio_text}>{user[0].bio}</p>
              {renderFollowing()}
            </div>
          </Grid>
        </Grid>

        <Grid container className={profileCardStyles.profilecard__followers}>
          <Grid item xs={4} sx={{ borderRight: "1px solid white" }}>
            <div className={profileCardStyles.profilecard__followers_length}>
              <p className={profileCardStyles.profilecard__followers_num}>
                {followings.followers.length}
              </p>
              <p className={profileCardStyles.profilecard__followers_text}>
                Followers
              </p>
            </div>
          </Grid>
          <Grid item xs={4} sx={{ borderRight: "1px solid white" }}>
            <div className={profileCardStyles.profilecard__followers_length}>
              <p className={profileCardStyles.profilecard__followers_num}>
                {followings.following.length}
              </p>
              <p className={profileCardStyles.profilecard__followers_text}>
                Following
              </p>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={profileCardStyles.profilecard__followers_length}>
              <p className={profileCardStyles.profilecard__followers_num}>
                {posts.length}
              </p>
              <p className={profileCardStyles.profilecard__followers_text}>
                Posts
              </p>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container className={pubCardStyles.public__options}>
          <Grid item xs={6} style = {{borderRight: "1px solid black"}} >
            <p onClick = {displayStatus} className={pubCardStyles.public__options_text}>Status</p>
          </Grid>
          <Grid item xs={6}>
            <p onClick = {displayBlogs} className={pubCardStyles.public__options_text}>Recent Posts</p>
          </Grid>
        </Grid>
      </div>

      {blog ? renderBlogs() : null}
      {status ? renderStatus() : null}
    </>
  );
}
