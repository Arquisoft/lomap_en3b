import '../styles/Login.css';
import {LoginButton, LogoutButton, SessionProvider} from "@inrupt/solid-ui-react";
import React, { useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Button,Box,Grid,Typography,CssBaseline} from "@mui/material";

const Login = () => {
    const provider="https://login.inrupt.com/"; //url of the pod provider. Will consider making a multiple choice cbox.
    const authOptions={
        clientName:"LoMap",
    }; //Our app where the user has been redirected from

    return(

                                    <LoginButton  oidcIssuer={provider} redirectUrl={window.location.href} authOptions={authOptions}>

                                        <Grid container component="main" sx={{ height: '100vh', width: '100vw', backgroundColor:'black'}}>
                                        <CssBaseline />
                                            <Grid
                                                item
                                                xs={false}
                                                sm={1}
                                                md={4}
                                                sx={{
                                                    backgroundImage: 'url(https://images.unsplash.com/photo-1678737170444-02a5880ba0fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                            <Grid item xs={12} sm={8} md={5} component={Button} elevation={6} square>




                                                <Button name="lomapLoginButton" variant="outlined" color="secondary" startIcon={<AccountCircleIcon />}>Login</Button>
                                            </Grid>
                                              </Grid>

                                    </LoginButton>




    )
}

export default Login;