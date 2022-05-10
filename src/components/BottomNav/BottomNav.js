import {
  Grid,
  Snackbar, 
  SnackbarContent,
  Box
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import useUser from "../../../lib/useUser";
import ChatIcon from "@mui/icons-material/Chat";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import bottomNav from "./BottomNav.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import CreateStatusForm from '../CreateStatusForm/CreateStatusForm';
import axios from 'axios';
import useSWR, { useSWRConfig} from "swr";
import { useState } from 'react';

export default function BottomNav() {
  
  const [open, setOpen] = useState(false);


  const { user, mutateUser } = useUser();
  
  const {mutate} = useSWRConfig()

  const Router = useRouter()

  const navTo = (url) => {
    Router.push(url)
  }


  const postStatus = (values) => {
    axios
      .post("https://dgisvr.xyz/personal/post", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then((res) => {
        mutate(`https://dgisvr.xyz/user/${user.username}/personals`);
        setOpen(true)
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
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

   const handleClose = (event, reason) => {
     if (reason === "clickaway") {
       setOpen(false);
     }
   };


  return (
    <>
      <CssBaseline />
      {!user?.isLoggedIn ? null : (
        <div className={bottomNav.bottomNav}>
        {CrudAlert()}
          <Grid className={bottomNav.bottomNav__menu} container>
            <Grid
              item
              xs={3}
              className={bottomNav.bottomNav__menu_link}
              onClick={() => navTo("/profile")}
            >
              <AccountCircleOutlinedIcon />
            </Grid>
            <Grid
              item
              xs={3}
              className={bottomNav.bottomNav__menu_link}
              onClick={() => navTo("/dashboard")}
            >
              <DashboardIcon />
            </Grid>
            <Grid
              item
              xs={3}
              className={bottomNav.bottomNav__menu_link}
              onClick={() => navTo("/discuss")}
            >
              <ChatIcon />
            </Grid>
            <Grid
              item
              xs={3}
              className={bottomNav.bottomNav__menu_link}
              onClick={() => navTo("")}
            >
              <CreateStatusForm handler = {postStatus}/>
            </Grid>
          </Grid>
        </div>
      )}
      {user?.isLoggedIn ? null : (
        <div className={bottomNav.bottomNav}>
          <Grid className={bottomNav.bottomNav__menu_nonuser} container>
            <Grid
              item
              xs={6}
              className={bottomNav.bottomNav__menu_nonuser_link}
              onClick={() => navTo("/discuss")}
            >     
            <ChatIcon />
            </Grid>
            <Grid
              item
              xs={6}
              className={bottomNav.bottomNav__menu_nonuser_link}
              onClick={() => navTo("/login")}
            >
              <p>Contact </p>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
