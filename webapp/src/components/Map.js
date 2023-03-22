// the list where I will retrive the markers from juan and preload them
import React from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import Header from "./Header";
import mapStyles from "./styles/MapStyles";

// setting the width and height of the <div> around the google map
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

// const for the map style
const options = {
  styles: mapStyles,
  disableDefaultUI: true, //gets rid of the unwanted google maps features
  zoomcontrol: true
};

const initialMarkers = [
  { key: 'marker-1', lat: 43.361916, lng: -5.849389, time: new Date() },
  { key: 'marker-2', lat: 43.371916, lng: -5.859389, time: new Date() }
];

/*
  The main map function
*/
function Map({isInteractive}) {

  console.log('isInteractive:', isInteractive);
    
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [canAddMarker, setCanAddMarker] = React.useState(false); // Add state to track whether we can add a marker or not
    const mapRef = React.useRef(null);
  
    const addMarker = React.useCallback(
      (event) => {
        setMarkers((current) => [
          ...current,
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          },
        ]);

        console.log(1);
        
        setCanAddMarker(true); // Set canAddMarker to false after adding a marker
      },
      []
    );
  
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);
  
    React.useEffect(() => {
      setMarkers((current) => [...current, ...initialMarkers]);
    }, []);
  
    // Set canAddMarker to true when isInteractive changes to true
    React.useEffect(() => {
      if (canAddMarker) {
        setCanAddMarker(false);
        
      }
    }, [canAddMarker]);
  
    return (
      <React.Fragment>
        
        <GoogleMap
          zoom={10}
          center={{ lat: 43.361916, lng: -5.849389 }}
          mapContainerStyle={containerStyle}
          options={options}
          onClick={isInteractive ? addMarker : null} // Only allow adding markers when canAddMarker is true
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
      </React.Fragment>
    );
  }
  

export default Map;