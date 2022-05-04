import generalStyles from "../styles/General.module.scss";
import CreateThread from "../src/components/CreateThread/CreateThread";
import GenerateThreads from "../src/components/GenerateThreads/GenerateThreads";
import { Container, Box, Snackbar, SnackbarContent} from "@material-ui/core";
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
  
  const data = await fetcher("http://dgisvr.xyz/thread/all");

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

export default function General({ fallbackData, auth }) {
  
  const [open,setOpen] = useState(false)

  const { mutate } = useSWRConfig();
  const { data } = useSwr("http://dgisvr.xyz/thread/all", fetcher, {
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
    mutate("http://dgisvr.xyz/thread/all");
  };

  const createThread = (values) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    };

    axios
      .post("http://dgisvr.xyz/thread/create", values, {
        headers: headers,
      })
      .then(() => {
        setOpen(true)
        mutate("http://dgisvr.xyz/thread/all")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!auth ? (
        <Container maxWidth="xl" disableGutters>
          <Box className={generalStyles.general}>
            <div className={generalStyles.general__header}>
              <h1 className={generalStyles.general__title}>General</h1>
            </div>
            
            <GenerateThreads threads={data} auth={false} />
          </Box>
        </Container>
      ) : (
        <Container maxWidth="xl" disableGutters>
          <Box className={generalStyles.general}>
            <div className={generalStyles.general__header}>
              <h1 className={generalStyles.general__title}>General</h1>
              <CreateThread handler={createThread} refresh={refresh} />
            </div>
            {CrudAlert()}
            <GenerateThreads
              threads={data}
            />
          </Box>
        </Container>
      )}
    </>
  );
}
