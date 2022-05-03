import pubCardStyles from './PublicProfileCard.module.scss';
import { Card, CardContent, CardHeader, Avatar, Button, CardActions } from "@mui/material";
import {useState} from 'react';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ForumIcon from "@mui/icons-material/Forum";
import { v4 as uuidv4 } from "uuid";
import {useRouter} from 'next/router';


export default function PublicProfileCard(props) {

  const {user , posts, blogs, followings, unfollowHandle, followHandle} = props;
  
  const [blog, showBlogs] = useState(true);
  const [status,showStatus] = useState(false)

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
          <p className = {pubCardStyles.public__button_text}> You follow each other ! </p>
        </div>
      );
    }

    if (filterFollowing.length === 1) {
      return (
        <div className= {pubCardStyles.public__button}>
          <Button onClick = {unfollowHandle} variant = "contained" size = "small" >
            <PersonRemoveIcon/>
          </Button>
          <p className = {pubCardStyles.public__button_text}> You follow {user[0].username} </p>
        </div>
      );
    }
    if (filterFollowers.length === 1) {
      return (
        <div className={pubCardStyles.public__button}>
          <Button onClick={followHandle} variant ="contained" size = "small" >
            <PersonAddAltIcon />
          </Button>
          <p className = {pubCardStyles.public__button_text}> {user[0].username} follows you. </p>
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
      <>
        {posts.map((post, i) => {
          return (
            <>
              <Card
                key = {i}
                variant="outlined"
                className={pubCardStyles.public__status}
                sx={{
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}
              >
                <CardHeader
                  title={user[0].username}
                  avatar={
                    <Avatar
                      alt="user-img"
                      src={user[0].img_path}
                      sx={{ width: 46, height: 46 }}
                    />
                  }
                />
                <p
                  style={{ padding: "0.5rem 1rem" }}
                  className={pubCardStyles.public__status_text}
                >
                  {post.personal_post}
                </p>
                <CardContent className={pubCardStyles.public__status_time}>
                  {post.created.slice(11, 19)}
                </CardContent>
              </Card>
            </>
          );
        })}
      </>
    );
  }

  const renderBlogs = () => {
    return (
      <div>
        <ul>
          {blogs.map((post) => {
            return (
              <li key={uuidv4()} style={{ listStyleType: "none" }}>
                <Card variant="outlined" className={pubCardStyles.public__blog}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={user[0].img_path}
                        sx={{ width: 46, height: 46 }}
                      />
                    }
                    title={post.title}
                    onClick={() => router.push(`/blog/${post.id}`)}
                  />
                  <p className={pubCardStyles.public__blog_content}>
                    {post.content}
                  </p>
                  <p className={pubCardStyles.public__blog_created}>
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

  return (
    <>
      <Card
        variant="outlined"
        style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
        className={pubCardStyles.public}
      >
        <div className={pubCardStyles.public__main}>
          <Avatar
            alt="user-img"
            src={user[0].img_path}
            sx={{ width: 80, height: 80 }}
          />
          <h1 className={pubCardStyles.public__name}>{user[0].username}</h1>
        </div>
        <CardContent className={pubCardStyles.public__content}>
          <p className={pubCardStyles.public__bio}> {user[0].bio} </p>
          <p> Joined {user[0].created.slice(0, 10)} </p>
        </CardContent>
        {!followings ? null :
        <div className = {pubCardStyles.public__actions}>
            {renderFollowing()}
        </div>
        }
      </Card>

      <Card
        variant="outlined"
        style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
        className={pubCardStyles.public__options}
      >
        <ul className={pubCardStyles.public__options_list}>
          <li
            onClick={displayBlogs}
            className={pubCardStyles.public__options_list_item}
          >
            Blog Post <ForumIcon htmlColor="#1976d2" />
          </li>

          <li
            onClick={displayStatus}
            className={pubCardStyles.public__options_list_item}
          >
            Status <TextsmsIcon htmlColor="#1976d2" />
          </li>
        </ul>
      </Card>

      {blog ? renderBlogs() : null}
      {status ? renderStatus() : null}
    </>
  );
}
