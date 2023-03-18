import React, {useState} from "react";
import {SessionProvider} from "@inrupt/solid-ui-react";
import {useLoadScript} from "@react-google-maps/api";
import Header from "../components/Header";
import Map from "../components/Map";
import {Search} from "@mui/icons-material";

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


        return <section> <Header/> <Search/> <Map/>  </section>



    }

