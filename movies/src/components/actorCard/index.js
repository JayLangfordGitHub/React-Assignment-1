import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


export default function ActorCard({ actors }){
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={
            <Typography variant="h5" component="p">
              {actors.name}{" "}
            </Typography>
          }
        />
        <CardMedia
          sx={{ height: 500 }}
          image={
            actors.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actors.profile_path}`
              : img
          }
        />
        <CardContent></CardContent>
        <CardActions disableSpacing>
          <Link to={`/actors/${actors.id}`}>
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
}