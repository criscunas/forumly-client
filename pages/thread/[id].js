import MainThreadContent from "../../src/components/MainThreadContent/MainThreadContent";
import axios from "axios";
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { withSessionSsr } from "../../lib/session";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePostForm from "../../src/components/CreatePostForm/CreatePostForm";
import { useState, useEffect } from "react";
import useUser from "../../lib/useUser";

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;

        if (!user) {
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
    }
);

export default function ThreadPage({ user }) {
    const [comments, setComments] = useState([]);

    const Router = useRouter();
    const { id } = Router.query;

    const { mutate } = useSWRConfig();
    const { data, error } = useSWR(
        `http://localhost:3050/thread/${id}`,
        fetcher
    );

    const refresh = (link) => {
        mutate(link);
    };

    const isLoading = data;

    const createPost = (values) => {
        let obj = {
            content: values.content,
            thread_id: id,
        };
        axios
            .post("/post/create", obj, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
            })
            .then(() => {
                mutate(`/thread/${id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deletePost = (post_id) => {
        axios
            .delete("/post/delete", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
                data: {
                    id: post_id,
                },
            })
            .then(() => {
                mutate(`/thread/${id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (user.isLoggedIn) {
        return (
            <div className="mx-4">
                {!isLoading ? (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <MainThreadContent
                            main={data}
                            username={user.username}
                            deleteHandle={deletePost}
                            refresh={refresh}
                            createHandle={createPost}
                            loggedIn={true}
                        />
                    </div>
                )}
            </div>
        );
    }

    if (!user.isLoggedIn) {
        return (
            <div className="mx-4">
                {!isLoading ? (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <MainThreadContent main={data} loggedIn={false} />
                    </div>
                )}
            </div>
        );
    }
}
