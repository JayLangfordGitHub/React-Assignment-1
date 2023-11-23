import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { getMovies, getTrendingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Pagination, Typography, Paper } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const moviesPerPage = 17; 
  
  const { data, error, isLoading, isError } = useQuery(['discover', currentPage], () => getMovies(currentPage));

  useEffect(() => {
    getTrendingMovies().then(data => setTrendingMovies(data));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results.slice(0, moviesPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Updated slider settings without arrows
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <>
      <Paper
      component="div"
      sx={{
        position: 'relative',
        maxWidth: '100%', // Limit the width to the viewport width
        margin: '0 auto', // Center the header horizontally
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: 3,
        zIndex: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h3">
        Trending Movies
      </Typography>
    </Paper>

      {trendingMovies && trendingMovies.length > 0 && (
        <Slider {...sliderSettings}>
          {trendingMovies.map(movie => (
            <div key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              {/* Other movie details */}
            </div>
          ))}
        </Slider>
      )}

      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
      
      {data.total_pages > 1 && (
        <Pagination
          style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
          count={data.total_pages}
          onChange={handlePageChange}
          page={currentPage}
          size="large"
        />
      )}
    </>
  );
};

export default HomePage;
