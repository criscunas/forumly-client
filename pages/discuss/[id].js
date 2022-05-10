import postIdStyles from '../../styles/PostIDPage.module.scss';
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { sessionOptions } from "../../lib/session";
import axios from 'axios';
import {
  CardHeader,
  Avatar,
  Card,
  IconButton,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CreatePostComment from '../../src/components/CreatePostComment/CreatePostComment';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  params,
}) {
  
  const user = req.session.user;
  
  const id = params.id;

  const main = await fetch(`https://dgisvr.xyz/post/${id}`);

  const mainPost = await main.json()


  if (user === undefined) {
    return {
      props: {
        user: { isLoggedIn: false },
      },
    };
  }


  return {
    props: {
      user, mainPost
    },
  };
},
sessionOptions);

export default function DiscussPage ({user,mainPost}) {
  
  const Router = useRouter()
  const {id} = Router.query
  const {mutate} = useSWRConfig()

  const { data: comments } = useSWR(
      `https://dgisvr.xyz/post/allcomments/${id}`,
      fetcher
    );

  const isLoading = comments;

  const createComment = (values) => {

    let obj = {
      comment_body: values.comment_body,
      post_id: parseInt(id)
    }

    axios
      .post("https://dgisvr.xyz/post/comment", obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then(()=> {
        mutate(`https://dgisvr.xyz/post/allcomments/${parseInt(id)}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const deleteComment = (comment_id) => {
    axios
      .delete("https://dgisvr.xyz/post/deleteComment", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
        data: {
          comment_id: comment_id,
        },
      })
      .then(() => {
        mutate(`https://dgisvr.xyz/post/allcomments/${parseInt(id)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className={postIdStyles.postPage}>
      <Card variant="outlined" className={postIdStyles.postPage__main}>
        <CardHeader
          onClick={() => {
            Router.push(`/user/${mainPost[0].username}`);
          }}
          title={mainPost[0].username}
          titleTypographyProps={{ variant: "subtitle1", fontWeight: "500" }}
          subheader={mainPost[0].created.slice(12, 19)}
          style={{ cursor: "pointer" }}
          avatar={
            <Avatar
              alt="user-img"
              src={mainPost[0].img_path}
              sx={{ width: 50, height: 50 }}
            />
          }
        />
        <p className={postIdStyles.postPage__content}>
          {mainPost[0].content}
        </p>
      </Card>

      {!user.isLoggedIn ? null : 
      <div className = {postIdStyles.postPage__form}>
          <CreatePostComment handler = {createComment}/>
      </div>
      }
      
      {!isLoading ? (
        <p>loading</p>
      ) : (
        <div className={postIdStyles.postPage__comments}>
          {comments.map((posts, i) => {
            return (
              <Card
                key={uuidv4()}
                variant="outlined"
                className={postIdStyles.postPage__comments_card}
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
                <p className={postIdStyles.postPage__comments_content}>
                  {posts.comment_body}
                </p>
                {!posts.username === user.username ? null : (
                  <DeleteOutlinedIcon
                    className={postIdStyles.postPage__comments_delete}
                    size="small"
                    htmlColor="red"
                    onClick={() => {
                      deleteComment(posts.id);
                    }}
                  />
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 