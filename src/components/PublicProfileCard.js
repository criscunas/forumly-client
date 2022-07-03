import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Grid,
    Button,
} from "@mui/material";
import { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function PublicProfileCard(props) {
    const {
        user,
        posts,
        blogs,
        followings,
        unfollowHandle,
        followHandle,
        loggedin,
        followCount,
        followingCount,
    } = props;

    const [blog, showBlogs] = useState(false);
    const [status, showStatus] = useState(true);

    const displayBlogs = () => {
        showBlogs(true);
        showStatus(false);
    };

    const displayStatus = () => {
        showStatus(true);
        showBlogs(false);
    };

    // const renderFollowing = () => {

    //     const filterFollowing = followings.following.filter(
    //         (o1) => o1.username == user[0].username
    //     );

    //     const filterFollowers = followings.followers.filter(
    //         (o1) => o1.username == user[0].username
    //     );

    //     if (filterFollowing.length === 1 && filterFollowers.length === 1) {
    //         return (
    //             <div className="mt-1">
    //                 <button onClick={unfollowHandle} className="form-btn">
    //                     <PersonRemoveIcon />
    //                 </button>
    //             </div>
    //         );
    //     }

    //     if (filterFollowing.length === 1) {
    //         return (
    //             <div className="mt-1">
    //                 <button onClick={unfollowHandle} className="form-btn">
    //                     <PersonRemoveIcon />
    //                 </button>
    //             </div>
    //         );
    //     }
    //     if (filterFollowers.length === 1) {
    //         return (
    //             <div className="mt-1">
    //                 <button onClick={followHandle} className="form-btn ">
    //                     <PersonAddAltIcon />
    //                 </button>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="mt-1">
    //                 <button onClick={followHandle} className="form-btn">
    //                     <PersonAddAltIcon />
    //                 </button>
    //             </div>
    //         );
    //     }
    // };

    const renderStatus = () => {
        return (
            <div className="pt-2 ">
                {posts.map((post, i) => {
                    return (
                        <Card key={uuidv4()} className="m-4">
                            <CardHeader
                                title={user[0].username}
                                titleTypographyProps={{ variant: "subtitle1" }}
                                subheader={post.created.slice(0, 10)}
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={user[0].img_path}
                                        sx={{ width: 46, height: 46 }}
                                    />
                                }
                            />
                            <CardContent>
                                <p className="post-body">
                                    {post.personal_post}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        );
    };

    const renderBlogs = () => {
        return (
            <div className="pt-2">

                {!blogs.length === 0 ?
                    blogs.map((post) => {
                    return (
                        <Card key={uuidv4()} variant="outlined" className="m-4">
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt="user-img"
                                        src={user[0].img_path}
                                        sx={{ width: 46, height: 46 }}
                                    />
                                }
                                title={user[0].username}
                                titleTypographyProps={{ variant: "subtitle1" }}
                                subheader={post.created.slice(0, 10)}
                            />
                            <div className="py-2 px-4">
                                <Link href={`/blog/${post.id}`}>
                                    <a className="pb-2 text-base">
                                        {post.title}
                                    </a>
                                </Link>

                                <p className="mt-4 mb-2">
                                    {post.content.slice(0, 500)} ...
                                </p>
                            </div>
                        </Card>
                    );
                }) : <p className="text-center font-semibold mt-8"> No blogs created  </p>}
            </div>
        );
    };

    return (
        <div className="bg-slate-100 py-4">
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex items-center justify-center py-4 px-4 gap-8">
                        <div className="flex flex-col gap-4">
                            <Avatar
                                alt="user-img"
                                src={user[0].img_path}
                                sx={{ width: 75, height: 75 }}
                            />

                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-base">{user[0].username}</h1>
                            <p className="text-sm">{user[0].bio}</p>
                            <p className="text-sm">
                                {" "}
                                Member since {user[0].created.slice(0, 10)}
                            </p>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <div className="flex justify-evenly text-center py-4 ">
                <div>
                    {!followCount ? <p> 0 </p> : <p>{followCount}</p>}
                    <p className="text-center">Followers</p>
                </div>
                <div>
                    {!followingCount ? <p> 0 </p> : <p>{followingCount}</p>}
                    <p className="text-center">Followers</p>
                </div>
                <div>
                    <p className="text-center">{posts.length}</p>
                    <div className="text-center">
                        {posts.length === 1 ? (
                            <p> Update </p>
                        ) : (
                            <p> Updates </p>
                        )}
                    </div>
                </div>
            </div>

            <Grid container>
                <Grid item xs={6}>
                    <div
                        onClick={displayStatus}
                        className="py-4 text-base text-center cursor-pointer rounded-tl-2xl bg-slate-400"
                    >
                        Status
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div
                        onClick={displayBlogs}
                        className="py-4 text-base text-center cursor-pointer rounded-tr-2xl bg-slate-400"
                    >
                        Blog Posts
                    </div>
                </Grid>
            </Grid>
            {blog ? renderBlogs() : null}
            {status ? renderStatus() : null}
        </div>
    );
}
