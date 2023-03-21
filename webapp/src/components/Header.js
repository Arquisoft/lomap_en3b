import React,{useState} from 'react'
import {AppBar, Tabs, Toolbar, Typography, Tab, Button, useMediaQuery, useTheme,Box,IconButton} from "@mui/material";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaceIcon from "@mui/icons-material/Place";

import DrawerComp from "./DrawerComp";
import {LogoutButton, SessionProvider} from "@inrupt/solid-ui-react";


const PAGES = ["Explore","Maps","Friends","Groups"];
const Header = () => {

const Header = ({ onAddMarker }) => {

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleAddButtonClick = () => {
      onAddMarker();
    };

    return(
        <React.Fragment>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                        <PlaceIcon size="small" />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        LOMAP
                        <Button>Home</Button>
                        <Button>Friends</Button>
                        <Button>Map</Button>
                    </Typography>

                    <div>
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
}

export default Header;