import threadStyles from "./GenerateThreads.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Card, Box, CardContent, Avatar } from "@material-ui/core";
import Link from "next/link";

const GenerateThreads = ({ threads }) => {
  return (
    <Box className={threadStyles.threads}>
      <h1 className={threadStyles.threads__section}> Latest </h1>
      {threads
        .slice(-4)
        .reverse()
        .map((post) => {
          return (
            <Card key={uuidv4()} className={threadStyles.threads__body}>
              <CardContent>
                <div className={threadStyles.threads__header}>
                  <h1 className={threadStyles.threads__header}>
                    <Link href={`/thread/${post.id}`}>
                      <a> {post.thread_subject}</a>
                    </Link>
                  </h1>
                  <p className={threadStyles.threads__text}>
                    {" "}
                    {post.initial_post}
                  </p>
                </div>
              </CardContent>
              <div className={threadStyles.threads__user}>
                <Link href={`/user/${post.username}`}>
                  <a>
                    <Avatar
                      src={post.img_path}
                      sx={{ width: 55, height: 55 }}
                      alt="img_profile_photo"
                    />
                  </a>
                </Link>
                <div>
                  <Link href={`/user/${post.username}`}>
                    <a className={threadStyles.threads__username}>
                      {post.username}
                    </a>
                  </Link>
                  <p className={threadStyles.threads__created}>
                    {post.created.slice(0, 10)}{" "}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      {threads.slice(0, -4).map((post) => {
        return (
          <Card key={uuidv4()} className={threadStyles.threads__body}>
            <CardContent>
              <div className={threadStyles.threads__header}>
                <h1 className={threadStyles.threads__header}>
                  <Link href={`/thread/${post.id}`}>
                    <a> {post.thread_subject} </a>
                  </Link>
                </h1>
                <p className={threadStyles.threads__text}>
                  {post.initial_post}
                </p>
              </div>
            </CardContent>
            <div className={threadStyles.threads__user}>
              <Link href={`/user/${post.username}`}>
                <a>
                  <Avatar
                    src={post.img_path}
                    sx={{ width: 55, height: 55 }}
                    alt="img_profile_photo"
                  />
                </a>
              </Link>
              <div>
                <Link href={`/user/${post.username}`}>
                  <a className={threadStyles.threads__username}>
                    {post.username}
                  </a>
                </Link>
                <p className={threadStyles.threads__created}>
                  {post.created.slice(0, 10)}{" "}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </Box>
  );
};

export default GenerateThreads;
