import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToMustWatchIcon from "../components/cardIcons/addToPlaylist";
import WriteReview from "../components/cardIcons/writeReview";
import { Pagination } from "@mui/material";

const WatchlistMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 17; 

  const startIndex = (currentPage - 1) * moviesPerPage;
  const selectedMovieIds = movieIds.slice(startIndex, startIndex + moviesPerPage);

  const watchlistMovieQueries = useQueries(
    selectedMovieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie({ queryKey: ['movie', { id: movieId }] }),
      staleTime: 1000 * 60 * 5, 
    }))
  );

  const isLoading = watchlistMovieQueries.some((query) => query.isLoading);
  const movies = watchlistMovieQueries
    .map((query) => query.data)
    .filter(Boolean); 

  if (isLoading) {
    return <Spinner />;
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Watchlist"
        movies={movies}
        action={(movie) => (
          <>
            <AddToMustWatchIcon movie={movie} />
            <WriteReview movie={movie} />
          </>
        )}
      />
      <Pagination
        count={Math.ceil(movieIds.length / moviesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="secondary"
        style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

export default WatchlistMoviesPage;
