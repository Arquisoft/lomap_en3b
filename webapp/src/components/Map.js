// the list where I will retrive the markers from juan and preload them
import React, {useState} from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import "./styles/Locations.css"
import mapStyles from "./styles/MapStyles";
import {readLocations, writeLocations} from "../handlers/podAccess";
import Rating from "react-rating-stars-component";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import {Box, InputLabel,Typography, Container,IconButton} from '@mui/material';
import {getFriendsWebIds} from "../handlers/podHandler";
import {Controller} from "../handlers/controller";
import {convertViewLocationIntoDomainModelLocation} from "../util/Convertor";

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

/**
     * This method contains the main map compunent and all the operations that happen on the map
     *
     * This method renders the map component and and contains all the state variables and functions for updateing it and adding marker.
     * Initialy the map is  not Intercavtive and becomes interactive when we press the add button in the header and then becomes non Interactive
     * again after you add a marker with a click on the map . This is done using the idInteractive prop passed from the header.
     *
     * When you click on the map the add marker function is executed. It adds propertys to a marker and adds it to the marker list.
     *
     * Inittialy the map function should load the marker from your pod using the retiriveLocation function
     *
     * When you click a marker we pass as a prop the poroperys of the marker to the InfoList component
     *
     *
     * The props  changesInFilters,selectedFilters, onMarkerAdded,markerData,onInfoList,  changesInComments are props that are passed to the
     * map component from the others components to know when we should update the locations
     *

     * @param changesInFilters
     * @param selectedFilters
     * @param isInteractive
     * @param session
     * @param onMarkerAdded
     * @param markerData
     * @param onInfoList
     * @param changesInComments
     */
