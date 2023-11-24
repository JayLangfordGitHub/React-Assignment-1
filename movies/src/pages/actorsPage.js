import React, { useState } from "react";
import PageTemplate from "../components/templateActorsListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getActors } from '../api/tmdb-api';
import { Pagination } from "@mui/material";

const ActorsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, error, isLoading, isError } = useQuery(
    ['actors', currentPage],
    () => getActors(currentPage)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results.slice(0, 18);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalResults = data.total_results;
  const totalPages = Math.ceil(totalResults / 18); 

  return (
    <>
      <PageTemplate
        title="Actors"
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

export default ActorsPage;
