import {Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
export default function  ErrorView( ){



        return (
                <Grid item xs={12} md={8} >
                    <Typography variant="caption">We are sorry..</Typography>
                    <HeartBrokenIcon></HeartBrokenIcon>
                    <Typography variant="subtitle1">An error ocurred</Typography>
                </Grid>
                    );
}

