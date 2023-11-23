import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"; 
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlistIcon = ({ movie }) => {
    const { removeFromMustWatch } = useContext(MoviesContext);

    const handleRemoveFromWatchlist = (e) => {
      removeFromMustWatch(movie);
    };
  
    return (
      <IconButton
        aria-label="remove from watchlist"
        onClick={handleRemoveFromWatchlist}
      >
        <RemoveCircleOutlineIcon color="primary" fontSize="large" />
      </IconButton>
    );
};

export default RemoveFromWatchlistIcon;
