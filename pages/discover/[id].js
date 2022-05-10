import discIDStyles from "../../styles/DiscoverID.module.scss";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Card,
  CardHeader,
  Avatar,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CreateCategorizedPost from "../../src/components/CreateCategoryPost/CreateCategoryPost";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { withSessionSsr } from "../../lib/session";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        props: {
          user: { isLoggedIn: false },
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

export default function DiscoverIDPage({ user }) {
  
  const [open,setOpen] = useState(false)
  const Router = useRouter();
  const { id } = Router.query;

  const { mutate } = useSWRConfig();
  const { data } = useSWR(`https://dgisvr.xyz/categories/${id}`, fetcher);
  const isLoading = data;

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

  const createPost = (values) => {
    let obj = {
      title: values.title,
      post: values.post,
      category_id: parseInt(id),
    };

    axios
      .post("https://dgisvr.xyz/categories/createPost", obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then(() => {
        setOpen(true);
        mutate(`https://dgisvr.xyz/categories/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = (post_id) => {
    axios
      .delete("https://dgisvr.xyz/categories/deletePost", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
        data: {
          post_id: post_id,
        },
      })
      .then(() => {
        setOpen(true);
        mutate(`https://dgisvr.xyz/categories/${id}`);
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
                <CreateCategorizedPost handler={createPost} />
              )}
            </div>
            <h1 className={discIDStyles.posts__subheader}>
              A board for all {data.title} related discussion.{" "}
            </h1>
            {CrudAlert()}
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
                      Router.push(`/user/${post.username}`);
                    }}
                    title={post.username}
                    titleTypographyProps={{ variant: "h6" }}
                    subheader={post.created.slice(0, 10)}
                    avatar={
                      <Avatar
                        alt="user-img"
                        src={post.img_path}
                        style={{ width: 46, height: 46 }}
                      />
                    }
                  />
                  <div className={discIDStyles.posts__content}>
                    <h1 className={discIDStyles.posts__content_title}>
                      {" "}
                      {post.title}{" "}
                    </h1>
                    <p className={discIDStyles.posts__content_post}>
                      {" "}
                      {post.post}{" "}
                    </p>
                  </div>
                  <div className={discIDStyles.posts__time}>
                    {post.username === user.username ? (
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      />
                    ) : null}
                  </div>
                  <p className={discIDStyles.posts__content_comment}>
                    Comments temporarily disabled
                    <span role="img" aria-label="facepalm">
                      🤦‍♂️
                    </span>
                  </p>
                </Card>
              );
            })}
          </Box>
        </Container>
      )}
    </>
  );
}
