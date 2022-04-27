import profileCardStyles from "./ProfileCard.module.scss";
import Avatar from "@mui/material/Avatar";
import { TextField, InputAdornment, Alert, Snackbar, Button, Card } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from 'react';
import EditProfileForms from "../EditProfileForms/EditProfileForms";
import ImageUpload from '../ImageUpload/ImageUpload';

export default function ProfileCard(props) {
  
  const { userInfo, bioHandle, imgHandle, refresh, username} = props;

  const [form, showForm] = useState(false);

  return (
    <>
  {!userInfo ? 
    <Card
      variant="outlined"
      className={profileCardStyles.profilecard}
      style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
    >
    <div className={profileCardStyles.profilecard__avatar}>
      <Avatar
        alt="user-img"
        sx={{ width: 76, height: 76 }}
        />
      <h2 className={profileCardStyles.profilecard__name}> {username} </h2>
      </div>
    </Card> : 
    
    <Card
      variant="outlined"
      className={profileCardStyles.profilecard}
      style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
    >
      <div className={profileCardStyles.profilecard__avatar}>
      <Avatar
        alt="user-img"
        src = {userInfo.user.img_path}
        sx={{ width: 95, height: 95 }}
        />
          <h2 className={profileCardStyles.profilecard__name}> {username} </h2>
          <h2 className={profileCardStyles.profilecard__bio_text}> {userInfo.user.bio} </h2>
          <p> Member since {userInfo.user.created.slice(0,10)} </p>
          <div className = {profileCardStyles.profilecard__forms}>
          {form ? <EditProfileForms handle = {bioHandle} username = {username} refresh = {refresh} /> : null}
          {form ? <ImageUpload handler = {imgHandle} refresh = {refresh} username = {username} /> : null}
          </div>
        </div>  
        <p className={profileCardStyles.profilecard__bio_followers}>
        {userInfo.following.length} Following<span> {userInfo.followers.length} Followers </span>
        </p>
        <div className={profileCardStyles.profilecard__bio_edit}>
        <EditIcon
          style={{ display: "flex" }}
          onClick={() => {
            {!form ? showForm(true) : showForm(false)}
          }}
        />
      </div>
    </Card>
    }
    </>
  );
}