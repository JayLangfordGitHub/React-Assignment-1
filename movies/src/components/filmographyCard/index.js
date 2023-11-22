import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png';
import { CardActions } from "@mui/material";
import Button from '@mui/material/Button';

export default function FilmographyCard({ movie }) {
  return (
    <Card sx={{ width: '100%', maxWidth: 400 }}> {/* Updated maxWidth */}
      <CardMedia
        sx={{ height: 500 }} // You might want to adjust this as well
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Typography variant="h5" component="p">
          {movie.title}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}> 
            <Typography variant="body2" color="text.secondary">
              Release Date: {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={12}> 
            <Typography variant="body2" color="text.secondary">
              Rating: {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
