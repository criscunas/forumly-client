import discCommentStyles from "./DiscoverComment.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import {
  TextField,
  Button,
  Alert,
  Snackbar,
  Collapse,
  Avatar,
  CardHeader,
  Card
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import {useRouter} from 'next/router';
import { useIsMounted } from "../../../hooks/isMounted";



export default function DiscoverCommentForm(props) {
  
  const { post_id, category_id, expanded, username, auth } = props;

  const [postedOpen, setPostedAlert] = useState(false);
  const [postedDelete, setDeleteAlert] = useState(false);
  const [comments, setComments] = useState([]);
  const isMounted = useIsMounted();
  
  const router = useRouter();
  
  const getDiscoverComments = () => {
    axios
      .get(`http://localhost:7777/categories/comments/` + post_id )
      .then((response) => {
        if(isMounted.current) {
          setComments(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addComment = (values) => {
    let obj = {
      category_id: category_id,
      post_id: post_id,
      comment_body: values.comment_body,
    };

    axios
      .post("http://localhost:7777/categories/comment/post", obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(() => {
        setPostedAlert(true);
        getDiscoverComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = (id) => {
    axios
      .delete("http://localhost:7777/categories/comment/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        data: {
          id: id,
        },
      })
      .then(() => {
        getDiscoverComments();
        setDeleteAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPostedAlert(false);
    setDeleteAlert(false);
  };

  useEffect(() => {
    getDiscoverComments();
  }, []);

  return (
    <>
      <Snackbar open={postedOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Comment Posted
        </Alert>
      </Snackbar>
      <Snackbar
        open={postedDelete}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Comment Deleted
        </Alert>
      </Snackbar>
      <div className={discCommentStyles.comment__btn}>
        <span className={discCommentStyles.comment__length}>
          {comments.length} <CommentIcon />
        </span>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div>
          {comments.length == 0 ? (
            <div>
              <Formik
                onSubmit={(values, { resetForm }) => {
                  addComment(values);
                  resetForm();
                }}
                initialValues={{
                  comment_body: "",
                }}
              >
                {(props) => (
                  <Form
                    className={discCommentStyles.comment__form}
                    onSubmit={props.handleSubmit}
                  >
                    <TextField
                      className="comment__input"
                      onChange={props.handleChange}
                      value={props.values.comment_body}
                      name="comment_body"
                      size="medium"
                      type="text"
                      multiline
                      rows={4}
                      placeholder="Comment"
                    />
                    <Button variant="contained" size="medium" type="submit" style = {{color:'white', backgroundColor: "#112d4e", padding: '0 1rem', alignSelf: 'flex-end'}} >
                      Comment
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div>
              {comments.map((comment) => {
                return (
                  <Card key={uuidv4()}>
                    <li className={discCommentStyles.comment}>
                      <CardHeader
                        onClick={() => {
                          router.push(`/user/${comment.username}`);
                        }}
                        subheader={comment.username}
                        avatar={
                          <Avatar
                            alt="user-img"
                            src={comment.img_path}
                            sx={{ width: 46, height: 46 }}
                          />
                        }
                      />
                      <p className={discCommentStyles.comment__text}>
                        {" "}
                        {comment.comment_body}{" "}
                      </p>
                      {comment.username === username ? (
                        <div className={discCommentStyles.comment__timestamp}>
                          <DeleteIcon
                            onClick={() => {
                              deleteComment(comment.id);
                            }}
                          />
                          <p> {comment.created.slice(11, 19)}</p>
                        </div>
                      ) : (
                        <p className={discCommentStyles.comment__timestamp}>
                          {comment.created.slice(11, 19)}
                        </p>
                      )}
                    </li>
                  </Card>
                );
              })}
              <Formik
                onSubmit={(values, { resetForm }) => {
                  addComment(values);
                  resetForm();
                }}
                initialValues={{
                  comment_body: "",
                }}
              >
                {(props) => (
                  <Form
                    className={discCommentStyles.comment__form}
                    onSubmit={props.handleSubmit}
                  >
                    <TextField
                      className={discCommentStyles.comment__input}
                      onChange={props.handleChange}
                      value={props.values.comment_body}
                      name="comment_body"
                      size="medium"
                      type="text"
                      multiline
                      rows={4}
                      placeholder="Comment"
                    />
                    <Button variant="contained" size="small" type="submit" style = {{color:'white', backgroundColor: "#112d4e", padding: '0 1rem', alignSelf: 'flex-end'}} >
                      Comment
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </Collapse>
    </>
  );
}
