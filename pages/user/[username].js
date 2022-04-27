import pubProfileStyles from '../../styles/PublicProfile.module.scss';
import { Box, Container, Paper, Button, TextField } from "@material-ui/core";
import PublicProfileCard from '../../src/components/PublicProfileCard/PublicProfileCard';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import { withSessionSsr } from "../../lib/session"
import {useRouter} from 'next/router';
import fetcher from "../../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import {useState, useEffect} from 'react';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';




export async function getServerSideProps(context) {
  
  const {username} = context.params
  
  const res = await fetch(`http://localhost:7777/user/public/${username}`);
  const profile = await res.json()

  return {
    props: {
      profile
    },
  };
}

export default function PublicProfile({profile}) {
 

  return (
    <Container maxWidth="xl" disableGutters className = {pubProfileStyles.publicProfile__container} >
      <Box className={pubProfileStyles.publicProfile}>
        <PublicProfileCard
          user={profile.user}
          blogs={profile.blogs}
          posts={profile.status}
        />
      </Box>  
    </Container>
  );
}

