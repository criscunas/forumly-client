import { Box, CardHeader, Card, CardContent, Avatar, Snackbar, SnackbarContent } from "@material-ui/core";
import BlogStyles from "../../styles/BlogPage.module.scss";
import { useRouter } from "next/router";
import CreateBlogComment from "../../src/components/CreateBlogComment/CreateBlogComment";
import { v4 as uuidv4 } from "uuid";
import { sessionOptions } from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import axios from 'axios';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    return {
      props: {
        user: { isLoggedIn: false }
      },
    };
  }

  return {
    props: {
      user
    },
  };
},
sessionOptions);


export default function BlogPage({ user }) {

  
  const [open, setOpen] = useState(false);


  const Router = useRouter();
  const {id} = Router.query

  const {data: blogs} = useSWR(`https://dgisvr.xyz/blog/find/${id}`, fetcher)
  const isLoading = blogs;

  const {mutate} = useSWRConfig()

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
            style={{ backgroundColor: "green" }}
            message={
              <p
                style={{
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {" "}
                Success !
                <span>
                  {" "}
                  <CheckIcon />
                </span>
              </p>
            }
          />
        </Snackbar>
      </Box>
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false);
    }
  };


  const createBlogComment = (values) => {
    let obj = {
      comment: values.comment_body,
      blog_id: id,
    };

    axios
      .post("https://dgisvr.xyz/blog/comment", obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then(() => {
        mutate(`https://dgisvr.xyz/blog/find/${id}`);
        setOpen(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBlogComment = (comment_id) => {
    axios
      .delete("https://dgisvr.xyz/blog/comment/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
        data: {
          comment_id: comment_id,
        },
      })
      .then(() => {
        mutate(`https://dgisvr.xyz/blog/find/${id}`);
        setOpen(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <>
    {!isLoading ? <div className={BlogStyles.blog__loading}> loading </div> : 
      <Box className={BlogStyles.blog}>
        <Card className={BlogStyles.blog__card}>
          <CardHeader
            avatar={
              <Avatar
                alt="user-img"
                src={blogs.user[0].img_path}
                style={{ height: 65, width: 65 }}
              />
            }
            title={blogs.user[0].username}
            titleTypographyProps={{ variant: "h6" }}
            onClick={() => Router.push(`/user/${blogs.user[0].username}`)}
          />
          <CardContent>
            <h1 className={BlogStyles.blog__header}>{blogs.post[0].title}</h1>
            <p className={BlogStyles.blog__created}>
              {" "}
              Posted on {blogs.post[0].created.slice(0, 10)}{" "}
            </p>
            <p className={BlogStyles.blog__post}> {blogs.post[0].content} </p>
          </CardContent>
        </Card>

        <div className={BlogStyles.blog__form}>
        {!user.isLoggedIn ? null : 
          <CreateBlogComment handler = {createBlogComment}/>
        }
        {CrudAlert()}
          <div className={BlogStyles.blog__form_comment}>
            {blogs.comments.map((posts, i) => {
              return (
                <Card
                  key={uuidv4()}
                  variant="outlined"
                  className={BlogStyles.blog__comments_card}
                >
                  <CardHeader
                    onClick={() => {
                      Router.push(`/user/${posts.username}`);
                    }}
                    title={posts.username}
                    subheader={posts.created.slice(11, 19)}
                    style={{ cursor: "pointer" }}
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={posts.img_path}
                        sx={{ width: 46, height: 46 }}
                      />
                    }
                  />
                  <p className={BlogStyles.blog__comments_content}>
                    {posts.comment_body}
                  </p>
                  {!posts.username === user.username ? null : (
                    <DeleteOutlinedIcon
                      className={BlogStyles.blog__comments_delete}
                      size="small"
                      htmlColor="red"
                      onClick={() => {
                        deleteBlogComment(posts.id);
                      }}
                    />
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </Box>
      }
    </>
  );
}
