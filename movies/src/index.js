import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import WatchlistMoviesPage from "./pages/watchlistMoviesPage";
import ActorsPage from "./pages/actorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [auth]); // `auth` in the dependency array

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
              <>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/watchlist" element={<WatchlistMoviesPage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/signin" replace />} />
              </>
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
