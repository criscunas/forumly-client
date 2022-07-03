import {GenerateFollowFeed} from "../src/components/GenerateFollowFeed";
import axios from "axios";
import useRequest from "../lib/useRequest";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { CircularProgress } from "@material-ui/core";
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
                user: { isLoggedIn: false },
            },
        };
    }


    const news = await axios.get('/newsfeed')
    const newsFeed = news.data

    const { username, auth } = user;

    return {
        props: {
            username,
            auth,
            newsFeed
        },
    };
},
sessionOptions);

export default function Dashboard({ username, newsFeed, auth }) {


    const {data} = useRequest({
        url: '/user/feed',
        headers : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        }
    })

    return (
        <div className="p-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
            {!newsFeed ? (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="pt-4">
                    <h1 className="text-3xl font-semibold mb-4 text-white">Trending</h1>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        autoplay={{
                            delay: 6000,
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
                        {newsFeed.articles.map((article, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <div className="flex flex-col bg-forumly_blk">
                                        <img
                                            src={article.urlToImage}
                                            alt="newsimg"
                                        />
                                        <a
                                            className="section-body text-white mt-2"
                                            href={article.url}
                                        >
                                            {article.title}
                                        </a>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}
            <div>


                {data ?  (
                    <div className="pt-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
                        <h1 className="section-header">{username}'s feed.</h1>
                        <GenerateFollowFeed feed={data} />
                    </div>
                ) : (
                    <div className="pt-8 text-center text-white">
                    <h1 className="text-2xl mb-2">
                        Welcome {username} !
                    </h1>
                    <h1 className="text-lg mb-2">
                        Follow someone to get started
                    </h1>
                    <p className="text-lg">
                        Check out recent threads in our discussion section
                        to find other users.
                    </p>
                    </div>
                )}
            </div>
        </div>
    );
}

