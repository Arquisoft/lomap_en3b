import './styles/login.css';
import {LoginButton} from "@inrupt/solid-ui-react";
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Box, Grid, Typography, CssBaseline } from "@mui/material";
import {FormControl} from "../components/styles/ListStyle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Login = () => {
    const [redirectUrl, setRedirectUrl] = useState("");
    const [provider,setProvider]= useState("");
    const authOptions={
        clientName:"LoMap",
    };

    const handleLogin = () => {
        setRedirectUrl(window.location.href);
    };

    return(
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
            <Grid item xs={12} sm={8} md={5} elevation={6} square style={{
                width: '10%',
                margin: '10rem auto 0',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h3" sx={{ color: '#333333', fontWeight: 'bold', mb: 1 }}>LoMAP</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#555555', mb: 2 }}>Welcome to LoMap</Typography>
                    <FormControl style={{ width: '50%' }} >
                        <InputLabel>Select an Identity provider</InputLabel>
                        <Select style={{ width: '100%' }}>
                            <MenuItem value="https://solidcommunity.net/login" >Solid Community</MenuItem>
                            <MenuItem value="https://solidcommunity.net/login" >Solid Web</MenuItem>
                            <MenuItem value="https://inrupt.net"  >Inrupt.net</MenuItem>
                            <MenuItem value="https://podbrowser.inrupt.com/login"  >Pod spaces browser</MenuItem>
                        </Select>
                    </FormControl>
                    <LoginButton oidcIssuer={provider} redirectUrl={redirectUrl} authOptions={authOptions}>
                        <Button name="lomapLoginButton" variant="contained" color="inherit" startIcon={<AccountCircleIcon />} onClick={handleLogin}>Login</Button>
                    </LoginButton>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;