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

  // Limit the number of actors to 18
  const actors = data.results.slice(0, 18);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // You might want to calculate total pages based on this new number
  // For example, if API gives you total_pages based on 20 items per page:
  const totalResults = data.total_results;
  const totalPages = Math.ceil(totalResults / 18); // now we use 18 instead of 20

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
