import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageTemplate from '../components/templateMovieListPage';
import { getSearchMovies } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Pagination } from "@mui/material";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const searchTerm = query.get('movieQuery');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); 

  useEffect(() => {
    getSearchMovies(searchTerm, currentPage).then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages); 
      setIsLoading(false);
    });
  }, [searchTerm, currentPage]); 

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
