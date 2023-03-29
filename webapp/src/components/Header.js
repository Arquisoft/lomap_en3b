import React, { useState } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography, InputBase } from '@mui/material';
import { AddCircleOutline as AddIcon, AccountCircle as AccountIcon, Place as PlaceIcon, Search as SearchIcon } from '@mui/icons-material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocation';

const Header = ({ onAddMarker, onInfoList,   onEditMarker}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleAddButtonClick = () => {
    onAddMarker();
  };

  const handleEditLocationButtonClick = () => {
    onEditMarker();
  };

  const handleInfoListClick = () => {
    onInfoList();
  };



  return (
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleInfoListClick}>
            <PlaceIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LOMAP
            <Button color="inherit">Home</Button>
            <Button color="inherit">Friends</Button>
            <Button color="inherit">Map</Button>
          </Typography>

          <div>
            <IconButton color="inherit" onClick={handleEditLocationButtonClick} >
              <EditLocationIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleAddButtonClick} >
              <AddLocationAltIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountIcon />
            </IconButton>
            <IconButton color="inherit" >
              <AddIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Header;


