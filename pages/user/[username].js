import pubProfileStyles from "../../styles/PublicProfile.module.scss";
import { Box, Container, Snackbar, SnackbarContent } from "@material-ui/core";
import PublicProfileCard from "../../src/components/PublicProfileCard/PublicProfileCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { sessionOptions } from "../../lib/session";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const fetchFollow = (url, token) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  params,
}) {
  const user = req.session.user;

  if (user === undefined) {
    return {
      props: {
        user: { isLoggedIn: false },
      },
    };
  }

  if (user.username === params.username) {
    res.setHeader("location", "/profile");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {
      user,
    },
  };
},
sessionOptions);

export default function PublicProfile({ user }) {
  const [open, setOpen] = useState(false);
  const Router = useRouter();
  const { username } = Router.query;

  const { data: profile } = useSWR(
    `https://dgisvr.xyz/user/public/${username}`,
    fetcher
  );
  const { data: relations } = useSWR(user.isLoggedIn === true ?
    [`https://dgisvr.xyz/follow/get`, user.auth] : null,
    fetchFollow
  );

  const { mutate } = useSWRConfig();

  const isLoading = profile && relations;

  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false);
    }
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

  const followUser = () => {
    axios
      .post(
        "https://dgisvr.xyz/follow",
        { id: profile.user[0].user_id },
        {
          headers: {
            Authorization: `Bearer ${user.auth}`,
          },
        }
      )
      .then(() => {
        mutate(["https://dgisvr.xyz/follow/get", user.auth]);
        setOpen(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unfollowUser = () => {
    axios
      .delete("https://dgisvr.xyz/follow/unfollow", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth}`,
        },
        data: {
          id: profile.user[0].user_id,
        },
      })
      .then(() => {
        mutate(["https://dgisvr.xyz/follow/get", user.auth]);
        setOpen(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!user.isLoggedIn ? (
        !profile ? (
          <div className={pubProfileStyles.publicProfile__loading}>
            <CircularProgress />
          </div>
        ) : (
          <Container
            maxWidth="xl"
            disableGutters
            className={pubProfileStyles.publicProfile__container}
          >
            <Box className={pubProfileStyles.publicProfile}>
              <PublicProfileCard
                user={profile.user}
                blogs={profile.blogs}
                posts={profile.status}
                loggedin={false}
              />
            </Box>
          </Container>
        )
      ) : !isLoading ? (
        <div className={pubProfileStyles.publicProfile__loading}>
          <CircularProgress />
        </div>
      ) : (
        <Container
          maxWidth="xl"
          disableGutters
          className={pubProfileStyles.publicProfile__container}
        >
          <Box className={pubProfileStyles.publicProfile}>
            <PublicProfileCard
              user={profile.user}
              followCount={profile.followers}
              followingCount={profile.followings}
              blogs={profile.blogs}
              posts={profile.status}
              followings={relations}
              followHandle={followUser}
              unfollowHandle={unfollowUser}
              loggedin={true}
            />
            {CrudAlert()}
          </Box>
        </Container>
      )}
    </>
  );
}
