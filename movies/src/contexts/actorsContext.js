import React, { useState } from "react";

export const ActorContext = React.createContext(null);

const ActorsContext = (props) => {
  const [favorites, setFavorites] = useState( [] ) 
  console.log("ActorContextProvider - Favorites:", favorites);

  const addToActorFavorites = (actors) => {
    let newFavorites = [];
    if (!favorites.includes(actors.id)){
      newFavorites = [...favorites, actors.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

   const removeFromActorFavorites = (actors) => {
    setFavorites( favorites.filter(
      (mId) => mId !== actors.id
    ) )
  };


 return (
    <ActorContext.Provider
      value={{
        favorites,
        addToActorFavorites,
        removeFromActorFavorites,
      }}
    >
      {props.children}
    </ActorContext.Provider>
  );
};

export default ActorsContext;