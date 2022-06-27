import GenerateFollowFeed from "../src/components/GenerateFollowFeed/GenerateFollowFeed";
import axios from "axios";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import fetcher from "../lib/fetcher";
import { CircularProgress } from "@material-ui/core";
import useSWR from "swr";
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

    const feed = await axios.get("/user/feed", {
        headers: {
            Authorization: `Bearer ${user.auth}`,
        },
    });

    const feedData = await feed.data;
    const { username } = user;
    return {
        props: {
            feedData,
            username,
        },
    };
},
sessionOptions);

export default function Dashboard({ feedData, username }) {
    const { data } = useSWR("http://localhost:3050/newsfeed", fetcher);

    return (
        <div className="pt-4 bg-forumly_blk h-[100vh] px-4">
            {!data ? (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="pt-4">
                    <h1 className="text-3xl font-semibold text-white mb-4">Trending</h1>
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
                        {data.articles.map((article, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <div className="flex flex-col">
                                        <img
                                            src={article.urlToImage}
                                            alt="newsimg"
                                        />
                                        <a
                                            className="section-body"
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
                {feedData.length === 0 ? (
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
                ) : (
                    <div>
                        <h1 className="section-subhead">{username}'s feed.</h1>
                        <GenerateFollowFeed feed={feedData} />
                    </div>
                )}
            </div>
        </div>
    );
}
