import React, {useState} from "react";
import {SessionProvider} from "@inrupt/solid-ui-react";
import {useLoadScript} from "@react-google-maps/api";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import {Search} from "@mui/icons-material";
import { CssBaseline,Grid } from "@mui/material";

/*
        Function used to
        load the google script
    */
export default function First(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],  // places library
    }); // hook to load the google script


    if(loadError) return <div> Error Loading Maps </div>
    if(!isLoaded) return <div>Loading Maps</div> //Checking if the map loaded


    return(
        <>


            <CssBaseline/>
            <Header />
            <Grid container spacing={3} style={{width:'100%'}}>

                <Grid item xs={12} md={4}>
                    <List />
                </Grid>



                <Grid item xs={12} md={8}>
                    <Map/>
                </Grid>


            </Grid>






        </>
    );



}