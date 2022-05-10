import { Box, Container, Card, CardMedia, CardContent} from "@material-ui/core";
import GenerateFollowFeed from '../src/components/GenerateFollowFeed/GenerateFollowFeed';
import axios from "axios";
import userFeedStyles from '../styles/UserFeed.module.scss';
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import fetcher from "../lib/fetcher";
import { CircularProgress } from "@material-ui/core";
import useSWR, { useSWRConfig } from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import Image from 'next/image';

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {

  const user = req.session.user;

  if (user === undefined) {
    
    res.end();
    return {
      props: {
        user: { isLoggedIn: false},
      },
    };
  }

  const feed = await axios.get("https://dgisvr.xyz/user/feed", {
    headers: {
      Authorization: `Bearer ${user.auth}`,
    },
  });

  const feedData = await feed.data
  const {username} = user
  return {
    props: {
      feedData, username
    },
  };
},
sessionOptions);


export default function Dashboard ({feedData,username}) {
  
  const {data} = useSWR("https://dgisvr.xyz/newsfeed", fetcher)

  return (
    <Container maxWidth="xl" disableGutters className={userFeedStyles.feed}>
      {!data ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <CircularProgress />{" "}
        </div>
      ) : (
        <div>
          <h1 className={userFeedStyles.feed__article_header}> Trending </h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              500: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {data.articles.map((article, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className={userFeedStyles.feed__article_body}>
                    <img src={article.urlToImage} alt="newsimg" />
                    <a
                      className={userFeedStyles.feed__article_link}
                      href={article.url}
                    >
                      {article.title}
                    </a>
                    <p className={userFeedStyles.feed__article_line}>
                      {article.source.name}{" "}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
      <Box className={userFeedStyles.feed__followers}>
        {feedData.length === 0 ? (
          <div className={userFeedStyles.feed__empty}>
            <h1 className={userFeedStyles.feed__empty_header}> Follow someone to get started ! </h1>
            <p className={userFeedStyles.feed__empty_subhead}> Check out recent threads in our discussion section to find other users.</p>
          </div>
        ) : (
          <div>
            <h1 className={userFeedStyles.feed__followers_section}>
              {username}'s feed.
            </h1>
            <GenerateFollowFeed feed={feedData} />
          </div>
        )}
      </Box>
    </Container>
  );
} 
