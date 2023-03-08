
import React from 'react';
import { useMemo } from 'react';
import{GoogleMap, useLoadScript,Marker, InfoWindow} from "@react-google-maps/api";
import beachimg from './images/beach.jpg';
import Header from "./Header"; // Tell Webpack this JS file uses this image
import {formatRelative} from "date-fns";
import mapStyles from "./mapStyles";
import usePlacesAutocomplate, {getGeocode, getLatLng} from "use-places-autocomplete";

import "@reach/combobox/styles.css";

const ourApp= {
    name: 'LoMap',
    group:'3B',
    lab:'ASW-En-L.3',
    groupMembers:['Manu','Juan','Sebastian','Sara'],

};
const containerStyle = {
    width: '100vw',
    height: '100vh'
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomcontrol: true
};
const libraries = ["places"];
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

export default function First(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });
    const[markers, setMarkers] = React.useState([]);
    const[selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event)=>
    {setMarkers(current => [...current, {
            lat: event.latLng.lat(), // ADİNG PLACES
            lng: event.latLng.lng(),
            time: new Date(),
        }]
    )}, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    },[]);

    if(loadError) return <div> Error Loading Maps </div>
    if(!isLoaded) return <div>Loading Maps</div>
    return<div> <Header/> <Search/> <Map/>  </div>



}
function Search(){

}
function Map(){
    const[markers, setMarkers] = React.useState([]);
    const[selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event)=>
    {setMarkers(current => [...current, {
            lat: event.latLng.lat(), // ADİNG PLACES
            lng: event.latLng.lng(),
            time: new Date(),
        }]
    )}, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    },[]);
    return (<GoogleMap zoom={10} center={{lat : 43.361916 , lng : -5.849389}}
                       mapContainerStyle={containerStyle}
                       options={options}
                       onClick={onMapClick}
                       onLoad={onMapLoad}>


        <Marker position={{lat: 43.361916 , lng: -5.849389}} />
        {markers.map(marker => <Marker key={marker.time.toISOString()}
                                       position={ {lat: marker.lat, lng: marker.lng}}
                                       icon={{
                                           url: "/location.svg",
                                           scaledSize: new window.google.maps.Size(30,30),
                                           origin: new window.google.maps.Point(0,0),
                                           anchor: new window.google.maps.Point(15,15),
                                       }}
                                       onClick={() => {
                                           setSelected(marker);
                                       }}
        />)}
        {selected ? (
            <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => {setSelected(null)}}>
                <div>
                    <h2>Location</h2>
                    <h3>details</h3>
                    <h3>user comment</h3>
                    <p>Spotted {formatRelative(selected.time, new Date())}</p>
                </div>
            </InfoWindow>) : null}
    </GoogleMap>);
}

