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
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 11500,
              disableOnInteraction: false,
            }}
            navigation={false}
            modules={[Autoplay, Navigation]}
            className={userFeedStyles.feed__news}
          >
            {data.articles.map((article, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className={userFeedStyles.feed__article}>
                    <a
                      href={article.url}
                      className={userFeedStyles.feed__article_title}
                    >
                      {article.title}
                    </a>
                    <div className={userFeedStyles.feed__article_img}>
                      <img
                        style={{ height: "150px" }}
                        src={article.urlToImage}
                      />
                      <p className={userFeedStyles.feed__article_src}>
                        {article.source.name}{" "}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
      <Box className={userFeedStyles.feed__followers}>
        {feedData.length === 0 ? (
          <h1 className={userFeedStyles.feed_followers_empty}>
            {" "}
            follow someone to get started !{" "}
          </h1>
        ) : (
          <>
            <h1 className={userFeedStyles.feed__followers_section}> 
              {username}'s feed. 
            </h1>
            <GenerateFollowFeed feed={feedData} />
          </>
        )}
      </Box>
    </Container>
  );
} 
