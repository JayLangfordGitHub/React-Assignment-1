import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png'; 

export default function CastCard({ actor }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : img}
        alt={actor.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {actor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {actor.character}
        </Typography>
      </CardContent>
      <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
        <Typography sx={{ p: 2 }} color="primary">
          View Full Profile
        </Typography>
      </Link>
    </Card>
  );
}
