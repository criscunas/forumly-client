import discoverStyles from '../styles/Discover.module.scss';
import {Box, Grid, Paper, styled} from '@material-ui/core';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {v4 as uuidv4} from 'uuid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export async function getStaticProps() {
  
  const res = await fetch("http://localhost:7777/categories")
  const categories = await res.json();

  return {
    props: {categories},
  };
}

export default function Discover ({categories}) {
  
  const router = useRouter()

  return ( 
      <Box className={discoverStyles.discover} >
        <ul className={discoverStyles.discover__categoryList}>
        <Grid container spacing = {2} rowspacing = {{xs : 2, sm :3}} columnspacing = {{xs : 1, sm: 3}} >
          {categories.map((cat) => {
            return (
              <Grid item xs = {6} sm = {6} md = {4} lg = {2} key = {uuidv4()} >
                <Item>
                  <h2 className={discoverStyles.discover__categoryList_item}  onClick={()=> router.push(`/discover/${cat.id}`)} > {cat.title} </h2>                  
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </ul>
    </Box>
  )
} 