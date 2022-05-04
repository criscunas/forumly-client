import discoverStyles from '../styles/Discover.module.scss';
import {Box, Grid} from '@material-ui/core';
import {useRouter} from 'next/router';
import {v4 as uuidv4} from 'uuid';


export async function getStaticProps() {
  
  const res = await fetch("https://dgisvr.xyz/categories");
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
              <Grid item xs = {12} sm = {6} md = {4} lg = {2} key = {uuidv4()} >
                <div className={discoverStyles.discover__categoryList_item} >
                  <h2 className={discoverStyles.discover__categoryList_title}  onClick={()=> router.push(`/discover/${cat.id}`)} > {cat.title} </h2>                  
                </div>
              </Grid>
            );
          })}
        </Grid>
      </ul>
    </Box>
  )
} 