import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import InfoList from "../components/InfoList";
import AccountPage from "../components/AccountPage";
import {Search as SearchIcon, Search} from "@mui/icons-material";
import {CssBaseline, Grid, IconButton, InputBase} from "@mui/material";



const MapView = ({session,onSearch}) => {
  const [isInteractive, setIsInteractive] = useState(false); // track the interactive state of the map
  const [showList, setShowList] = useState(false);
  const [showInfoList, setShowInfoList] = useState(false);
  const [showAccountPage, setShowAccountPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // places library
  }); // hook to load the google script

  const handleMarkerAdded = () => {
    setIsInteractive(false);
  };

  const makeMapInteractive = () => {
    setIsInteractive(!isInteractive);
    console.log(showList);
    setShowList(!showList);
  };

  const makePanelDisapear = () => {
    setShowList(!showList);
  };
  const makeInfoPanelDisapear = () => {
    setShowInfoList(!showInfoList);
  };

  const makeAccountPageDisapear = () => {
    setShowAccountPage(!showAccountPage);
  };
//Arama kutusunda bir karakter değişikliği olduğunda tetiklenen fonksiyon
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  //Arama kutusuna "Searrch Icon" tuşuna basıldığında tetiklenen fonksiyon
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Sayfanın yenilenmesini önlemek için varsayılan işlemi durduruyoruz.
    const request = {
      query: searchValue,
      fields: ["name","geometry"],
    };
    const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
    );
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const firstResult = results[0];
        const { lat, lng } = firstResult.geometry.location;
        onSearch(lat, lng);
      } else {
        console.log("Error Searching for Place");
      }
    });
  };
  if (loadError) return <div> Error Loading Maps </div>;
  if (!isLoaded) return <div>Loading Maps</div>; //Checking if the map loaded
  return (
      <>
        <CssBaseline />
        <Header
            onAddMarker={() => makeMapInteractive()}
            onInfoList={() => makeInfoPanelDisapear()}
            onEditMarker={() => makePanelDisapear()}
            onAccountPage={() => makeAccountPageDisapear()}
        />    <Grid container spacing={3} style={{ width: "100%" }}>
        <List isVisible={showList} onAddMarker={() => makePanelDisapear()} />
        <InfoList isInfoVisible={showInfoList}  onInfoList={() => makeInfoPanelDisapear()}/>
        <AccountPage isAccountVisible={showAccountPage} onAccountPage={() => makeAccountPageDisapear()}/>
        <Grid item xs={12} md={8}>
          <Map isInteractive={isInteractive} session={session} onMarkerAdded={handleMarkerAdded}/>
          <form onSubmit={handleSearchSubmit} style={{ borderRadius: '8px', backgroundColor: 'white', position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputBase
                  placeholder="Search Location"
                  value={searchValue}
                  onChange={handleSearchChange} // handleSearchChange fonksiyonunun çalışmasını sağlıyoruz
                  style={{ marginRight: '16px' }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </form>
        </Grid>
      </Grid>
      </>
  );
};





export default MapView;