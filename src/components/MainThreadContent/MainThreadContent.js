import threadContentStyles from "./MainThreadContent.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import CreatePostForm from '../CreatePostForm/CreatePostForm'
import {
  CardHeader,
  Avatar,
  Card
} from "@mui/material";
import Link from 'next/link';

const MainThreadContent = (props) => {

  const {main, username, refresh , deleteHandle, createHandle, loggedIn} = props;

  const {thread, posts} = main;

  
  const linkTo = (url, txt) => {
    return (
      <Link href={url}>
        <a> {txt} </a>
      </Link>
    );
  }

  return (
    <div>
      <Card variant="outlined" className={threadContentStyles.initial}>
        <CardHeader
          title={linkTo(`/user/${thread[0].username}`, thread[0].username)}
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
                title={linkTo(
                  `/user/${post.username}`,
                  post.username
                )}
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

export default MainThreadContent;