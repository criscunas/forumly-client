import {
  Box,
  Snackbar,
  SnackbarContent
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
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

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

  const [open, setOpen] = useState(false);

  const { data: user } = useSWR(
    `https://dgisvr.xyz/user/profile/${username}`,
    fetcher
  );

  const { data: personals } = useSWR(
    `https://dgisvr.xyz/user/${username}/personals`,
    fetcher
  );

  const { data: posts } = useSWR(
    `https://dgisvr.xyz/user/${username}/posts`,
    fetcher
  );

  const { data: threads } = useSWR(
    `https://dgisvr.xyz/user/${username}/threads`,
    fetcher
  );

  const { data: blogs } = useSWR(
    `https://dgisvr.xyz/user/${username}/blogs`,
    fetcher
  );

  const { mutate } = useSWRConfig();

  const refresh = (url) => {
    mutate(url)
  }

  const sendImage = (img) => {
    axios
      .post("https://dgisvr.xyz/user/uploadImage", img, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(() => {
        mutate(`https://dgisvr.xyz/user/profile/${username}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createBlogPost = (values) => {
    axios
      .post("https://dgisvr.xyz/blog/new", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(() => {
        mutate(`https://dgisvr.xyz/user/${username}/blogs`);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const deleteHandle = async (url, id, mutateUrl) => {

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
      .then(() => {
        setOpen(true)
        mutate(mutateUrl)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postStatus = (values) => {
    
    axios
      .post("https://dgisvr.xyz/personal/post", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(() => {
        setOpen(true);
        mutate(`https://dgisvr.xyz/user/${username}/personals`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const postBio = (values) => {

    axios
    .post("https://dgisvr.xyz/user/bio", values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    })
    .then(() => {
      setOpen(true)
      mutate(`https://dgisvr.xyz/user/profile/${username}`);
    })
    .catch(err => {
      console.log(err)
    })
    ;
  }

  const isLoading = user && posts && threads && blogs;

   const handleClose = (event, reason) => {
     if (reason === "clickaway") {
      setOpen(false);
     }
   };

  const CrudAlert = () => {
    return (
      <Box>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <SnackbarContent 
          style = {{backgroundColor: "green"}}
          message = {
            <p style = {{fontSize: "1rem",display:"flex", justifyContent: "space-between", alignItems:"center", gap:"0.5rem"}} > Success !<span> <CheckIcon/></span></p>
          } />
        </Snackbar>
      </Box>
    );
}


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
          {CrudAlert()}
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
