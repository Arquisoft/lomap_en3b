import React,{useState} from 'react';

import {

    FormControlLabel,
    Checkbox,
     Typography, IconButton

} from "@mui/material";
import {FormControl} from "./styles/ListStyle";
import InputLabel from "@mui/material/InputLabel";
import {Container} from "./styles/ListStyle";
import CloseIcon from '@mui/icons-material/Close';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

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
     * When a checkbox suffers changes in it's checked property, it checks :
     *  -If it was not selected but was already in the list of filters , it means that the user wants to STOP using the filter.
     *  -If it was selected but was not in the list, it means that the user wants that filter to be applied NOW.
     *  In any of those cases, we will update the filter category set of this component and the set on filters in MapView,
     *  so Map component can access the information of filters and re-render.
     *
     * Its important to not call the state methods of setCategoryFilters and onFilterSelected if not needed, since that would cause unnecesary
     * state changes and so re-renders.
     * @param wasSelected
     * @param value
     */
    function updateFiltersSelected(wasSelected, value){

        let currentList=categoryFilters;
        let updated=currentList;
        let alreadyInList=currentList.includes(value)

      if(wasSelected != alreadyInList) {
          if (!wasSelected && alreadyInList) {
              //If the filter was in the list and now its wasSelected value is false, it means that we need to update the list.
              updated = currentList.filter(element => element != value);


          } else if (wasSelected && !alreadyInList) {
              updated.push(value);

          }
          setCategoryFilters(updated);
          onFilterSelected(updated)

      }
    }



/**NOTICE HOW VALUES ARE IN LOWERCASE, THAT'S HOW THEY APPEAR IN THE FILE!*/
    return (
       <Container aria-label="Filtering options" style={style}>
           <IconButton style={{ marginLeft: '16.625rem', marginTop: '-1.25rem' }} aria-label="close filter dialog" onClick={onFilterLocations}><CloseIcon/></IconButton>
           <Typography variant ="h3" style={{size:'1em'}}> Filter pins!</Typography>

           <FormControl style={{ display: 'flex', flexDirection: 'column', flex: 1 }} value={categoryFilters}>
               <InputLabel>Location type</InputLabel>
               <FormControlLabel
                   control={<Checkbox
                       icon={<FmdGoodIcon />} // Use FmdGoodIcon as the unchecked icon
                       checkedIcon={<FmdGoodIcon  htmlColor="yellow" />} // Use FmdGoodIcon as the checked icon
                       value="sight"
                       onChange={(e) => updateFiltersSelected(e.target.checked, e.target.value)}
                   />}
                   style={{ flex: 1 }}
                   label="Sight"
               />
               <FormControlLabel
                   control={<Checkbox
                       icon={<FmdGoodIcon />} // Use FmdGoodIcon as the unchecked icon
                       checkedIcon={<FmdGoodIcon htmlColor="orange" />} // Use FmdGoodIcon as the checked icon
                       value="restaurant"
                       onChange={(e) => updateFiltersSelected(e.target.checked, e.target.value)}
                   />}
                   style={{ flex: 1 }}
                   label="Restaurant"
               />
               <FormControlLabel
                   control={<Checkbox
                       icon={<FmdGoodIcon />} // Use FmdGoodIcon as the unchecked icon
                       checkedIcon={<FmdGoodIcon  htmlColor="purple" />} // Use FmdGoodIcon as the checked icon
                       value="monument"
                       onChange={(e) => updateFiltersSelected(e.target.checked, e.target.value)}
                   />}
                   style={{ flex: 1 }}
                   label="Monument"
               />
               <FormControlLabel
                   control={<Checkbox
                       icon={<FmdGoodIcon />} // Use FmdGoodIcon as the unchecked icon
                       checkedIcon={<FmdGoodIcon  htmlColor="green" />} // Use FmdGoodIcon as the checked icon
                       value="park"
                       onChange={(e) => updateFiltersSelected(e.target.checked, e.target.value)}
                   />}
                   style={{ flex: 1 }}
                   label="Park"
               />
               <FormControlLabel
                   control={<Checkbox
                       icon={<FmdGoodIcon />} // Use FmdGoodIcon as the unchecked icon
                       checkedIcon={<FmdGoodIcon htmlColor="red" />} // Use FmdGoodIcon as the checked icon
                       value="bar"
                       onChange={(e) => updateFiltersSelected(e.target.checked, e.target.value)}
                   />}
                   style={{ flex: 1 }}
                   label="Bar"
               />
               <FormControlLabel
                   control={<Checkbox
                       icon={<FmdGoodIcon />} // Use FmdGoodIcon as the unchecked icon
                       checkedIcon={<FmdGoodIcon  htmlColor="blue" />} // Use FmdGoodIcon as the checked icon
                       value="shop"
                       onChange={(e) => updateFiltersSelected(e.target.checked, e.target.value)}
                   />}
                   style={{ flex: 1 }}
                   label="Shop"
               />
           </FormControl>



       </Container>


    )
               };
