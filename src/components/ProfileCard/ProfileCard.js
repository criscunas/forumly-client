import profileCardStyles from "./ProfileCard.module.scss";
import { Card, Grid, Avatar, Popover, IconButton } from "@mui/material";
import { useState } from "react";
import UpdateBio from "../UpdateBio/UpdateBio";
import ImageUpload from "../ImageUpload/ImageUpload";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";


export default function ProfileCard(props) {

  const { userInfo, bioHandle, imgHandle, refresh, username } = props;

  const [anchorEl, setAnchorEl] = useState(null)
  const [form, showForm] = useState(false);

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
        <Card
          variant="outlined"
          className={profileCardStyles.profilecard}
          style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
        >
          <div className={profileCardStyles.profilecard__avatar}>
            <Avatar alt="user-img" sx={{ width: 76, height: 76 }} />
            <h2 className={profileCardStyles.profilecard__name}>{username}</h2>
          </div>
        </Card>
      ) : (
        <div className={profileCardStyles.profilecard}>
          <Grid container>
            <Grid item xs={12} className={profileCardStyles.profilecard__card}>
              <Avatar
                alt="user-img"
                src={userInfo.user.img_path}
                sx={{ width: 75, height: 75 }}
              />
              <div className={profileCardStyles.profilecard__bio}>
                <h1 className={profileCardStyles.profilecard__username}>
                  {username}

                  <div className={profileCardStyles.profilecard__edit}>
                    <IconButton
                      aria-describedby={id}
                      size="small"
                      onClick={handleClick}
                      sx={{ padding: "0" }}
                    >
                      <MoreHorizOutlinedIcon htmlColor="white" />
                    </IconButton>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div className={profileCardStyles.profilecard__edit}>
                        <p className={profileCardStyles.profilecard__edit_list}>
                          <UpdateBio handler = {bioHandle} />
                        </p>
                        <p className={profileCardStyles.profilecard__edit_list}>
                          <ImageUpload handler = {imgHandle} />
                        </p>
                      </div>
                    </Popover>
                  </div>
                </h1>
                <p className={profileCardStyles.profilecard__status}>
                  {userInfo.user.bio}
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