function Map({ changesInFilters,selectedFilters,isInteractive,session, onMarkerAdded,markerData,onInfoList,  changesInComments,updatedReview, updateLocation,editLocation}) {
    // Defining the state variables
    const[originalMarkers,setOriginalMarkers]=React.useState([])// in order to restore markers after filtering
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [canAddMarker, setCanAddMarker] = React.useState(false); // Add state to track whether we can add a marker or not
    const mapRef = React.useRef(null);
    const [showNameInput, setShowNameInput] = useState(false); // ınfowindow buton
    const [selectedMarker, setSelectedMarker] = useState(null);
    const controlMng = new Controller(session);

    // Function for adding a marker
    const addMarker = React.useCallback(
      (event) => {
        setOriginalMarkers((current) => [
          ...current,
          {
            key: current.length,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
            description:'',
            pic:'',
            name: '',
            category: '',
            privacy: '',
            locOwner: '',
            rate: "",
            comments:[],
          },
        ]);


              onMarkerAdded(); // Call the onMarkerAdded callback
              setCanAddMarker(true); // Set canAddMarker to false after adding a marker
          },
          []
      );

      // Function to get and set the locations on the map
    const retrieveLocations=async () => {
        let friends = await getFriendsWebIds(session.info.webId);
        let resource = session.info.webId.replace("/profile/card#me", "/private/lomap/locations.ttl");
        // Code to get the friends locations
        let locations = await readLocations(resource, session);
        resource = session.info.webId.replace("/profile/card#me", "/public/lomap/locations.ttl");
        locations = locations.concat(await readLocations(resource, session));
        let friendsLocations = [];
        for (let i = 0; i < friends.length; i++) {
            try {
                //concat it with the previous locations (concat returns a new array instead of modifying any of the existing ones)
                friendsLocations = friendsLocations.concat(await readLocations(friends[i].replace("/profile/card", "/") + "public/lomap/locations.ttl",session));
            } catch (err) {
                //Friend does not have LoMap??
                console.log(err);
            }
        }

        return locations.concat(friendsLocations); //TODO -> si usamos session handler podríamos tener las localizaciones en session?
    }

    async function getAndSetLocations() {
        let locationSet = await retrieveLocations()
        setMarkers((current) => [...current, ...locationSet]);
        setOriginalMarkers(locationSet);

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

    //function to update the propertys of a location
    const updateLastMarker = async () => {

        setOriginalMarkers((current) => {


            const lastMarker = current[current.length - 1];
            console.log(lastMarker);

            const marker = markerData[0]; // Access the object inside the array

            lastMarker.name = marker.name;
            lastMarker.category = marker.category;
            lastMarker.privacy = marker.privacy;
            lastMarker.pic=marker.pic;
            lastMarker.description=marker.description;

            //TODO : It works here !
            saveLocations(lastMarker.lat, lastMarker.lng, lastMarker.name, lastMarker.description, lastMarker.category, lastMarker.privacy);

            return [...current];
        });
    };



    const updateMarker = () => {

        setOriginalMarkers((current) => {


            
            //console.log(lastMarker);
            const marker = markerData[0]; // Access the object inside the array

            const lastMarker = current[marker.key];

            lastMarker.name = marker.name;
            lastMarker.category = marker.category;
            lastMarker.privacy = marker.privacy;
            lastMarker.pic=marker.pic;
            lastMarker.description=marker.description;
            return [...current];
        });
        //We are only adding one, the last one
        //saveLocations(originalMarkers[originalMarkers.length -1]);

    };


    const saveLocations = (lat, lng, name, description, category, privacy) => {
        console.log("I get: ");
        console.log(lat, lng, name, description, category, privacy)
        //TODO: Add check bc it is call two times.
        /*
        if(viewLocat) {
            //Create locationLM with marker data
            let loc = convertViewLocationIntoDomainModelLocation(viewLocat);
            loc.img = viewLocat.pic;
            //Update Controller
            controlMng.addLocation(loc);
            //Save into the POD (async)
            controlMng.saveToPODLocation(loc);
        }
         */
    }

    //function to update the comments
    const updateComments = () => {

        setOriginalMarkers((current) => {


        const marker = markerData[0]; // Access the object inside the array




        const lastMarker = current[marker.key];



       lastMarker.comments=marker.comments;


            console.log(lastMarker);


        lastMarker.comments=marker.review;

        console.log(lastMarker.comments);

        return [...current];
      });
    };

    const onMapLoad = async (map) => {
        mapRef.current = map;
       await getAndSetLocations();

    } ;

    //filter the map when a change in the filter component ocurs
    React.useEffect(()=>{


        if(selectedFilters.length>0){//If there are no filters selected i want the original, non filtered set of markers displayed.
            let filteredSet =[];
            for (let  category = 0; category <selectedFilters.length ;category++) {
                for (let i = 0; i < originalMarkers.length; i++) {

                    if (selectedFilters[category] == originalMarkers[i].category && !filteredSet.find((element) => element === originalMarkers[i])) {

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
           updateLastMarker(); // Call the updateLastMarker function

        }
    }, [canAddMarker]);

    //update the comments after the comments in the info list are updated
    React.useEffect(() => {

        if (changesInComments) {
          updateComments();
          updatedReview();
          
        }
        
        
      }, [changesInComments]);

      //edit location effect
      React.useEffect(() => {

        if (updateLocation) {
          updateMarker();
          editLocation();
          
          
        }
        
        
      }, [updateLocation]);
      

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


    //the component that renders a googleMap component
    return (
        <React.Fragment>

            <GoogleMap
                zoom={10} //zoom level
                center={{ lat: 43.361916, lng: -5.849389 }} //center of the map
                mapContainerStyle={containerStyle} // the style of the map container
                options={options}
                onClick={isInteractive ? addMarker : null} // Only allow adding markers when canAddMarker is true
                onLoad={onMapLoad} //callback function called when the map is loaded
                aria-label="Map render"
            >
                {markers.map((marker, index) => ( // Loop through each marker and create a Marker component for each one
                    <Marker
                        key={index} // Unique identifier for each marker
                        position={{ lat: marker.lat, lng: marker.lng }} // Position of the marker
                        icon={{

                            url: iconUrls[marker.category] || "/blackLocation.svg",// URL for the marker icon, with a fallback to a default icon
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                        onClick={() => { // Callback function called when a marker is clicked
                            setSelected(marker); // Set the selected marker
                            onInfoList(marker); // Callback function called to update an information list

                        }}
                    />

          ))}

        </GoogleMap>
      </React.Fragment>
    );






}

export default Map;