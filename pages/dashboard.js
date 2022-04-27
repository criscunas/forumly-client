import DashboardHeader from '../src/components/DashboardHeader/DashboardHeader';
import GenerateNewsFeed from '../src/components/GenerateNewsFeed/GenerateNewsFeed';
import dashboardStyles from '../styles/Dashboard.module.scss';
import {Container, Box} from '@material-ui/core';
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const res = await fetch("http://localhost:7777/newsfeed");
  const data = await res.json();

  return {
    props: { data }, 
  };
}
export default function Dashboard({ data }) {

  return (
    <Container maxWidth="xl" disableGutters>
      <Box className={dashboardStyles.dashboard}>
        <GenerateNewsFeed feed={data.articles} />
      </Box>
    </Container>
  );
}
