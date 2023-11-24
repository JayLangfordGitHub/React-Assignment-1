import React, { useState } from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { getLatestMovies } from '../api/tmdb-api';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { Pagination } from "@mui/material";

const LatestMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 17;

  const { data, error, isLoading, isError } = useQuery(['latest', currentPage], () => getLatestMovies(currentPage));

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

  const totalPages = Math.ceil(data.total_results / moviesPerPage);

  return (
    <>
      <PageTemplate
        title="Latest Movies"
        movies={movies}
        action={(movie) => <AddToPlaylistIcon movie={movie} />}
      />
      <Pagination
        style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
        count={totalPages}
        color="secondary"
        onChange={handlePageChange}
        page={currentPage}
        size="large"
      />
    </>
  );
};

export default LatestMoviesPage;
