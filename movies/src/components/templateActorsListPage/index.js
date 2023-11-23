import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";

function ActorsListPageTemplate({ actors, title, action }) {
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <ActorList action={action} actors={actors}></ActorList>
      </Grid>
    </Grid>
  );
}
export default ActorsListPageTemplate;
