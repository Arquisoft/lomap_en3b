import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { AddCircleOutline as AddIcon, AccountCircle as AccountIcon, Place as PlaceIcon } from '@mui/icons-material';

const Header = ({ onAddMarker }) => {

  

  const handleAddButtonClick = () => {
    
    onAddMarker();
  };


  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <PlaceIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LOMAP
        </Typography>
        <div>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Friends</Button>
          <Button color="inherit">Map</Button>
        </div>
        <div>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleAddButtonClick}>
            <AddIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
