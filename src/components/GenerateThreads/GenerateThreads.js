import threadStyles from './GenerateThreads.module.scss';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Alert,
  Stack,
  Avatar,
  Collapse,
} from "@mui/material";
import { Formik, Form } from "formik";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function GenerateThreads (props) {
  
  const {threads, createHandler , auth} = props;

  const [expandedId, setExpandedId] = useState(-1);

  const router = useRouter();

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
    <>
      <ul>
        {threads.map((data, i) => {
          return (
            <li key={uuidv4()}>
              <Card
                className={threadStyles.feedcard}
                variant="outlined"
                sx={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
              >
                <CardHeader
                  onClick={() => {
                    router.push(`/user/${data.username}`);
                  }}
                  subheader={data.username}
                  style={{ cursor: "pointer"}}
                  avatar={
                    <Avatar
                      alt="user-img"
                      src={data.img_path}
                      sx={{ width: 55, height: 55 }}
                    />
                  }
                />
                <h1
                  onClick={() => router.push(`thread/${data.id}`)}
                  className={threadStyles.feedcard__header}
                  style={{ cursor: "pointer" }}
                >
                  {data.thread_subject}
                </h1>
                <CardContent className={threadStyles.feedcard__post}>
                  {data.initial_post}
                  <div></div>
                  <IconButton
                    sx={{ padding: "1.5rem 0 0 0 " }}
                    onClick={() => handleExpandClick(i)}
                    aria-expanded={expandedId === i}
                  >
                    <ReplyIcon />
                  </IconButton>
                </CardContent>
                <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                  <CardContent>
                  {!auth ? <p> Create an account or sign in to post</p> :
                    <Formik
                      onSubmit={(values, { resetForm }) => {
                        createHandler(values, data.id);
                        resetForm();
                      }}
                      initialValues={{
                        content: "",
                      }}
                    >
                      {(props) => (
                        <Form
                          className={threadStyles.feedcard__form}
                          onSubmit={props.handleSubmit}
                        >
                          <TextField
                            onChange={props.handleChange}
                            value={props.values.content}
                            name="content"
                            size="medium"
                            type="text"
                            label="New Post"
                            multiline
                            rows={4}
                          />
                          <Button type="submit" variant="contained">
                            Submit
                          </Button>
                        </Form>
                      )}
                    </Formik>
                      }
                  </CardContent>
                </Collapse>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
} 