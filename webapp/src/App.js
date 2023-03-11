
import React from 'react';

import{GoogleMap, useLoadScript,Marker, InfoWindow} from "@react-google-maps/api";

import Header from "./Header"; // Tell Webpack this JS file uses this image
import {formatRelative} from "date-fns";
import mapStyles from "./mapStyles";


const ourApp= {
    name: 'LoMap',
    group:'3B',
    lab:'ASW-En-L.3',
    groupMembers:['Manu','Juan','Sebastian','Sara'],

};

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

            <p className="summary">
                This is our first mock in react!:)
            </p>
        </div>
    );
}


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


    return<div> <Header/> <Search/> <Map/>  </div>



}

function Search(){
    // to do

}



const initialMarkers = [
  { key : 1 ,lat: 43.361916, lng: -5.849389, time: new Date() },
  { key : 2 ,lat: 43.371916, lng: -5.859389, time: new Date() }
];

/*
    The main map function
*/
function Map(){
    const[markers, setMarkers] = React.useState([...initialMarkers]); // use state when you want to cause react to rerender
    const[selected, setSelected] = React.useState(null); // get the value when the user clicks 

    const onMapClick = React.useCallback((event)=>  //use callback a function always retains the same value 
    {setMarkers(current => [...current, {
            lat: event.latLng.lat(), // ADDING PLACES using lat and lng of the place clicked 
            lng: event.latLng.lng(),
            time: new Date(), // time of the click
        }]
    )}, []); //adding a new marker to the already existing marker list


    const mapRef = React.useRef(); //use ref when you want to retain state without reloading

    const onMapLoad = React.useCallback((map) => {
        
        mapRef.current = map; // saving a referance to the map to acces it without cousing rerenders
       
    
    },[]);  //gives the map that we assign to the ref for later use

    // initializing the map
    return (<GoogleMap zoom={10} center={{lat : 43.361916 , lng : -5.849389}}
                       mapContainerStyle={containerStyle}
                       options={options} 
                       onClick={onMapClick} //
                       onLoad={onMapLoad}>

        
        {markers.map((marker,index) => <Marker key={`${marker.time.toISOString()}-${index}`} //unique using a key that uses the time
                                       position={ {lat: marker.lat, lng: marker.lng}}
                                       onClick={() => {
                                           setSelected(marker);
                                       }} //rendering markers inside the google maps component
        />)}
        {selected ? (
            <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => {setSelected(null)}}>
                <div>
                    <h2>Location</h2>
                    <h3>Details</h3>
                    <h3>User comments</h3>
                    <p>Added {formatRelative(selected.time, new Date())}</p>
                </div> 
            </InfoWindow>) : null} 
                
    </GoogleMap>);
}