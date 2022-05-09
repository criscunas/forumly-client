import {useState} from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  IconButton
} from "@mui/material";

import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatIcon from "@mui/icons-material/Chat";
import NotesIcon from "@mui/icons-material/Notes";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import bottomNav from "./BottomNav.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import CreateStatusForm from '../CreateStatusForm/CreateStatusForm';

export default function BottomNav() {
  
  
  const Router = useRouter()

  const navTo = (url) => {
    Router.push(url)
  }
  
  return (
    <>
      <CssBaseline />
      <div className={bottomNav.bottomNav}>
        <Grid className={bottomNav.bottomNav__menu} container>
          <Grid item xs={12} className={bottomNav.bottomNav__menu_post}>
            <CreateStatusForm/>
          </Grid>
          <Grid
            item
            xs={3}
            className={bottomNav.bottomNav__menu_link}
            onClick={() => navTo("/dashboard")}
          >
            <p>Home</p>
            <DashboardIcon />
          </Grid>
          <Grid
            item
            xs={3}
            className={bottomNav.bottomNav__menu_link}
            onClick={() => navTo("/discuss")}
          >
            <p>Discuss</p>
            <ChatIcon />
          </Grid>
          <Grid
            item
            xs={3}
            className={bottomNav.bottomNav__menu_link}
            onClick={() => navTo("")}
          >
            <p>Blog</p>
            <NotesIcon />
          </Grid>
          <Grid
            item
            xs={3}
            className={bottomNav.bottomNav__menu_link}
            onClick={() => navTo("/profile")}
          >
            <p> Profile</p>
            <AccountCircleOutlinedIcon />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
