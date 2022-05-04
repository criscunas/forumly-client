import { Box, CardHeader, Card, CardContent, Avatar } from "@material-ui/core";
import BlogStyles from '../../styles/BlogPage.module.scss';
import {useRouter} from 'next/router';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';
import {useEffect, useState} from 'react';


export async function getServerSideProps(context) {
    const { params } = context;

    const res = await fetch(`https://dgisvr.xyz/blog/find/${params.id}`);
    const blogs = await res.json();

    return {
      props : {
        blogs
      }
    }
}

export default function BlogPage ({blogs}) {

  const [signedIn, setSignedIn] = useState(false)

  const router = useRouter()

  const { mutateUser } = useUser({
    redirectIfFound: false,
  });

  const checkForUser =  async () => {
    
    const user = mutateUser(fetchJson("/api/user"));
    const data = await user

    if(data.isLoggedIn) {
      setSignedIn(true)
    }
    else {
      setSignedIn(false)
    }
  }

  useEffect(() => {
    checkForUser()
  })


  return (
    <>
          <Box className={BlogStyles.blog}>
            <Card className = {BlogStyles.blog__card} >
              <CardHeader
                avatar={
                  <Avatar
                    alt="user-img"
                    src={blogs.user[0].img_path}
                    style={{ height: 65, width: 65 }}
                  />
                }
                title={blogs.user[0].username}
                titleTypographyProps = {{variant: "h6"}}
                onClick={() => router.push(`/user/${blogs.user[0].username}`)}
              />
              <CardContent>
                <h1 className={BlogStyles.blog__header}>
                  {blogs.post[0].title}
                </h1>
                <p className={BlogStyles.blog__created}>
                  {" "}
                  Posted on {blogs.post[0].created.slice(0, 10)}{" "}
                </p>
                <p className={BlogStyles.blog__post}>
                  {" "}
                  {blogs.post[0].content}{" "}
                </p>
              </CardContent>
            </Card>
          </Box>
    </>
  );
} 