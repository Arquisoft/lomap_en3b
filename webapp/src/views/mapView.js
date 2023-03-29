import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import { CssBaseline, Grid } from "@mui/material";


const MapView = ({session}) => {
  const [isInteractive, setIsInteractive] = useState(false); // track the interactive state of the map
  const [showList, setShowList] = useState(false);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // places library
  }); // hook to load the google script


    const handleMarkerAdded = () => {

      setIsInteractive(false);
    };

    const makeMapInteractive = () => {
      setIsInteractive(!isInteractive);
      console.log(showList);
      setShowList(!showList);
    };

    if (loadError) return <div> Error Loading Maps </div>;
    if (!isLoaded) return <div>Loading Maps</div>; //Checking if the map loaded

    return (
        <>
          <CssBaseline/>
          <Header onAddMarker={() => makeMapInteractive()}/>
          <Grid container spacing={3} style={{width: "100%"}}>

            <List isVisible={showList}/>

            <Grid item xs={12} md={8}>
              <Map isInteractive={isInteractive} session={session} onMarkerAdded={handleMarkerAdded}/>
            </Grid>
          </Grid>
        </>
    );
  };

export default MapView;
