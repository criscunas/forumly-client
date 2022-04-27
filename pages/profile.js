import {
  Box,
  Container
} from "@material-ui/core";
import ProfileCard from '../src/components/ProfileCard/ProfileCard';
import { CreateStatusForm } from "../src/components/CreateStatusForm/CreateStatusForm";
import GenerateUserInfo from "../src/components/GenerateUserInfo/GenerateUserInfo";
import axios from 'axios';
import profileStyles from '../styles/Profile.module.scss';
import { sessionOptions } from "../lib/session";
import {withIronSessionSsr} from 'iron-session/next';
import fetcher from "../lib/fetcher";
import useSWR, { useSWRConfig} from "swr";
import useUser from "../lib/useUser";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {

  const user = req.session.user

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false },
      },
    };
  }

  const {auth, username} = user;

  return { 
    props: {auth, username},
  };
},
sessionOptions);


export default function Profile  ({auth, username}) {

  const {data : user} = useSWR(`http://localhost:7777/user/profile/${username}`, fetcher)

  const {data : personals} = useSWR(`http://localhost:7777/user/${username}/personals`, fetcher)

  const {data : posts} =  useSWR(`http://localhost:7777/user/${username}/posts`, fetcher);

  const {data: threads} = useSWR(`http://localhost:7777/user/${username}/threads`, fetcher)

  const {data: blogs} = useSWR(`http://localhost:7777/user/${username}/blogs`, fetcher)

  const { mutate } = useSWRConfig();

  const refresh = (url) => {
    mutate(url)
  }

  const sendImage = (img) => {
    axios
      .post("http://localhost:7777/user/uploadImage", img, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createBlogPost = (values) => {
    axios
      .post("http://localhost:7777/blog/new", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const deleteHandle = async (url, id) => {

    await axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        data : {
          id: id,
        },
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postStatus = (values) => {
    
    axios
      .post("http://localhost:7777/personal/post", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const postBio = (values) => {

    axios
    .post("http://localhost:7777/user/bio", values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    })
    .catch(err => {
      console.log(err)
    })
    ;
  }

  const isLoading = user && posts && threads && blogs;

  return (
    <>
      {!isLoading ? (
        
          <Box className={profileStyles.profile}>
            <ProfileCard username={username} />
          </Box>
       
      ) : (
       
          <Box className={profileStyles.profile}>
            <ProfileCard
              userInfo={user}
              bioHandle={postBio}
              username={username}
              refresh={refresh}
              imgHandle={sendImage}
            />
            <CreateStatusForm
              handler={postStatus}
              refresh={refresh}
              username={username}
            />
            <GenerateUserInfo
              personals={personals}
              threads={threads}
              posts={posts}
              blogs={blogs}
              userFollowing={user.following}
              userFollowers={user.followers}
              deleteHandle={deleteHandle}
              refresh={refresh}
              user={user}
              createBlog={createBlogPost}
            />
          </Box>
      )}
    </>
  );
} 
