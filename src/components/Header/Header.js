import { useRouter } from "next/router";
import dashHeader from "./Header.module.scss";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import fetchJson from "../../../lib/fetchJson";
import useUser from "../../../lib/useUser";
import LoginIcon from "@mui/icons-material/Login";
import { useState, useEffect } from "react";
import { Box, Snackbar, SnackbarContent } from "@mui/material";
import CreateStatusForm from "../CreateStatusForm/CreateStatusForm";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import CheckIcon from "@mui/icons-material/Check";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";

export default function Header () {
  
  const [open, setOpen] = useState(false);

  const { user, mutateUser } = useUser();
  const Router = useRouter();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    try {
      mutateUser(fetchJson("/api/user"));
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const postStatus = (values) => {
    axios
      .post("https://dgisvr.xyz/personal/post", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
      })
      .then(() => {
        mutate(`https://dgisvr.xyz/user/${user.username}/personals`);
        setOpen(true);
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
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {user?.isLoggedIn ? (
        <header className={dashHeader.header}>
          <div className={dashHeader.header__container}>
            <Link href="/dashboard">
              <a className={dashHeader.header__title}>
                <BubbleChartOutlinedIcon fontSize = "large" />
              </a>
            </Link>

            <div className={dashHeader.header__menu}>
              <CreateStatusForm handler={postStatus} />
              <Link href="/profile">
                <a className={dashHeader.header__menu_link}> Profile</a>
              </Link>
              <Link href="/discuss">
                <a className={dashHeader.header__menu_link}>Discuss</a>
              </Link>
              <LogoutIcon
                sx={{ cursor: "pointer" }}
                htmlColor="white"
                onClick={async (e) => {
                  e.preventDefault();
                  mutateUser(
                    await fetchJson("/api/logout", { method: "POST" }),
                    false
                  );
                  Router.push("/");
                }}
              />
            </div>
          </div>
          {CrudAlert()}
        </header>
      ) : (
        <header className={dashHeader.header}>
          <div className={dashHeader.header__container_nouser}>
            <Link href="/">
              <a className={dashHeader.header__title}>
                <BubbleChartOutlinedIcon fontSize="large" />
              </a>
            </Link>
            <div className={dashHeader.header__mobile_menu}>
              <Link href="/discuss">
                <a className={dashHeader.header__mobile_link}>Explore</a>
              </Link>
              <Link href="/login">
                <a>
                  <LoginIcon sx={{ cursor: "pointer" }} htmlColor="white" />
                </a>
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

