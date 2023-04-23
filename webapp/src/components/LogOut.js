import React, { useState } from 'react';
import {Box, Container, IconButton} from "@mui/material";
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
const LogOut = ({ isLogOutVisible, onLogOut }) => {

    const style = {
        display: isLogOutVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '1rem', // kenar yuvarlatma
        width: '20%', // panel genişliği %30
        height: '16vh', // biraz boşluk bırakmak için %10 boşluk
        margin: '10vh 2vh 10vh 10vh', // üstünden ve altından boşluk bırak
        padding: '0',
        zIndex: '999',
        position: 'fixed',
        top: '0',
        right: '0', // sağ tarafta

    }

    const handleAddButtonClick = () => {
        onLogOut();
    };
    const handleLogOut = () => {
        onLogOut();
    };

    return (
        <Container style={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <p>Are you sure you want to log out? </p>
                <Box sx={{ mb: 2 }}>
                    <Button variant="contained" color="primary" style={{ backgroundColor: 'grey' }} onClick={handleLogOut}>
                        Log out
                    </Button>
                </Box>
            </Box>
        </Container>

    )
};

export default LogOut;
