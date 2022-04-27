import generalStyles from "../styles/General.module.scss";
import CreateThread from "../src/components/CreateThread/CreateThread";
import GenerateThreads from '../src/components/GenerateThreads/GenerateThreads';
import { Container, Box} from "@material-ui/core";
import axios from 'axios';
import useSwr, {useSWRConfig} from 'swr';
import fetcher from "../lib/fetcher";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";


export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  const data = await fetcher("http://localhost:7777/thread/all");

  if (user === undefined) {
    return {
      props: {
        isLoggedIn: false , fallbackData : data
      },
    };
  }

  

  const {auth} = user

  return {
    props: {fallbackData : data, auth},
  };
},
sessionOptions);


export default function General({ fallbackData, auth }) {

  const {mutate} = useSWRConfig()
  const {data} = useSwr('http://localhost:7777/thread/all', fetcher, {fallbackData})

  const refresh = () => {
    mutate("http://localhost:7777/thread/all")
  }

  const createThread = (values) => {

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    };

    axios
      .post("http://localhost:7777/thread/create", values, {
        headers: headers,
      })
      .then(() => {
        setAlert(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createPost = (values, id) => {

    let body = {
      content : values.content, 
      thread_id: id
    }

    axios
      .post("http://localhost:7777/post/create", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
      }})
      .then(() => {
        handleClose()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {!auth ? (
        <Container maxWidth="xl" disableGutters>
          <Box className={generalStyles.general}>
            <Box className={generalStyles.general__header}>
              <h1 className={generalStyles.general__title}>General</h1>
            </Box>
            <GenerateThreads threads={data} auth = {false}/>
          </Box>
        </Container>
      ) : 
      <Container maxWidth="xl" disableGutters>
        <Box className={generalStyles.general}>
          <Box className={generalStyles.general__header}>
            <h1 className={generalStyles.general__title}>General</h1>
            <CreateThread handler={createThread} refresh={refresh} />
          </Box>
          <GenerateThreads threads={data} createHandler={createPost} auth = {true} />
        </Box>
      </Container>
      }
    </>
  );
}

