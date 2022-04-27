import { Box, Container} from "@material-ui/core";
import {useRouter} from 'next/router';
import GenerateFollowFeed from '../src/components/GenerateFollowFeed/GenerateFollowFeed';
import axios from "axios";
import userFeedStyles from '../styles/UserFeed.module.scss';
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";


export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {

  const user = req.session.user;

  if (user === undefined) {
    
    res.end();
    return {
      props: {
        user: { isLoggedIn: false},
      },
    };
  }

  const feed = await axios.get("http://localhost:7777/user/feed", {
      headers: {
        Authorization: `Bearer ${user.auth}`,
      },
    }
  );

  const feedData = await feed.data

  return {
    props: {
      feedData
    },
  };
},
sessionOptions);


export default function Feed ({feedData}) {
  
  return (
    <Container maxWidth="xl" disableGutters className = {userFeedStyles.userFeed__wrapper} >
      <Box className={userFeedStyles.userFeed}>
        {feedData.length === 0 ? (
          <h1 className = {userFeedStyles.userFeed__empty} > follow someone to get started ! </h1>
        ) : (
          <GenerateFollowFeed feed={feedData} />
        )}
      </Box>
    </Container>
  );
} 