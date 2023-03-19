import React from 'react';

import{GoogleMap, useLoadScript,Marker, InfoWindow} from "@react-google-maps/api";





/*
Function used to
load the google script
*/

export default function First(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);


    const [isAddMarker, setIsAddMarker] = React.useState(false); // lokasyon eklemek için deneme ON MAPCLİCKDEN ÖNCE ÇAĞIRDIK ÇÜNKÜ TANIMLANMAMA HATASI ALIYORDU!!
    const onMapClick = React.useCallback((event) => {
        setSelected(null);
        if(isAddMarker){
            setMarkers(current => [...current, {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
                name: '', //ın here we add name of location
                category: '',
                review: '',
                image: '',
                privacy: '',
                rating: ''
            }])  }
    }, [isAddMarker]);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handleMarkerClick = (marker) => {
        setSelected(marker);
    }

    const handleNameChange = (event, marker) => {
        marker.name = event.target.value;
        setMarkers([...markers]);
    }

    const handleCategoryChange = (event, marker) => {
        marker.category = event.target.value;
        setMarkers([...markers]);
    }
    const handleRateChange = (event, marker) => {
        marker.rate = event.target.value;
        setMarkers([...markers]);
    }

    const handleReviewChange = (event, marker) => {
        marker.review = event.target.value;
        setMarkers([...markers]);
    }
    const handlePrivacyChange = (event, marker) => {
        marker.privacy = event.target.value;
        setMarkers([...markers]);
    }


    const handleAddMarker = () => {
        setSelected(null);
        setMarkers([...markers]);

    }
    const [isPanelOpen, setIsPanelOpen] = React.useState(false); // panelin açılıp kapanmadığını kontrol eder {isPanelOpen && ( buradaki işi yapar
    const [isInfoWindowOpen, setOpenInfoWindow] = React.useState(false); // buda info paneli için
    const [isLocation, setisLocation] = React.useState(false); // buda info paneli için



    if (loadError) return <div> Error Loading Maps </div>
    if (!isLoaded) return <div>Loading Maps</div>

    return (
        <div className="content">

            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                        <PlaceIcon size="small" onClick={() => setisLocation(!isLocation)} />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        LOMAP
                        <Button>Home</Button>
                        <Button>Friends</Button>
                        <Button>Map</Button>
                    </Typography>

                    <div>
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <div style={{display: "flex", height: "100vh"}}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                </div>
                {isLocation && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <ButtonGroup color="inherit" orientation="vertical">
                            <Button  size="small" onClick={() => setOpenInfoWindow(true)}>
                                Info Window
                            </Button>
                            <Button  size="small" onClick={() => setIsPanelOpen(!isPanelOpen)}>
                                Toggle Panel
                            </Button>
                            <Button size="small" onClick={() => setIsAddMarker(prevState => !prevState)}>
                                {isAddMarker ? 'Cancel' : 'Add Location'}
                            </Button>
                        </ButtonGroup>
                    </div> )}

                {isInfoWindowOpen && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Name
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {selected.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Category
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {selected.category}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Reviews
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {selected.review}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Privacy
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {selected.privacy}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Rating
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {selected.rate}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                size="small"
                                onClick={() => setOpenInfoWindow(false)}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                )}

                {isPanelOpen && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Box sx={{ backgroundColor: "#f2f2f2", p: 2, borderRadius: "10px" }}>
                            <h3>Add a new marker</h3>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    onChange={(e) => handleNameChange(e, selected)}
                                    value={selected ? selected.name : ""}
                                />
                            </label>
                            <Box sx={{ mt: 2 }}>
                                <label>
                                    Category:
                                    <select
                                        onChange={(e) => handleCategoryChange(e, selected)}
                                        value={selected ? selected.category : ""}
                                    >
                                        <option value="">Choose a category for marker</option>
                                        <option value="shop">Shop</option>
                                        <option value="bar">Bar</option>
                                        <option value="restaurant">Restaurant</option>
                                        <option value="park">Park</option>
                                    </select>
                                </label>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <label>
                                    Review:
                                    <textarea
                                        onChange={(e) => handleReviewChange(e, selected)}
                                        value={selected ? selected.review : ""}
                                    />
                                </label>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <label>
                                    Rating:
                                    <select
                                        onChange={(e) => handleRateChange(e, selected)}
                                        value={selected ? selected.rate : ""}
                                    >
                                        <option value="">Choose a rate for marker</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </label>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <label>
                                    <input type="radio" name="privacy" value="private" onChange={(e) => handlePrivacyChange(e, selected)} />
                                    Private
                                </label>
                                <label>
                                    <input type="radio" name="privacy" value="public" onChange={(e) => handlePrivacyChange(e, selected)} />
                                    Public
                                </label>
                            </Box>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                <label>
                                    <Button color="inherit" size="small" onClick={handleAddMarker}>
                                        Add Marker
                                    </Button>
                                </label>
                            </div>
                        </Box>
                    </div>
                )}

                <div style={{flex: 1}}>
                    {<div className="map">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{lat: 43.36029, lng: -5.84476}}
                            zoom={10}
                            options={options}
                            onClick={onMapClick}
                            onLoad={onMapLoad}
                        >
                            {markers.map((marker) => (
                                <Marker
                                    key={`${marker.lat}-${marker.lng}`}
                                    position={{lat: marker.lat, lng: marker.lng}}
                                    onClick={() => handleMarkerClick(marker)}
                                />
                            ))}
                            {selected ? (
                                <InfoWindow
                                    position={{lat: selected.lat, lng: selected.lng}}
                                    onCloseClick={() => setSelected(null)}

                                >
                                    <Box sx={{ maxWidth: "200px" }}>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {selected.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Category:</strong> {selected.category}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Review:</strong> {selected.review}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Rating:</strong> {selected.rate}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Privacy:</strong> {selected.privacy}
                                        </Typography>
                                        <Typography variant="caption">
                                            <strong>Added:</strong> {formatRelative(selected.time, new Date())}
                                        </Typography>
                                    </Box>
                                </InfoWindow>
                            ) : null}
                        </GoogleMap>
                    </div>}
                </div>
            </div>
        </div>
    );
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


