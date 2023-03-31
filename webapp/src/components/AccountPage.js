import React, { useState } from 'react';
import { Box, Container } from "@mui/material";

const AccountPage = ({ isAccountVisible, onAccountPage }) => {

    const style = {
        display: isAccountVisible ? 'block' : 'none',
        backgroundColor: '#fff',
        borderRadius: '5px',
        width: '100%', // container genişliği
        height: '100vh', // container yüksekliği
        margin: 'auto', // merkezlemek için
        padding: '0',
        zIndex: '999', // yüksek bir değer verin
        position: 'fixed', // ekranın herhangi bir yerinde sabit kalsın
        top: '10vh', // yukarıda 10vh boşluk
        bottom: '10vh', // aşağıda 10vh boşluk
        left: '10%', // solda 10% boşluk
        right: '10%', // sağda 10% boşluk
    }

    return (
        <Container style={style}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            </Box>
        </Container>
    )
};

export default AccountPage;
