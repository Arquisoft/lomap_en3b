import './styles/login.css';
import { LoginButton, LogoutButton, SessionProvider } from "@inrupt/solid-ui-react";
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Box, Grid, Typography, CssBaseline } from "@mui/material";

const Login = () => {
    const provider="https://inrupt.net/"; //url of the pod provider. Will consider making a multiple choice cbox.
    const authOptions={
        clientName:"LoMap",
    }; //Our app where the user has been redirected from

    return(
        <LoginButton  oidcIssuer={provider} redirectUrl={window.location.href} authOptions={authOptions}>
            <Grid container component="main" sx={{ height: '100vh', width: '100vw', backgroundColor:'white'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={1}
                    md={4}
                    sx={{
                        backgroundImage: 'url(https://picsum.photos/id/342/1800/1800)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Button} elevation={6} square>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography variant="h3" sx={{ color: '#333333', fontWeight: 'bold', mb: 1 }}>LoMAP</Typography>
                        <Typography variant="subtitle1" sx={{ color: '#555555', mb: 2 }}>Welcome to LoMap</Typography>
                        <Button name="lomapLoginButton" variant="contained" color="inherit" startIcon={<AccountCircleIcon />}>Login</Button>
                    </Box>
                </Grid>
            </Grid>
        </LoginButton>
    );
};

export default Login;
