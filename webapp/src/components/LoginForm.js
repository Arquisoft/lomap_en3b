import '../App.css';
import {LoginButton, LogoutButton, SessionProvider} from "@inrupt/solid-ui-react";
import React, { useState} from "react";

import {AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const Login = () => {
    const provider="https://login.inrupt.com/"; //url of the pod provider. Will consider making a multiple choice cbox.
    const authOptions={
        clientName:"LoMap",
    }; //Our app where the user has been redirected from

    return(


                                    <LoginButton  oidcIssuer={provider} redirectUrl={window.location.href} authOptions={authOptions}>
                                        <Button sx={{marginLeft: '40em'}} variant="outlined" color="secondary" startIcon={<AccountCircleIcon />}>Login</Button>
                                    </LoginButton>




    )
}

export default Login;