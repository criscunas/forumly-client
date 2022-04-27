import threadContentStyles from "./MainThreadContent.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from 'next/router';
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";


import {
  CardContent,
  CardHeader,
  Avatar,
  Card,
  IconButton,
} from "@mui/material";

export default function MainThreadContent (props) {

  const {main, username, refresh , deleteHandle} = props;

  const {thread, posts} = main;

  const [expandedId, setExpandedId] = useState(-1);

  const router = useRouter();


  return (
    <div>
      <Card variant="outlined" className={threadContentStyles.initial}>
        <CardHeader
          onClick={() => {
            router.push(`/user/${thread[0].username}`);
          }}
          title={thread[0].username}
          style={{ cursor: "pointer" }}
          avatar={
            <Avatar
              alt="user-img"
              src={thread[0].img_path}
              sx={{ width: 46, height: 46 }}
            />
          }
        />
        <h1 className={threadContentStyles.initial__header}>
          {thread[0].thread_subject}
        </h1>
        <p className={threadContentStyles.initial__description}>
          {thread[0].initial_post}
        </p>
        {thread[0].created ? (
          <p className={threadContentStyles.initial__timestamp}>
            {thread[0].created.slice(14, 22)}{" "}
          </p>
        ) : null}
      </Card>
      <ul>
        {posts.map((posts, i) => {
          return (
            <Card
              key={uuidv4()}
              variant="outlined"
              className={threadContentStyles.thread__post}
            >
              <CardHeader
                onClick={() => {
                  router.push(`/user/${posts.username}`);
                }}
                subheader={posts.username}
                style={{ cursor: "pointer" }}
                avatar={
                  <Avatar
                    alt="user-img"
                    src={posts.img_path}
                    sx={{ width: 46, height: 46 }}
                  />
                }
              />
              <p className={threadContentStyles.thread__post_content}>
                {posts.content}
              </p>
              <CardContent className={threadContentStyles.thread_post_card}>
                {!username ? (
                  <p className={threadContentStyles.thread__post_timestamp}>
                    {" "}
                    {posts.created.slice(11, 19)}{" "}
                  </p>
                ) : posts.username === username ? (
                  <div className={threadContentStyles.thread__post_timestamp}>
                    <DeleteIcon
                      onClick={() => {
                        deleteHandle(posts.id);
                        refresh();
                      }}
                    />
                    <p> {posts.created.slice(11, 19)}</p>
                  </div>
                ) : (
                  <p className={threadContentStyles.thread__post_timestamp}>
                    {posts.created.slice(11, 19)}
                  </p>
                )}

                {!username ? null : (
                  <IconButton
                    onClick={() => handleExpandClick(i)}
                    aria-expanded={expandedId === i}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon
                      className={threadContentStyles.thread__post_comment}
                    />
                  </IconButton>
                )}
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}