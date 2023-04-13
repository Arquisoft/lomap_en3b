// the list where I will retrive the markers from juan and preload them
import React, {useState} from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import "./styles/Locations.css"
import mapStyles from "./styles/MapStyles";
import {readLocations} from "../handlers/podAccess";
import Rating from "react-rating-stars-component";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import {Box, InputLabel,Typography, Container,IconButton} from '@mui/material';




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

export function handleRateChange(newRating, selected) { // ı made this export cause all ın other file
    selected.rate = newRating;
}
//TODO: Method fill a list with markers (UseEffect)
function mockMarkerstoThePod(){
    let ret = [];

    //43.369610, -5.852584
    ret.push({
        lat: 43.369610,
        lng: -5.852584,
        time: new Date(),
        name: 'Casa1',
        category: 'Bar',
        privacy: 'public',
    });
    //43.365905, -5.856349
    ret.push({
        lat: 43.365905,
        lng: -5.856349,
        time: new Date(),
        name: 'Casa2',
        category: 'shop',
        privacy: 'private',
    });
    //43.366527, -5.854924
    ret.push({
        lat: 43.366527,
        lng: -5.854924,
        time: new Date(),
        name: 'Casa3',
        category: 'restaurant',
        privacy: 'public',
    });
    //43.369875, -5.854823
    ret.push({
        lat: 43.369875,
        lng: -5.854823,
        time: new Date(),
        name: 'Casa4',
        category: 'park',
        privacy: 'private',
    });
    //43.368946, -5.852785
    ret.push({
        lat: 43.368946,
        lng: -5.852785,
        time: new Date(),
        name: 'Casa5',
        category: 'monument',
        privacy: 'public',
    });
    //43.360266, -5.852354
    ret.push({
        lat: 43.360266,
        lng: -5.852354,
        time: new Date(),
        name: 'Casa6',
        category: 'sight',
        privacy: 'private',
    });

    return ret;
}

/*
  The main map function
*/
function Map({ changesInFilters,selectedFilters,isInteractive,session, onMarkerAdded, crl}) {
    const[originalMarkers,setOriginalMarkers]=React.useState([])// in order to restore markers after filtering
    const [markers, setMarkers] = React.useState(mockMarkerstoThePod()); //TODO: Add markers from POD
    //const [markers, setMarkers] = React.useState(crl.logIn().requestLocations()); //TODO: Add markers from POD
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
                    description:'',
                    name: '', // isim ekliyoruz
                    category: '',
                    privacy: '',
                    rate: '',

                },
            ]);

            onMarkerAdded(); // Call the onMarkerAdded callback
            setCanAddMarker(true); // Set canAddMarker to false after adding a marker
        },
        []
    );
    const retrieveLocations=async () => {
        let resource = session.info.webId.replace("/profile/card#me", "/lomap/locations.ttl")
        return await readLocations(resource, session); //TODO -> si usamos session handler podríamos tener las localizaciones en session?
    }
    async function getAndSetLocations() {
        let locationSet = await retrieveLocations()
        setMarkers((current) => [...current, ...locationSet]);
        setOriginalMarkers(locationSet)
    }


    // Set canAddMarker to true when isInteractive changes to true
    React.useEffect(() => {
        if (canAddMarker) {
            setCanAddMarker(false);

        }
    }, [canAddMarker]);



    const handleMarkerClick = (marker) => {
        setSelected(marker);
    }

    const handleNameChange = (event, marker) => {
        marker.name = event.target.value;
        setMarkers([...markers]);
    }

    const handleTypeChange = (event, marker) => {
        marker.category= event.target.value;
        setMarkers([...markers]);
    }
    const handlePrivacyChange = (event, marker) => {
        marker.privacy = event.target.value;
        setMarkers([...markers]);
    }

    const onMapLoad = async (map) => {
        mapRef.current = map;
       await getAndSetLocations();
    } ;

    React.useEffect(()=>{


        if(selectedFilters.length>0){//If there are no filters selected i want the original, non filtered set of markers displayed.
            let filteredSet =[];
            for (let  category = 0; category <selectedFilters.length ;category++) {
                for (let i = 0; i < originalMarkers.length; i++) {
                    if (selectedFilters[category] === originalMarkers[i].category && !filteredSet.find((element) => element === originalMarkers[i])) {
                        filteredSet.push(originalMarkers[i])
                    }

                }

                setMarkers(filteredSet);

            }}else{

            setMarkers( originalMarkers);
        }

    },changesInFilters)

    // Set canAddMarker to true when isInteractive changes to true
    React.useEffect(() => {
        if (canAddMarker) {
            setCanAddMarker(false);
        }
    }, [canAddMarker]);

    const iconUrls = {
        park: "/greenLocation.svg",
        bar: "/redLocation.svg",
        restaurant: "/orangeLocation.svg",
        shop: "/blueLocation.svg",
        sight:"/trasnparentLocation.svg",
        monument:"/purpleLocation.svg",
        other:  "/blackLocation.svg",
        // u can Adding more types and URLs as needed
    };


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
                        key={marker.locId}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{

                            url: iconUrls[marker.category] || "/blackLocation.svg",
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
                        <img src="https://picsum.photos/200" alt="Image" style={{ width: '9.375rem', height: '6.25rem' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: '0.625rem', width: '100%' }}>
                            <InputLabel sx={{ fontSize: '16px', fontWeight: 'bold' }}>{selected.name}</InputLabel>
                            <Typography variant="subtitle2" sx={{ mt: '6px' }}> {selected.category} </Typography>
                            <Rating name="rating" count={5} size="small" defaultValue={3} precision={0.5} readOnly />
                            <Typography variant="caption" sx={{ mt: '0.3125rem' }}>{selected.type} • {selected.privacy}</Typography>

                        <div style={{width: "150px", height: "100px"}}>

                            <Typography variant="caption" sx={{display: 'flex', flexWrap:"wrap", flexDirection: 'column', alignItems: 'center', fontSize: '13px', fontWeight: 'bold' }}>Description</Typography>
                            <Typography variant="caption"sx={{display: 'flex', flexWrap:"wrap", flexDirection: 'column', alignItems: 'center',width: '100%' }}>

                                {selected.description}

                            </Typography>

                        </div>
                        </Box>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
      </React.Fragment>
    );






}

export default Map;