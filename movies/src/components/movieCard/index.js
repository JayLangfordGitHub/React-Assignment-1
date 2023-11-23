import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { CardActions, Box} from "@mui/material";


export default function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(MoviesContext);


  const isFavorite = favorites.some(id => id === movie.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" component="div">
              <StarRateIcon sx={{ verticalAlign: 'bottom' }} />
              {` ${movie.vote_average}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" component="div">
              Release Date: {movie.release_date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 1 }}>
    <IconButton onClick={handleToggleFavorite} size="large">
      <FavoriteIcon color={isFavorite ? "error" : "primary"} />
    </IconButton>
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Button variant="outlined" size="medium" color="primary">
        More Info ...
      </Button>
    </Link>
  </Box>
</CardActions>
    </Card>
  );
}
