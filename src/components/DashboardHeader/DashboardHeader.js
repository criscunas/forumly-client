import { useRouter } from "next/router";
import dashHeader from "./DashboardHeader.module.scss";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import fetchJson from "../../../lib/fetchJson";
import useUser from "../../../lib/useUser";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Grid, Avatar, Card, CardHeader, Fade, Button , Menu , Divider, IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function DashboardHeader() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      {user?.isLoggedIn === true && (
        <header className={dashHeader.header}>
          <div className={dashHeader.header__container}>
            <h1
              onClick={() => router.push("/dashboard")}
              className={dashHeader.header__title}
            >
              digi.
            </h1>

            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
                padding: "0 0.5rem",
              }}
            >
              <InputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>

            <Button
              id="fade-button"
              style={{ display: "none" }}
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon htmlColor="white" />
            </Button>
            <Menu
              className={dashHeader.header__menu}
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <div className={dashHeader.header__menu_list}>
                <MenuItem onClick={handleClose}>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/">
                    <a>Dashboard</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/feed">
                    <a>Feed</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/discover">
                    <a>Discuss</a>
                  </Link>
                </MenuItem>
              </div>
            </Menu>
          </div>
        </header>
      )}
      {user?.isLoggedIn === false && (
        <header className={dashHeader.dashnav}>
          <h1
            onClick={() => router.push("/")}
            className={dashHeader.dashnav__header}
          >
            {" "}
            digi.{" "}
          </h1>
          <ul className={dashHeader.dashnav__list}>
            <li>
              <Link href="/general" passHref>
                <TravelExploreIcon style={{ color: "white" }} />
              </Link>
            </li>
            <li>
              <Link
                className={dashHeader.dashnav__list_item}
                href="/discover"
                passHref
              >
                <CategoryIcon style={{ color: "white" }} />
              </Link>
            </li>
            <li>
              <Link
                passHref
                className={dashHeader.dashnav__list_item}
                href="/login"
              >
                <LoginIcon style={{ color: "white" }} />
              </Link>
            </li>
          </ul>
        </header>
      )}
    </>
  );
};



