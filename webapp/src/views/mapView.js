import React, { useState} from "react";
import { useLoadScript } from "@react-google-maps/api";
import Header from "../components/Header";
import List from "../components/List";
import Map from "../components/Map";
import InfoList from "../components/InfoList";
import EditList from "../components/EditList";

import LogOut from "../components/LogOut";
import {Search as SearchIcon, Search} from "@mui/icons-material";
import {CssBaseline, Grid, IconButton, InputBase,FormControl,Select} from "@mui/material";
import FilterSidebar from "../components/Filters";
import ErrorView from "./errorView"
import MapErrorBoundary from "../components/MapErrorBoundry";






/**
 *
 * This is the main Compomnent that renders a map view with various components like the header, list, map, info list, edit list, account page, and filter sidebar.
 * The component is used to display markers on the map with additional information that can be edited by the user.

  The component uses various hooks like useState and useLoadScript.
  It defines several state variables to manage the interactive state of the map, display markers, and show/hide components like the list, edit list, info list, and filter sidebar.
  It also uses the Google Maps API to search for places and add markers to the map.

  The component defines several functions to handle user interactions like adding and editing markers, displaying the filter sidebar, making the account page disappear
  , and showing/hiding the list, edit list, and info list components. It also defines two functions to handle changes in the filter list and search box input.

  *@param session
  *@param onSearch
 */
const MapView = ({session,onSearch}) => {
  const [changesInFilters, setChangesInFilters] = useState(false); // track changes in filter state
  const [changesInComments, setChangesInComments] = useState(false); // track changes in comments state
  const [isInteractive, setIsInteractive] = useState(false); // track the interactive state of the map
  const [showList, setShowList] = useState(false); // track whether the list is being shown
  const [showEditList, setShowEditList] = useState(false); // track whether the edit list is being shown
  const [showInfoList, setShowInfoList] = useState(false); // track whether the info list is being shown
  const [showAccountPage, setShowAccountPage] = useState(false); // track whether the account page is being shown

  const [filterSideBar, setFilterSideBar] = useState(false); // track whether the filter sidebar is being shown
  const [selectedFilters, setSelectedFilters] = useState([]); // track which filters are selected
  const [markerData, setMarkerData] = useState([]); // track marker data for the list and comments
  const [selected, setSelected] = React.useState(['']); // track selected markers for the info list
  const [showLogOut, setShowLogOut] = useState(false);
  const [updateLocation, setupdateLocation] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // load the places library
  }); // hook to load the google script

  /**
   * This function is responsible from passing the filters selected in the FilterSidebar component into the Map component.
   * For that i stablish a "common point" for both , here in their parent component, map view.
   * That common point is the array of filters and the state changesInFilters
   * (using the array of filters as a dependency for useEffect in map was not allowed, since it changed sizes between renders)
   *This method is a way of using the set functionality of both states without passing the setters to both components.
   * @param filters
   */
  const updateFilterListInUse = (filters) => {
    setSelectedFilters(filters);
    setChangesInFilters(!changesInFilters);
  };

  // set interactive state to false when marker is added
  const handleMarkerAdded = () => {
    setIsInteractive(false);
  };

  // toggle interactive state and show list
  const makeMapInteractive = () => {
    //setIsInteractive(!isInteractive);
    setShowList(!showList);
  };

  // hide list and show marker in the list
  const makePanelDisapear = (marker) => {
    setIsInteractive(!isInteractive);
    setShowList(!showList);
    setMarkerData([marker]);
  };

  // hide edit list
  const makeEditPanelDisapear = () => {
    setShowEditList(!showEditList);
  };

  // hide info list and show marker in the info list
  const makeInfoPanelDisapear = (marker) => {
    setShowInfoList(!showInfoList);
    setSelected([marker]);
  };

  const makeEdit = (marker) => {
    setShowInfoList(!showInfoList);
    setMarkerData([marker]);
    setupdateLocation(!updateLocation);
  };


  const updateDone =() =>{
    setupdateLocation(!updateLocation);

  };

  // set marker data for comments and show comment panel
  const makeComments = (marker) => {
    setMarkerData([marker]);
    setChangesInComments(!changesInComments);
  };

  const updateComments = ( ) =>{

    setChangesInComments(!changesInComments);
  };

  // display filter sidebar
  const displayFilterSideBar = () => {
    setFilterSideBar(!filterSideBar);

  }


  const makeLogOutDisapear = () => {
    setShowLogOut(!showLogOut);

  };




  if (loadError) return <ErrorView/>;

  return (
      <>
        <CssBaseline />
        <Header
            onAddMarker={() => makeMapInteractive()}

            onEditMarker={() => makePanelDisapear()}
            onMarker={() => makeEditPanelDisapear()}

            onLogOut={() => makeLogOutDisapear()}
            onFilterLocations={() => displayFilterSideBar()}
        />    <Grid container spacing={4} style={{ width: "100%" }}>
        <List isVisible={showList} onAddMarker={(marker) => makePanelDisapear(marker)} />
        <EditList isEditVisible={showEditList} onEditMarker={() => makeEditPanelDisapear()} />
       
        <InfoList isInfoVisible={showInfoList}  onInfoList={() => makeInfoPanelDisapear()} selected={selected} newComments={(marker) => makeComments(marker)} onEditMarker={(marker) => makeEdit(marker)} />
        
        <FilterSidebar visible={filterSideBar} onFilterLocations={() => displayFilterSideBar()} onFilterSelected={(filters)=>updateFilterListInUse(filters)}  />



        <LogOut isLogOutVisible={showLogOut} onLogOut={() => makeLogOutDisapear()}/>
        { (!isLoaded || loadError) ? <ErrorView />: <Grid item xs={12} md={8} aria-label="Map container">
        <MapErrorBoundary>
          <Map filterChanges={changesInFilters} selectedFilters={selectedFilters} isInteractive={isInteractive} session={session} onMarkerAdded={handleMarkerAdded} markerData={markerData} onInfoList={(marker)=>makeInfoPanelDisapear(marker)} changesInComments={changesInComments} updatedReview={updateComments} updateLocation={updateLocation} editLocation={updateDone}/>
        </MapErrorBoundary>
          
        </Grid>}
      </Grid>
      </>
  );
};





export default MapView;