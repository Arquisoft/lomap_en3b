import React, { useState } from 'react';
import {Box, Container, IconButton, Tab, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import {LogoutButton} from "@inrupt/solid-ui-react";
import CloseIcon from "@mui/icons-material/Close";
import ButtonBase from "@mui/material/ButtonBase";
import  "../components/styles/LogOut.css"
const LogOut = ({ isLogOutVisible, onLogOut }) => {

    const style = {
        display: isLogOutVisible ? 'grid' : 'none',

        position: 'fixed',
        zIndex: '999',
        top: '0',
        right: '0',


    }

    const handleAddButtonClick = () => {
        onLogOut();
    };
    const handleLogOut = () => {
        onLogOut();
    };

    return (
        <Container name={"LogOutContainer"} style={style}>

            <Typography variant="h5">Are you sure you want to leave?</Typography>
                 <LogoutButton>
                    <Button name="logOutBtn" variant="contained" color="primary" style={{ backgroundColor: 'purple' }} onClick={handleLogOut}>
                        Log out
                    </Button>
                     </LogoutButton>
            <Button
                name="back"
                onClick={handleAddButtonClick}
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'grey' }}
            >
                Go back
            </Button>

        </Container>

    )
};

export default LogOut;
