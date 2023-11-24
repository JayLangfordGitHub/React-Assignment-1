import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActorListPageTemplate from '../components/templateActorsListPage'; 
import { getSearchActors } from '../api/tmdb-api'; 
import Spinner from '../components/spinner';
import { Pagination } from "@mui/material";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchActorsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getSearchActors(searchTerm, currentPage).then((data) => {
      setActors(data.results);
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
      <ActorListPageTemplate
        title={`Search Results for: ${searchTerm}`}
        actors={actors}
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

export default SearchActorsPage;
