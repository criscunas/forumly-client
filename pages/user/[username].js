
import PublicProfileCard from "../../src/components/PublicProfileCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { sessionOptions } from "../../lib/session";
import { useState, useMemo, useEffect } from "react";
import { Notification } from "../../src/components/Notification";


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

    if (user.username == params.username) {
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
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState([])
    const [relations, setRelations] = useState([])

    const Router = useRouter();
    const { username } = Router.query;


    const config = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${user.auth}`,
                "Content-Type": "application/json",
            },
        }),
        [user.auth]
    );


    const fetchProfile = () => {
        axios
        .get(`/user/public/${username}`)
        .then(({data}) => {
            setLoading(false)
            setProfile(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const fetchRelations = () => {
        axios
        .get(`/follow/get`, config)
        .then(({data}) => {
            setLoading(false)
            console.log(data)
            setRelations(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {

        fetchProfile()

        if(user.isLoggedIn === true) {
            fetchRelations()
        }

    }, [])

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const followUser = () => {
        axios.post("/follow", { id: profile.user[0].user_id }, config)
            .then(() => {
                setMessage('User followed')
                fetchProfile()
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const unfollowUser = () => {
        axios
            .delete("/follow/unfollow", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.auth}`,
                },
                data: {
                    id: profile.user[0].user_id,
                },
            })
            .then(() => {
                setMessage('User unfollowed')
                fetchProfile()
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {!user.isLoggedIn ? (
                !profile ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="p-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
                        <div className="bg-forumly_blk">
                            <PublicProfileCard
                                user={profile.user}
                                blogs={profile.blogs}
                                posts={profile.status}
                                loggedin={false}
                            />
                        </div>
                    </div>
                )
            ) : loading ? (
                <div className="absolute top-0 bottom-0 left-0 right-0 m-auto">
                    <CircularProgress />
                </div>
            ) : (
                <div className="p-4 max-w-2xl before_tablet:m-auto before_tablet:pt-8">
                    <div className="bg-forumly_blk">
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
                        <Notification open={open} handle={handleClose} message = {message} />
                    </div>
                </div>
            )}
        </>
    );
}
