import React from "react";
import PageTemplate from "../components/templateActorsListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import {getActors} from '../api/tmdb-api';
const ActorsPage = (props) => {
    const {data, error, isLoading, isError}  = useQuery('actors', getActors)

    if (isLoading){
       return <Spinner/>
    }
    if (isError) {
      return <h1>{error.message}</h1>
    }
      const actors = data.results;



    return (
      <PageTemplate
        title="Actors"
        actors={actors}
      />
    );
  };
  export default ActorsPage; 