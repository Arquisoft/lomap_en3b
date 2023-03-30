// the list where I will retrive the markers from juan and preload them
import React from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import "./styles/Locations.css"
import mapStyles from "./styles/MapStyles";
import {readLocations} from "../handlers/podAccess";

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



/*
  The main map function
*/
function Map({ isInteractive,session, onMarkerAdded}) {

    
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
        onMarkerAdded(); // Call the onMarkerAdded callback
        setCanAddMarker(true); // Set canAddMarker to false after adding a marker
      },
      []
    );
    const retrieveLocations=async () => {
        let resource = session.info.webId.replace("/profile/card#me", "/lomap/locations.ttl")
        return await readLocations(resource, session); //TODO -> si usamos session handler podríamos tener las localizaciones en session?
    }
  
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);
  
    React.useEffect( () => {
        async function getAndSetLocations() {
            let locationSet = await retrieveLocations()
            setMarkers((current) => [...current, ...locationSet]);
        }

       getAndSetLocations();
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
                  <section name="LocationInfo">
                      <h2>{selected.name}</h2>
                      <p name="coordinates">at {selected.lat}, {selected.lng}</p>
                      <p name="category">Classified as {selected.cat}</p>
                      <h3>Description</h3>
                      <p>{selected.description}</p>
                  </section>
                  <section name="comments">
                    <h3>Comment Section</h3>
                      <p>No comments yet...</p>
                  </section>

              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </React.Fragment>
    );
  }
  

export default Map;