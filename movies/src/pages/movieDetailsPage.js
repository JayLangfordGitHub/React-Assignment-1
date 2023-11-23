import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from '../api/tmdb-api'; 
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import Grid from "@mui/material/Grid"; 
import CastCard from '../components/castCard';
import Typography from "@mui/material/Typography";

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error: movieError, isLoading: isMovieLoading, isError: isMovieError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: cast, error: castError, isLoading: isCastLoading, isError: isCastError } = useQuery(
    ["cast", id],
    () => getMovieCast(id)
  );

  if (isMovieLoading || isCastLoading) {
    return <Spinner />;
  }

  if (isMovieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (isCastError) {
    return <h1>{castError.message}</h1>;
  }

  return (
    <>
      <PageTemplate movie={movie}>
        <MovieDetails movie={movie} />
        <Typography variant="h5" component="h2" sx={{ marginTop: 2, marginBottom: 2 }}>
          Cast
        </Typography>

        <Grid container spacing={2}>
          {cast.map(actor => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={actor.id}>
              <CastCard actor={actor} />
            </Grid>
          ))}
        </Grid>
      </PageTemplate>
  </>
  );
};

export default MoviePage;