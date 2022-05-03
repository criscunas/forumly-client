import threadStyles from "./GenerateThreads.module.scss";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";



export default function GenerateThreads(props) {
  
  
  const { threads} = props;

  const router = useRouter();

  return (
    <>
      <ul>
        {threads.map((data) => {
          return (
            <li key={uuidv4()}>
              <Card
                className={threadStyles.feedcard}
                variant="outlined"
                sx={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
              >
                <CardHeader
                  onClick={() => {
                    router.push(`/user/${data.username}`);
                  }}
                  title={data.username}
                  titleTypographyProps={{ variant: "h6" }}
                  subheader={data.created.slice(0, 10)}
                  style={{ cursor: "pointer" }}
                  avatar={
                    <Avatar
                      alt="user-img"
                      src={data.img_path}
                      sx={{ width: 55, height: 55 }}
                    />
                  }
                />
                <h1
                  onClick={() => router.push(`thread/${data.id}`)}
                  className={threadStyles.feedcard__header}
                  style={{ cursor: "pointer" }}
                >
                  {data.thread_subject}
                </h1>
                <CardContent className={threadStyles.feedcard__post}>
                  {data.initial_post}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}
