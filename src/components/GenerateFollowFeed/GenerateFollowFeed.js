import genFeedStyles from './GenerateFollowFeed.module.scss';
import { Card, CardContent, CardHeader, Avatar} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import Link from 'next/link';

const GenerateFollowFeed =  ({feed}) => {

  const linkTo = (url, txt) => {
    return (
      <Link href={url}>
        <a> {txt} </a>
      </Link>
    );
  };
  
  return (
    <div>
        {feed.map((posts) => {
          return (
            <Card
              key={uuidv4()}
              variant="outlined"
              className={genFeedStyles.userfeed}
              sx={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
            >
              <CardHeader
                title = {linkTo(`/user/${posts.username}`, posts.username)}
                subheader={posts.created.slice(11,19)}
                sx={{ cursor: "pointer"}}
                avatar={
                  <Avatar
                    alt="user-img"
                    src={posts.img_path}
                    sx={{ width: 46, height: 46 }}
                  />
                }
              />
              <CardContent>
                <p className={genFeedStyles.userfeed__content}>
                  {posts.personal_post}
                </p>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
} 

export default GenerateFollowFeed;