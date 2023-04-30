import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

export default function ErrorView() {
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12} md={8} >
        <Typography variant="caption">We are sorry..</Typography>
        <HeartBrokenIcon></HeartBrokenIcon>
        <Typography variant="subtitle1">An error occurred</Typography>
      </Grid>
    </div>
  );
}
