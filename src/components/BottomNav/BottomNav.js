import {useState} from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatIcon from "@mui/icons-material/Chat";
import NotesIcon from "@mui/icons-material/Notes";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import bottomNav from "./BottomNav.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import CssBaseline from "@mui/material/CssBaseline";


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
        <Grid
          item
          xs={3}
          className={bottomNav.bottomNav__menu_link}
          onClick={() => navTo("/feed")}
        >
          <p> Feed</p>
          <DynamicFeedIcon />
        </Grid>
        <Grid
          item
          xs={3}
          className={bottomNav.bottomNav__menu_link}
          onClick={() => navTo("/general")}
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
