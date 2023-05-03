import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import CircularProgress from '@mui/material/CircularProgress';

export default function ErrorView() {
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12} md={8} >
        <Typography variant="caption">The map is loading</Typography>
        <CircularProgress />
        <Typography variant="subtitle1">Please wait .....</Typography>
      </Grid>
    </div>
  );
}
