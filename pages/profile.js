import { CircularProgress } from "@material-ui/core";
import ProfileCard from "../src/components/ProfileCard";
import GenerateUserInfo from "../src/components/GenerateUserInfo";
import axios from "axios";
import { sessionOptions } from "../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { useState, useMemo, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Notification } from "../src/components/Notification";

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

export default function Profile({ auth, username }) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")


    const config = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${auth}`,
                "Content-Type": "application/json",
            },
        }),
        [auth]
    );

    const fetchUser = async () => {
        axios
            .get(`/user/profile/${username}`, config)
            .then(({data}) => {
                setLoading(false)
                setUser(data)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const sendImage = (img) => {
        axios
            .post("/user/uploadImage", img, config)
            .then(() => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const createBlogPost = (values) => {
        axios
            .post("/blog/new", values, config)
            .then(() => {
                fetchUser()
                setMessage('Blog Created')
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteHandle = async (url, id) => {

        await axios
            .delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
                data: {
                    id: id,
                },
            })
            .then(() => {
                setMessage('Deleted !')
                fetchUser()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const postBio = (values) => {
        axios
            .post("/user/bio", values, config)
            .then(() => {
                setOpen(true);
                setMessage('Updated Bio!')
                fetchUser()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };



    return (
        <>
            {loading ? (
                <div className="text-center mt-12">
                    <CircularProgress />
                </div>
            ) : (
                <div className="max-w-4xl m-auto p-4 bg-forumly_blk before_tablet:p-8">
                    <ProfileCard
                        userInfo={user}
                        bioHandle={postBio}
                        username={username}

                        imgHandle={sendImage}
                    />
                    <Notification open={open} handle = {handleClose} message = {message}  />
                    <GenerateUserInfo
                        personals={user.personals}
                        threads={user.threads}
                        posts={user.posts}
                        blogs={user.blog}
                        userFollowing={user.following}
                        userFollowers={user.followers}
                        deleteHandle={deleteHandle}

                        user={user}
                        createBlog={createBlogPost}
                    />
                </div>
            )}
        </>
    );
}
