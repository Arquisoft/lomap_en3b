// the list where I will retrive the markers from juan and preload them
import React, {useState} from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import Header from "./Header";
import mapStyles from "./styles/MapStyles";
import Rating from "react-rating-stars-component";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import {Box, IconButton} from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";


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
  { key: 'marker-2', lat: 43.371916, lng: -5.859389, time: new Date()} // ismi çalışıyor mu diye ben verdim
];

/*
  The main map function
*/
 export function handleRateChange(newRating, selected) { // ı made this export cause all ın other file
    selected.rate = newRating;
}

  function Map({ isInteractive, onMarkerAdded}) {
     const [markers, setMarkers] = React.useState([]);
     const [selected, setSelected] = React.useState(null);
     const [canAddMarker, setCanAddMarker] = React.useState(false); // Add state to track whether we can add a marker or not
     const mapRef = React.useRef(null);
     const [showNameInput, setShowNameInput] = useState(false); // ınfowindow buton

     const addMarker = React.useCallback(
         (event) => {
             setMarkers((current) => [
                 ...current,
                 {
                     lat: event.latLng.lat(),
                     lng: event.latLng.lng(),
                     time: new Date(),
                     name: '', // isim ekliyoruz
                     type: '',
                     privacy: '',
                     rate: '',

                 },
             ]);
             console.log(1);
             onMarkerAdded(); // Call the onMarkerAdded callback
             setCanAddMarker(true); // Set canAddMarker to false after adding a marker
         },
         []
     );
     const handleMarkerClick = (marker) => {
         setSelected(marker);
     }

     const handleNameChange = (event, marker) => {
         marker.name = event.target.value;
         setMarkers([...markers]);
     }

     const handleTypeChange = (event, marker) => {
         marker.type = event.target.value;
         setMarkers([...markers]);
     }
     const handlePrivacyChange = (event, marker) => {
         marker.privacy = event.target.value;
         setMarkers([...markers]);
     }

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
                    style={{ display: 'block' }}
                >
                    <div>
                        <img src="https://picsum.photos/200" alt="Image" style={{width: "150px", height: "100px"}} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: '10px', width: '100%' }}>
                            <InputLabel sx={{ fontSize: '16px', fontWeight: 'bold' }}>{selected.name}</InputLabel>
                            <Rating name="rating" count={5} size="small" defaultValue={3} precision={0.5} readOnly />
                            <Typography variant="caption" sx={{ mt: '5px' }}>{selected.type} • {selected.privacy}</Typography>
                            <IconButton
                                style={{ width: "2px", height: "2px" }}
                                onClick={() => setShowNameInput(!showNameInput)}
                            >
                                <EditLocationAltIcon />
                            </IconButton>
                        </Box>

                        {showNameInput && (  < input
                            type="text"
                            value={selected.name}
                            onChange={(event) => {
                                handleNameChange(event, selected);
                            }}
                            placeholder="Name"
                            style={{ width: "150px" }}
                          /> )}
                        {showNameInput && (
                            <div>
                                <select
                                    type="text"
                                    value={selected.type}
                                    style={{ width: "150px" }}
                                    onChange={(event) => {
                                        handleTypeChange(event, selected);
                                    }}
                                >
                                    <option value="Bars">Bars</option>
                                    <option value="Market">Market</option>
                                    <option value="Park">Park</option>
                                </select>
                            </div>
                        )}
                        {showNameInput && (
                            <div>
                                <select
                                    type="text"
                                    value={selected.privacy}
                                    style={{ width: "150px" }}
                                    onChange={(event) => {
                                        handlePrivacyChange(event, selected);
                                    }}
                                >
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                        )}


                        <div >
                            <p style={{ marginBottom: "4px" }}>
                                <span >Added</span>
                            <span style={{ display: "block" }}>
                            {new Date(selected.time).toLocaleDateString()}
                             </span>
                                <span>{new Date(selected.time).toLocaleTimeString()}</span>
                            </p>

                        </div>



                    </div>
                </InfoWindow>

            ) : null}
        </GoogleMap>
      </React.Fragment>
    );
  }


export default Map;