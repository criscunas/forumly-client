import pubProfileStyles from "../../styles/PublicProfile.module.scss";
import { Box, Container} from "@material-ui/core";
import PublicProfileCard from "../../src/components/PublicProfileCard/PublicProfileCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { sessionOptions } from "../../lib/session";

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
}) {
  const user = req.session.user;

  if (user === undefined) {
    return {
      props: {
        user: { isLoggedIn: false },
      },
    };
  }

  return {
    props: {
      user,
    },
  };
},
sessionOptions);

export default function PublicProfile({ user }) {
  
  const router = useRouter();
  const { username } = router.query;


  const { data: profile } = useSWR(
    `https://dgisvr.xyz/user/public/${username}`,
    fetcher
  );
  const { data: relations } = useSWR(
    [`https://dgisvr.xyz/follow/get`, user.auth],
    fetchFollow
  );

  const { mutate } = useSWRConfig();

  const isLoading = profile && relations;

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
              blogs={profile.blogs}
              posts={profile.status}
              followings={relations}
              followHandle={followUser}
              unfollowHandle={unfollowUser}
            />
          </Box>
        </Container>
      )}
    </>
  );
}
