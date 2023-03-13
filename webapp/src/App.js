
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import Login from "./components/Login.js";

import{GoogleMap, useLoadScript,Marker, InfoWindow} from "@react-google-maps/api";

import Header from "./Header"; // Tell Webpack this JS file uses this image
import {formatRelative} from "date-fns";
import mapStyles from "./mapStyles";





 function App(){
    return (
//setting the width and height of the <div> arround the google map
const containerStyle = {
    width: '100vw',
    height: '100vh'
};


//const for the map style
const options = {
    styles: mapStyles,
    disableDefaultUI: true, //gets rid of the unwanted google maps features
    zoomcontrol: true
};





export function App() {

    return (
        <div className="intro">
            <h1>Welcome to {ourApp.name}!</h1>


            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                </Routes>

            </BrowserRouter>

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


    return <div> <Header/> <Search/> <Map/>  </div>



}

function Search(){
    // to do

}


// the list where I will retrive the markers from juan and preload them
const initialMarkers = [
    { key : 'marker-1' ,lat: 43.361916, lng: -5.849389, time: new Date() },
    { key : 'marker-2' ,lat: 43.371916, lng: -5.859389, time: new Date() }
  ];

/*
    The main map function
*/
function Map() {
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const mapRef = React.useRef();

    const onMapClick = React.useCallback(
      (event) =>
        setMarkers((current) => [
          ...current,
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          },
        ]),
      []
    );

    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

    React.useEffect(() => {
      setMarkers((current) => [...current, ...initialMarkers]);
    }, []);

    return (
      <GoogleMap
        zoom={10}
        center={{ lat: 43.361916, lng: -5.849389 }}
        mapContainerStyle={containerStyle}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.time.toISOString()}-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/location.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Location</h2>
              <h3>Details</h3>
              <h3>User comments</h3>
              <p>Added {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    );
  }

