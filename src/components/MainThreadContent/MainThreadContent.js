import threadContentStyles from "./MainThreadContent.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from 'next/router';
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import CreatePostForm from '../CreatePostForm/CreatePostForm'
import {
  CardHeader,
  Avatar,
  Card
} from "@mui/material";
import Link from 'next/link';

export default function MainThreadContent (props) {

  const {main, username, refresh , deleteHandle, createHandle, loggedIn} = props;

  const {thread, posts} = main;

  const [expandedId, setExpandedId] = useState(-1);

  const Router = useRouter();


  return (
    <div>
      <Card variant="outlined" className={threadContentStyles.initial}>
        <CardHeader
          onClick={() => {
            Router.push(`/user/${thread[0].username}`);
          }}
          title={thread[0].username}
          titleTypographyProps={{ variant: "subtitle1", fontWeight: "500" }}
          subheader={thread[0].created.slice(12, 19)}
          style={{ cursor: "pointer" }}
          avatar={
            <Avatar
              alt="user-img"
              src={thread[0].img_path}
              sx={{ width: 50, height: 50 }}
            />
          }
        />
        <h1 className={threadContentStyles.initial__header}>
          {thread[0].thread_subject}
        </h1>
        <p className={threadContentStyles.initial__description}>
          {thread[0].initial_post}
        </p>
      </Card>

      {loggedIn === true ?
      <div className={threadContentStyles.initial__form}>
        <CreatePostForm handler={createHandle} />
      </div>
      :
      null
    }

      <div className={threadContentStyles.initial__post}>
        {posts.map((post, i) => {
          return (
            <Card key={uuidv4} variant="outlined">
              <CardHeader
                onClick={() => {
                  Router.push(`/user/${post.username}`);
                }}
                title={post.username}
                subheader={post.created.slice(11, 19)}
                style={{ cursor: "pointer" }}
                avatar={
                  <Avatar
                    alt="user-img"
                    src={post.img_path}
                    sx={{ width: 46, height: 46 }}
                  />
                }
              />

              <div className={threadContentStyles.initial__post_content}>
                <Link href={`/discuss/${post.id}`}>
                  <a>{post.content}</a>
                </Link>
              </div>
              {post.username === username ? (
                <div className={threadContentStyles.initial__post_del}>
                  <DeleteOutlineIcon
                    size="small"
                    htmlColor="red"
                    onClick={() => {
                      deleteHandle(posts.id);
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
}