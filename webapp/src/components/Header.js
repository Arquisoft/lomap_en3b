import React, { useState } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography, InputBase} from '@mui/material';
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


import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
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

const Header = ({ onAddMarker, onInfoList, onEditMarker, onAccountPage}) => {



  const handleAddButtonClick = () => {
    onAddMarker();
  };

  const handleEditLocationButtonClick = () => {
    onEditMarker();
  };

  const handleInfoListClick = () => {
    onInfoList();
  };

  const handleAccountPageClick = () => {
    onAccountPage();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
      <AppBar position="fixed" color="inherit">
        <Toolbar >
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleInfoListClick}>
            <PlaceIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LOMAP
            <Button color="inherit">Home</Button>

            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="inherit"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
              Friends
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
              <div style={{ overflowY: 'auto', maxHeight: '100px' }}>
                <List sx={{ width: '100%', maxWidth: 360,  }} aria-label="contacts">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar src="https://picsum.photos/id/318/200/300"/>
                </ListItemIcon>
                <ListItemText  primary="Martina García" />
                <IconButton>
                  <PersonRemoveIcon/>
                </IconButton>
              </ListItemButton>
            </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar src="https://picsum.photos/id/331/200/300"/>
                      </ListItemIcon>
                      <ListItemText  primary="Alejandro Torres" />
                      <IconButton>
                        <PersonRemoveIcon/>
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <Divider sx={{ my: 0.5 }} />
            </StyledMenu>

            <Button color="inherit">Map</Button>
          </Typography>
          <div>
            <IconButton color="inherit" onClick={handleEditLocationButtonClick} >
              <EditLocationIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleAddButtonClick} >
              <AddLocationAltIcon />
            </IconButton>
            <IconButton color="inherit"  onClick={handleAccountPageClick} >
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


