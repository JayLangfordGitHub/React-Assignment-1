import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import PageTemplate from '../components/templateMovieListPage';
import { getSearchMovies } from '../api/tmdb-api'; // make sure this is the correct import path
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Pagination } from "@mui/material"; // If you're using pagination

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // To track the current page for pagination
  const [totalPages, setTotalPages] = useState(0); // To track the total pages from the API

  useEffect(() => {
    getSearchMovies(searchTerm, currentPage).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages); // Assuming the API returns total_pages
      setIsLoading(false);
    });
  }, [searchTerm, currentPage]); // Make sure to re-run the effect when currentPage changes too

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <PageTemplate
        title={`Search Results for: ${searchTerm}`}
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
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

export default SearchPage;
