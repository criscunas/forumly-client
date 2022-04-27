import { useState} from "react";
import { Card, CardMedia, CardContent, Grid} from "@mui/material";
import newsStyle from './GenerateNewsFeed.module.scss';
import { v4 as uuidv4 } from "uuid";


export default function GenerateNewsFeed(props) {
  
  const {feed} = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(18);

  const lastIndex = currentPage * articlesPerPage;
  const firstIndex = lastIndex - articlesPerPage;
  const currentArticles = feed.slice(firstIndex, lastIndex);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(feed.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
      <div className={newsStyle.newsfeed}>
        <Grid container spacing={4}>
          {currentArticles.map((post) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={uuidv4()}>
                <Card className={newsStyle.newsfeed__card} sx={{ margin: "0rem auto" }}>
                  <CardMedia
                    className={newsStyle.newsfeed_img}
                    component="img"
                    height="150"
                    image={post.urlToImage}
                    alt="news-img"
                  />
                  <CardContent>
                    <a href={post.url} className={newsStyle.newsfeed__title}>
                      {post.title}
                    </a>
                    <p className={newsStyle.newsfeed__source}> {post.source.name} </p>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <nav>
          <ul className={newsStyle.newsfeed__pagination}>
            {pageNumbers.map((number) => (
              <li key={number} className={newsStyle.newsfeed__pagination_item}>
                <a
                  onClick={() => paginate(number)}
                  className={newsStyle.newsfeed__pagination__link}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
  );
}
