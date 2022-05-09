import { sessionOptions } from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { CircularProgress } from "@material-ui/core";
import blogspotStyles from '../../styles/BlogSpot.module.scss';
import {useRouter} from 'next/router';


export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();

  
    return {
      props: {
        user: { isLoggedIn: false },
      },
    };
  }

  const { auth, username } = user;

  return {
    props: { auth, username },
  };
},

sessionOptions);

export default function UserBlog({username, auth}) {
  
  
  const { data } = useSWR(
    `https://dgisvr.xyz/user/${username}/blogs`,
    fetcher
  );



  const isLoading = data;


  return (
    <div className={blogspotStyles.blogspot}>
      {!isLoading ? (
        <div className={blogspotStyles.blogspot__loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={blogspotStyles.blogspot__main}>
          <h1 className={blogspotStyles.blogspot__header}>
            
          </h1>
        </div>
      )}
    </div>
  );
}
