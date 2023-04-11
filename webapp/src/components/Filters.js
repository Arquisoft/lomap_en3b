import React,{useState} from 'react';

import {
    Grid,
    FormControlLabel,
    Checkbox,
    Drawer, List, Box, Typography, IconButton, Button

} from "@mui/material";
import {FormControl} from "./styles/ListStyle";
import InputLabel from "@mui/material/InputLabel";
import {Container} from "./styles/ListStyle";


import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Group} from "@mui/icons-material";


export default function FilterSidebar({visible, onFilterLocations,onFilterSelected} ){
    const [categoryFilters, setCategoryFilters]=useState([]);

    const style = {
        display: visible ?  'flex':'none',
        flexDirection:'column',
        bottom: '20vh',//I overwrite the inherited value because i want it to be smaller.

    };


    /**
     * I created this method to avoid creating a new state for each checkbox, so if new filters are included it's easier and readable.
     *
     * This method adds a value to the filter list if the checkbox has been checked, and deletes it in case it was unchecked.
     * @param selected
     * @param value
     */
    function updateFiltersSelected(selected, value){

        let currentList=categoryFilters;
        let updated=currentList;

        if(!selected) {
             updated=currentList.filter(element=>element!=value);
        }else{
           updated.push(value);
        }

        setCategoryFilters(updated);
        onFilterSelected(updated);
    }

    return (
       <Container style={style}>
           <Typography variant ="h3" > Filter pins!</Typography>
           <FormControl style={{display:'flex',flexDirection:'column',flex:1}} value={categoryFilters}  >
               <InputLabel>Location type</InputLabel>

               <FormControlLabel control={<Checkbox  value="Sight" onChange={(e)=>updateFiltersSelected(e.target.checked,e.target.value )}/> } style={{flex: 1}} label="Sight"  />
               <FormControlLabel  control={<Checkbox  value="Restaurant"  onChange={(e)=>updateFiltersSelected(e.target.checked, e.target.value)}/> }style={{flex: 1}} label="Restaurant" />
               <FormControlLabel  control={<Checkbox  value="Monument" onChange={(e)=>updateFiltersSelected(e.target.checked, e.target.value )}/> } style={{flex: 1}} label="Monument" />
               <FormControlLabel control={<Checkbox  value="Park" onChange={(e)=>updateFiltersSelected(e.target.checked,e.target.value )}/> } style={{flex: 1}} label="Park"  />
               <FormControlLabel control={<Checkbox  value="Bar"  onChange={(e)=>updateFiltersSelected(e.target.checked,e.target.value )}/> } style={{flex: 1}}  label="Bar" />
               <FormControlLabel control={<Checkbox   value="Shop" onChange={(e)=>updateFiltersSelected(e.target.checked,e.target.value )}/> }style={{flex: 1}}  label="Shop"/>
           </FormControl>

           <Button  onClick={onFilterLocations}>
              Finish
           </Button>

       </Container>


    )
                };
