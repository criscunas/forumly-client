import genFeedStyles from './GenerateFollowFeed.module.scss';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, Avatar} from "@mui/material";
import {v4 as uuidv4} from 'uuid';

export default function GenerateFollowFeed (props) {

  const {feed} = props;
  const router = useRouter();
  
  return (
    <>
      <ul>
        {feed.map((posts) => {
          return (
            <Card
              key={uuidv4()}
              variant="outlined"
              className={genFeedStyles.feed}
              sx={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
            >
              <CardHeader
                onClick={() => {
                  router.push(`/user/${posts.username}`);
                }}
                subheader={posts.username}
                sx = {{cursor: "pointer"}}
                avatar={
                  <Avatar
                    alt="user-img"
                    src={posts.img_path}
                    sx={{ width: 46, height: 46 }}
                  />
                }
              />
              <CardContent>
                <p className={genFeedStyles.feed__content}>
                  {posts.personal_post}
                </p>
                <p className={genFeedStyles.feed__timestamp}>
                  {posts.created.slice(11, 19)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </>
  );
} 