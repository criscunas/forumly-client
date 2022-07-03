import { Avatar, Popover, IconButton } from "@mui/material";
import { useState } from "react";
import UpdateBio from "./UpdateBio";
import ImageUpload from "./ImageUpload";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export default function ProfileCard({userInfo, bioHandle, imgHandle, username}) {
    
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "popover" : undefined;

    return (
        <>
            {!userInfo ? (
                <div>
                    <Avatar alt="user-img" sx={{ width: 76, height: 76 }} />
                    <h2 className="section-header">{username}</h2>
                </div>
            ) : (
                <div className="pt-4 pb-2 bg-white rounded-lg before_tablet:pt-8 before_tablet:pb-4 ">
                    <div className="card flex flex-col items-center">
                        <div className="card-title flex gap-2">
                            <figure>
                                <Avatar
                                    alt="user-img"
                                    src={userInfo.user.img_path}
                                    sx={{ width: 76, height: 76 }}
                                />
                            </figure>
                        </div>
                        <div className="card-body my-4 text-center">
                            <div className="flex items-center gap-3 justify-center">
                                <p className="text-xl">{username}</p>
                                <IconButton
                                    aria-describedby={id}
                                    size="small"
                                    onClick={handleClick}
                                    sx={{ padding: "0" }}
                                >
                                    <MoreHorizOutlinedIcon htmlColor="black" />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <div className="py-4 px-2 flex flex-col gap-4">
                                        <UpdateBio handler={bioHandle} />
                                        <ImageUpload handler={imgHandle} />
                                    </div>
                                </Popover>
                            </div>

                            <div className="pt-4">
                                <p className="text-base pb-4">{userInfo.user.bio}</p>
                                <div className="flex gap-6">
                                    <div>
                                        <p className="font-semibold text-base"> Followers </p>
                                        <p className="mt-2"> {userInfo.followers.length} </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base"> Following </p>
                                        <p className="mt-2"> {userInfo.following.length} </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base"> Blurbs </p>
                                        <p className="mt-2"> {userInfo.personals.length} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
