import GenerateNewsFeed from '../src/components/GenerateNewsFeed/GenerateNewsFeed';
import dashboardStyles from '../styles/Dashboard.module.scss';
import {Container, Box} from '@material-ui/core';



export async function getStaticProps() {

  const url = process.env.URL;
  
  const res = await fetch("http://137.184.241.88:3000/newsfeed");
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
