import React, { useState } from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography, InputBase, TextField} from '@mui/material';
import { AddCircleOutline as AddIcon, AccountCircle as AccountIcon, Place as PlaceIcon } from '@mui/icons-material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemButton,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TuneIcon from '@mui/icons-material/Tune';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '0.375rem',
    marginTop: '0.5rem',
    minWidth: '11.25rem',
    color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0.25rem 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: '1.125rem',
        color: theme.palette.text.secondary,
        marginRight: '0.9375rem',
      },
      '&:active': {
        backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Header = ({ onAddMarker, onInfoList, onAccountPage,onFilterLocations,onLogOut}) => {


  const handleAddButtonClick = () => {
    onAddMarker();
  };
  const handleFilterLocations = () => {

    onFilterLocations();
  };
 

  const handleInfoListClick = () => {
    onInfoList();
  };

 

  const handleLogOutClick = () => {
    onLogOut();
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
////////////////////////////////For Friend Part
  const [filter, setFilter] = useState('');

  const contacts = [
    { name: 'Sofia Martinez', avatar: 'https://picsum.photos/id/239/200/300' },
    { name: 'Alejandro Reyes', avatar: 'https://picsum.photos/id/240/200/300' },
    { name: 'Valentina Torres', avatar: 'https://picsum.photos/id/258/200/300' },
    { name: 'Diego Ramirez', avatar: 'https://picsum.photos/id/275/200/300' },
    { name: 'Isabella Garcia', avatar: 'https://picsum.photos/id/334/200/300' },
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
      <AppBar position="fixed" color="inherit">
        <Toolbar aria-label="ToolBar">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleInfoListClick}>
            <PlaceIcon />
          </IconButton>
          <Typography  variant="h6" sx={{ flexGrow: 1 }}>
            LOMAP
            <Button color="inherit">Home</Button>

            <Button
               aria-label="Friend Menu"
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="inherit"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ fontSize: '1rem' }}
            >
              Friends
            </Button>

            <StyledMenu
                aria-label='Friend menu'
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ fontSize: '1rem' }}
            >
              <Divider sx={{ my: '0.5rem' }} />

              <div>
                <TextField
                    aria-label="Search Friend"
                    variant="outlined"
                    value={filter}
                    onChange={handleFilterChange}
                    sx={{ mb: '1rem', width: '100%', height: '3rem', fontSize: '1.5rem' }}
                />

                <div style={{ overflowY: 'auto', maxHeight: '12.5rem' }}>
                  <List sx={{ width: '100%', maxWidth: '37.5rem' }} aria-label="contacts">
                    {filteredContacts.map((contact) => (
                        <ListItem disablePadding key={contact.name}>
                          <ListItemButton>
                            <ListItemIcon>
                              <Avatar src={contact.avatar} />
                            </ListItemIcon>
                            <ListItemText primary={contact.name} />
                            <IconButton>
                              <PersonRemoveIcon />
                            </IconButton>
                          </ListItemButton>
                        </ListItem>
                    ))}
                  </List>
                </div>
              </div>
              <Divider sx={{ my: '0.5rem' }} />
            </StyledMenu>


            
          </Typography>
          <div>
            <IconButton   aria-label="Filter Locations" color="inherit" onClick={handleFilterLocations} >
              <TuneIcon />
            </IconButton>
           
            <IconButton  aria-label="Add Location"  color="inherit" onClick={handleAddButtonClick} >
              <AddLocationAltIcon />
            </IconButton>
            
            <IconButton aria-label="Log Out option" color="inherit" onClick={handleLogOutClick} >
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

  );
};
export default Header;


