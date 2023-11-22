import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { useQuery } from "react-query";
import { getActorFilmography } from "../../api/tmdb-api";
import MovieCard from "../movieCard";
import { Grid } from "@mui/material";
import FilmographyCard from "../filmographyCard";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const ActorDetails = ({ actors }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: filmography, isLoading, isError, error } = useQuery(
    ["filmography", { id: actors.id }], 
    getActorFilmography
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actors.biography || "No biography available."}
      </Typography>

      

      <Typography variant="h5" component="h3">
        Filmography
      </Typography>
      <Grid container spacing={2}>
        {filmography && filmography.cast.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <FilmographyCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      </Drawer>
    </>
  );
};

export default ActorDetails;
