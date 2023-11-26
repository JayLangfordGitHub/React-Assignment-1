import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchText, setSearchText] = useState("");
  const [actorSearchText, setActorSearchText] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Latest", path: "/movies/latest" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/watchlist" },
    { label: "Actors", path: "/actors" },
  ];

  const StyledButton = styled(Button)(({ theme }) => ({
    color: 'white', 
    '&:not(:last-of-type)': {
      borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
    },
  }));

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/search/movies?movieQuery=${searchText}`);
  };
  
  const handleSubmitActorSearch = (e) => {
    e.preventDefault();
    navigate(`/search/actors?actorQuery=${actorSearchText}`);
  };

  const handleActorSearchInput = (e) => {
    setActorSearchText(e.target.value);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#424242' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: 'white' }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
            All you ever wanted to know about Movies!
          </Typography>
          <form onSubmit={handleSubmitSearch} style={{ display: 'inline' }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchText}
              onChange={handleSearchInput}
              style={{ marginRight: '10px' }}
            />
            <StyledButton type="submit">
              Search Movies
            </StyledButton>
          </form>
          <form onSubmit={handleSubmitActorSearch} style={{ display: 'inline', marginLeft: '10px' }}>
            <input
              type="text"
              placeholder="Search actors..."
              value={actorSearchText}
              onChange={handleActorSearchInput}
              style={{ marginRight: '10px' }}
            />
            <StyledButton type="submit">
              Search Actors
            </StyledButton>
          </form>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: 'white', marginLeft: '10px' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            menuOptions.map((opt) => (
              <StyledButton
                key={opt.label}
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </StyledButton>
            ))
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
