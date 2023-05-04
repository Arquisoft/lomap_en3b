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
    const [redirectUrl, setRedirectUrl] = useState(window.location.href);
    const [provider,setProvider]= useState("https://inrupt.net");
    const authOptions={
        clientName:"LoMap",
        oidcIssuer:provider,

    };
    const handleSelection = (event) =>{
        setProvider(event.target.value);


    }
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
                    <FormControl aria-label="providerForm" for="providerList" style={{ width: '50%' }} >
                        <InputLabel>Select an Identity provider</InputLabel>
                        <Select id="providerList" aria-label="providers" style={{ width: '100%' } } value={provider} label="inrupt.net" onChange={handleSelection}>
                            <MenuItem  value={"https://inrupt.net"} aria-label="inrupt">Inrupt.net</MenuItem>
                            <MenuItem value={"https://solidcommunity.net/"}    aria-label="solid community" >Solid Community</MenuItem>
                        </Select>
                        <InputLabel>(Inrupt By default)</InputLabel>
                    </FormControl>
                    <LoginButton oidcIssuer={provider} redirectUrl={redirectUrl} authOptions={authOptions} startIcon={<AccountCircleIcon />}>
                        <Button name="lomapLoginButton" variant="contained" color="inherit" startIcon={<AccountCircleIcon />} onClick={handleLogin}>Login</Button>
                    </LoginButton>

                </Box>
            </Grid>
        </Grid>
    );
};


export default Login;