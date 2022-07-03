import MainThreadContent from "../../src/components/MainThreadContent";
import axios from "axios";
import { useRouter } from "next/router";
import { withSessionSsr } from "../../lib/session";
import CircularProgress from "@mui/material/CircularProgress";
import { useMemo, useEffect, useState } from "react";

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
    const Router = useRouter();
    const { id } = Router.query;
    const [thread, setThread] = useState([])
    const [loading, setLoading] = useState(true)

    const config = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${user.auth}`,
                "Content-Type": "application/json",
            },
        }),
        [user.auth]
    );

    const fetchThreads = () => {
        axios
            .get(`/thread/${id}`)
            .then(({data}) => {
                setThread(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchThreads()
    },[])



    const createPost = (values) => {
        let obj = {
            content: values.content,
            thread_id: id,
        };
        axios
            .post("/post/create", obj, config)
            .then(() => {
                fetchThreads()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deletePost = (post_id) => {

        let data = {
            id : post_id
        }

        axios
            .delete("/post/delete", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
                data,
            })
            .then(() => {
                fetchThreads()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (user.isLoggedIn) {
        return (
            <div className="p-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
                {loading ? (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <MainThreadContent
                            main={thread}
                            username={user.username}
                            deleteHandle={deletePost}
                            handle={createPost}
                            loggedIn={true}
                        />
                    </div>
                )}
            </div>
        );
    }

    if (!user.isLoggedIn) {
        return (
            <div className="p-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
                {loading ? (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <MainThreadContent main={thread} loggedIn={false} />
                    </div>
                )}
            </div>
        );
    }
}
