import React, { useState} from "react";
import { useLoadScript } from "@react-google-maps/api";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import InfoList from "../components/InfoList";
import EditList from "../components/EditList";
import AccountPage from "../components/AccountPage";
import {Search as SearchIcon, Search} from "@mui/icons-material";
import {CssBaseline, Grid, IconButton, InputBase,FormControl,Select} from "@mui/material";
import FilterSidebar from "../components/Filters";

const MapView = ({session,onSearch}) => {
  const [changesInFilters,setChangesInFilters]=useState(false);
  const [isInteractive, setIsInteractive] = useState(false); // track the interactive state of the map
  const [showList, setShowList] = useState(false);
  const [showEditList, setShowEditList] = useState(false);
  const [showInfoList, setShowInfoList] = useState(false);
  const [showAccountPage, setShowAccountPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterSideBar,setFilterSideBar]=useState(false);
  const [selectedFilters,setSelectedFilters]=useState([]);  const [markerData, setMarkerData] = useState([]);
  const [selected, setSelected] = React.useState(['']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // places library
  }); // hook to load the google script
  const updateFilterListInUse= (filters)=>{
    setSelectedFilters(filters);

  };
  const handleMarkerAdded = () => {
    setIsInteractive(false);
   
  };

  

  const makeMapInteractive = () => {
    setIsInteractive(!isInteractive);
    
    setShowList(!showList);
  };

  const makePanelDisapear = (marker) => {
    setShowList(!showList);
    setMarkerData([marker]);
    

    
    
  };

  const makeEditPanelDisapear = () => {
    setShowEditList(!showEditList);
  };
  const makeInfoPanelDisapear = (marker) => {
    setShowInfoList(!showInfoList);
    setSelected([marker]);
    
  };
  const displayFilterSideBar = () =>{

    setFilterSideBar(!filterSideBar);

  }
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
            
            onEditMarker={() => makePanelDisapear()}
            onMarker={() => makeEditPanelDisapear()}
            onAccountPage={() => makeAccountPageDisapear()}
            onFilterLocations={() => displayFilterSideBar()}
        />    <Grid container spacing={4} style={{ width: "100%" }}>
        <List isVisible={showList} onAddMarker={(marker) => makePanelDisapear(marker)} />
        <EditList isEditVisible={showEditList} onEditMarker={() => makeEditPanelDisapear()}  />
        <InfoList isInfoVisible={showInfoList}  onInfoList={() => makeInfoPanelDisapear()} selected={selected}/>
        <FilterSidebar visible={filterSideBar} onFilterLocations={() => displayFilterSideBar()} onFilterSelected={(filters)=>updateFilterListInUse(filters)}  />
        <AccountPage isAccountVisible={showAccountPage} onAccountPage={() => makeAccountPageDisapear()}/>
        <Grid item xs={12} md={8}>
          <Map filterChanges={changesInFilters} selectedFilters={selectedFilters} isInteractive={isInteractive} session={session} onMarkerAdded={handleMarkerAdded} markerData={markerData} onInfoList={(marker) => makeInfoPanelDisapear(marker)}/>
          <form onSubmit={handleSearchSubmit} style={{ borderRadius: '0.5rem', backgroundColor: 'white', position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputBase
                  placeholder="Search Location"
                  value={searchValue}
                  onChange={handleSearchChange} // handleSearchChange fonksiyonunun çalışmasını sağlıyoruz
                  style={{ marginRight: '1rem' }}
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