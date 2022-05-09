import discussStyles from "../styles/Discuss.module.scss";
import CreateThread from "../src/components/CreateThread/CreateThread";
import GenerateThreads from "../src/components/GenerateThreads/GenerateThreads";
import { Container, Box, Snackbar, SnackbarContent, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table} from "@material-ui/core";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";


export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {

  const user = req.session.user;
  
  const data = await fetcher("https://dgisvr.xyz/thread/all");

  if (user === undefined) {
    return {
      props: {
        isLoggedIn: false,
        fallbackData: data,
      },
    };
  }

  const { auth } = user;

  return {
    props: { fallbackData: data, auth },
  };
},
sessionOptions);

export default function Discuss({ fallbackData, auth }) {
  
  const [open,setOpen] = useState(false)

  const { mutate } = useSWRConfig();
  const { data } = useSwr("https://dgisvr.xyz/thread/all", fetcher, {
    fallbackData,
  });

 const handleClose = (event, reason) => {
   if (reason === "clickaway") {
     return;
   }

   setOpen(false);
 };

  const CrudAlert = () => {
    return (
      <Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose ={handleClose}
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

  const refresh = () => {
    mutate("https://dgisvr.xyz/thread/all");
  };

  const createThread = (values) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    };

    axios
      .post("https://dgisvr.xyz/thread/create", values, {
        headers: headers,
      })
      .then(() => {
        setOpen(true);
        mutate("https://dgisvr.xyz/thread/all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!auth ? (
        <Container maxWidth="xl" disableGutters>
          <Box className={discussStyles.general}>
            <div className={discussStyles.general__header}>
              <h1 className={discussStyles.general__title}>General</h1>

              <p>Must be a member to post. </p>
            </div>
            
            <GenerateThreads threads={data} auth={false} />
          </Box>
        </Container>
      ) : (
        <Container maxWidth="xl" disableGutters>
          <Box className={discussStyles.general}>
            <CreateThread handler = {createThread} refresh = {refresh}/>
            <GenerateThreads threads = {data} />
          </Box>
        </Container>
      )}
    </>
  );
}
