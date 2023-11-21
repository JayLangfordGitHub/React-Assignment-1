import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieActorsListPage";
import { ActorContext } from "../contexts/movieActorContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromActorFavorites";

const FavoriteActorsPage = () => {
  const {favorites: actorsIds } = useContext(ActorContext);

  const favoriteActorQueries = useQueries(
    actorsIds.map((actorsId) => {
      return {
        queryKey: ["actors", { id: actorsId }],
        queryFn: getActor,
      };
    })
  );
  const isLoading = favoriteActorQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

   const actors = favoriteActorQueries.map((q) => {
     return q.data });

  return (
    <PageTemplate
      title="Favorite Actors"
      actors={actors}
      action={(actors) => {
        return (
          <>
            <RemoveFromFavorites actors={actors} />
          </>
        );
      }}
    />
  );
};

export default FavoriteActorsPage;