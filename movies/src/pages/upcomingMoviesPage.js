import React, { useState } from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from '../api/tmdb-api';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { Pagination } from "@mui/material";

const UpcomingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(['upcoming', currentPage], () => getUpcomingMovies(currentPage));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = data.total_pages; // Adjust based on API response

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
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

export default UpcomingMoviesPage;
