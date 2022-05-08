import GenerateNewsFeed from '../src/components/GenerateNewsFeed/GenerateNewsFeed';
import dashboardStyles from '../styles/Dashboard.module.scss';
import {Container, Box} from '@material-ui/core';



export async function getStaticProps() {
  
  const res = await fetch("https://dgisvr.xyz/newsfeed");
  const data = await res.json();

  return {
    props: { data }, 
  };
}
export default function Dashboard({ data }) {

  return (
    <Container maxWidth="xl" disableGutters>
      <Box className={dashboardStyles.dashboard}>
        
      </Box>
    </Container>
  );
}
