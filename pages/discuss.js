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
  
  const data = await fetcher("/thread/all");

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
  const { data } = useSwr("/thread/all", fetcher, {
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
    mutate("/thread/all");
  };

  const createThread = (values) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    };

    axios
      .post("/thread/create", values, {
        headers: headers,
      })
      .then(() => {
        setOpen(true);
        mutate("/thread/all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!auth ? (
        <Container maxWidth="xl" disableGutters>
          <Box className={discussStyles.discuss}>
            <div className={discussStyles.discuss__top}>
            <h1 className={discussStyles.discuss__header}>
              Sign up or sign in to start posting.
            </h1>
            </div>
            <div className={discussStyles.discuss__bottom}>
            <GenerateThreads threads={data} auth={false} />
            </div>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="xl" disableGutters>
          <Box className={discussStyles.discuss}>
            <div className={discussStyles.discuss__top}>
              <CreateThread handler={createThread} refresh={refresh} />
              {CrudAlert()}
            </div>
            <div className={discussStyles.discuss__bottom}>
              <GenerateThreads threads={data} />
            </div>
          </Box>
        </Container>
      )}
    </>
  );
}
