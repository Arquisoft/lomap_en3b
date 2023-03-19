import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlaceIcon from '@mui/icons-material/Place';
const Navbar = () => {
// I AM NOT USİNG THİS FİLE ANYMORE I TRY TO MAKE IN THİS FİİLE BUT ITWAS HARD SO I GİVE UP


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
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;