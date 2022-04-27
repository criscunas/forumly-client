import discIDStyles from '../../styles/DiscoverID.module.scss';
import {useRouter} from 'next/router';
import { Container, Box, Card, IconButton, Alert, Snackbar, CardHeader, Avatar } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState, useEffect} from 'react';
import CreateCategorizedPost from '../../src/components/CreateCategoryPost/CreateCategoryPost';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { withSessionSsr } from "../../lib/session";
import CircularProgress from "@mui/material/CircularProgress";
import DiscoverCommentForm from '../../src/components/DiscoverCommentForm/DiscoverCommentForm';


export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        props: {
          user : { isLoggedIn : false}
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  }
);

export default function DiscoverIDPage ({user}) {

  const [expandedId, setExpandedId] = useState(-1);

  const router = useRouter();
  const {id} = router.query

  const {mutate} = useSWRConfig()
  const {data} = useSWR(`http://localhost:7777/categories/${id}`, fetcher)
  const isLoading = data;

  const refresh = () => {
    mutate(`http://localhost:7777/categories/${id}`)
  }

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  
  const createPost = (values) => {
    
    let obj = {
      title: values.title,
      post: values.post,
      category_id: parseInt(id)
    };

    axios
      .post("http://localhost:7777/categories/createPost", obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then(() => {
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });

      console.log(obj)
  };

  const deletePost = (id) => {
    axios
      .delete("http://localhost:7777/categories/deletePost", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
        data: {
          post_id: id,
        },
      })
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isLoading ? (
        <p className={discIDStyles.posts__loading}>
          {" "}
          <CircularProgress />{" "}
        </p>
      ) : (
        <Container
          maxWidth="xl"
          disableGutters
          className={discIDStyles.posts__container}
        >
          <Box className={discIDStyles.posts}>
            <div className={discIDStyles.posts__header}>
              <h1 className={discIDStyles.posts__title}> {data.title} </h1>
              {!user.isLoggedIn ? (
                <p className={discIDStyles.posts__nouser}>
                  {" "}
                  Sign up to start posting !{" "}
                </p>
              ) : (
                <CreateCategorizedPost handler={createPost} refresh={refresh} />
              )}
            </div>

            {data.posts.map((post, i) => {
              return (
                <Card
                  key={uuidv4()}
                  variant="outlined"
                  className={discIDStyles.posts__body}
                  style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
                >
                  <CardHeader
                    onClick={() => {
                      router.push(`/user/${post.username}`);
                    }}
                    title={post.username}
                    subheader={post.title}
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={post.img_path}
                        style={{ width: 46, height: 46 }}
                      />
                    }
                  />
                  <p className={discIDStyles.posts__content}>{post.post} </p>
                  <div className={discIDStyles.posts__time}>
                    {post.username === user.username ? (
                      <DeleteIcon
                        onClick={() => {
                          deletePost(post.id);
                          refresh();
                        }}
                      />
                    ) : null}
                    <p>{post.created.slice(0, 10)}</p>
                  </div>

                  <IconButton
                    onClick={() => handleExpandClick(i)}
                    aria-expanded={expandedId === i}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon className={discIDStyles.posts__comment} />
                  </IconButton>

                  {!user.isLoggedIn ? null : (
                    <DiscoverCommentForm
                      auth={user.auth}
                      post_id={post.id}
                      category_id={id}
                      expanded={expandedId === i}
                      username={user.username}
                    />
                  )}
                </Card>
              );
            })}
            {!user.isLoggedIn ? <p className={discIDStyles.posts__comment_nouser} > Comments are for users only :( </p> : null}
          </Box>
        </Container>
      )}
    </>
  );
}
