import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "white"
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [ratingFilter, setRatingFilter] = useState('');

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e) => {
    props.onUserInput("name", e.target.value);
  };

  const handleGenreChange = (e) => {
    props.onUserInput("genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
    props.onUserInput("rating", e.target.value);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#424242" }}>
      <CardContent>
        <Typography variant="h5" component="h1" sx={{ color: 'white' }}>
          <SearchIcon fontSize="large" sx={{ color: 'white' }} />
          Filter the movies.
        </Typography>
        <TextField
          sx={formControl}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={formControl}>
          <InputLabel id="genre-label" sx={{ color: 'black' }}>Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={formControl}>
          <InputLabel id="rating-label" sx={{ color: 'black' }}>Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={ratingFilter}
            onChange={handleRatingChange}
          >
           <MenuItem value={0}>0 </MenuItem>
           <MenuItem value={1}>1 </MenuItem>
           <MenuItem value={2}>2 </MenuItem>
           <MenuItem value={3}>3 </MenuItem>
           <MenuItem value={4}>4 </MenuItem>
           <MenuItem value={5}>5 </MenuItem>
           <MenuItem value={6}>6 </MenuItem>
           <MenuItem value={7}>7 </MenuItem>
           <MenuItem value={8}>8 </MenuItem>
           <MenuItem value={9}>9 </MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}
