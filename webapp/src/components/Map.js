// the list where I will retrive the markers from juan and preload them
import React from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import {formatRelative} from "date-fns";
import Header from "./Header";
import mapStyles from "../mapStyles";

function Search(){
    // to do

}
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
    const mapRef = React.useRef(null);
    /**
     *
     */

    const addMarker = React.useCallback(
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
            onClick={addMarker}
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

export default Map;