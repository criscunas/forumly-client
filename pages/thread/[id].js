import MainThreadContent from "../../src/components/MainThreadContent/MainThreadContent";
import ThreadPageStyles from '../../styles/ThreadPage.module.scss';
import { Container, Box } from "@material-ui/core";
import axios from 'axios';
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { withSessionSsr } from "../../lib/session";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePostForm from "../../src/components/CreatePostForm/CreatePostForm";
import {useState, useEffect} from 'react';
import useUser from "../../lib/useUser";



export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        props : {
          user: { isLoggedIn : false },
        }
      };
    }

    return {
      props: {
        user,
      },
    };
  }
);

export default function ThreadPage ({user}) {
  
  const router = useRouter();
  const { id } = router.query;

  const { mutate } = useSWRConfig();
  const {data, error} = useSWR(`http://localhost:7777/thread/${id}`, fetcher)

  const refresh = () => {
    mutate(`http://localhost:7777/thread/${id}`)
  }

  const isLoading = data;

  const createPost = (values) => {
    let obj = {
      content : values.content,
      thread_id: id
    }
    axios
      .post("http://localhost:7777/post/create", obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then(()=> {
        console.log('works')
      })
      .catch(err => {
        console.log(err)
      })
  }


  const deletePost = (id) => {
    axios
      .delete("http://localhost:7777/post/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
        data: {
          id: id,
        },
      })
      .then(() => {
        console.log('works')
      })
      .catch((error) => {
        console.log(error);
      });
  };


  if(user.isLoggedIn) {
    return (
      <>
      {!isLoading ? (
        <p className={ThreadPageStyles.mainThread__loading}>
          {" "}
          <CircularProgress />{" "}
        </p>
      ) : (
        <Container className={ThreadPageStyles.mainThread}>
          <Box className={ThreadPageStyles.mainThread__content}>
            <MainThreadContent
              main={data}
              username={user.username}
              deleteHandle={deletePost}
              refresh={refresh}
            />
            <CreatePostForm handler={createPost} refresh={refresh} />
          </Box>
        </Container>
      )}
    </>
  )}


  if(!user.isLoggedIn) {
    return (
      <>
        {!isLoading ? (
          <p className={ThreadPageStyles.mainThread__loading}>
            <CircularProgress />
          </p>
        ) : (
          <Container className={ThreadPageStyles.mainThread}>
            <Box className={ThreadPageStyles.mainThread__content}>
              <MainThreadContent main={data} />
            </Box>
          </Container>
        )}
      </>
    );}
  
};




