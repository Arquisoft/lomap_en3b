import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {
    FormControl,
    SelectEmpty,
    Loading,
    Container,
    MarginBottom,
} from './styles/ListStyle.js';
import Rating from "react-rating-stars-component";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {IconButton, Grid, } from "@mui/material";
import {Place as PlaceIcon} from "@mui/icons-material";
import Map from  "../components/Map";
import CloseIcon from "@mui/icons-material/Close";

/**
 * The add Marker List
 * 
 * The component takes two props: "isVisible" and "onAddMarker". "isVisible" is a boolean that determines whether the component should be visible or hidden. 
 * "onAddMarker" is a callback function that will be called when the user finishes adding a marker.

  *  The component defines three state variables using the "useState" hook: "name", "category", and "privacy". 
  *  The "handleAddButtonClick" function is used to add a marker when the user clicks the "Finish" button. If both the "name" and "category" fields are not empty,
    * The "onAddMarker" callback is called with an object containing the name, category, and privacy values, and the "name", "category", and "privacy" state variables are reset to their initial values.
 * 
 * @param isVisible
 * @param onAddMarker
 * 
 */
const List = ({ isVisible, onAddMarker}) => {

     // Define three state variables using the useState hook. The new location properys
    const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [privacy, setPrivacy] = useState('public');

 // Define a function to handle the "Finish" button click event
  const handleAddButtonClick = () => {
    if (name !== '' && category !== '') {
      onAddMarker({ name, category, privacy });//sends an object containing the new values to the Map component where we update the location
      setName('');
      setCategory('');
      setPrivacy('public');
      
      
    }
  };


    // Define a style object based on the visibility prop passed to the component
    const style = {
        display: isVisible ? 'block' : 'none',
        width: '100%',
        maxWidth: '20rem',
        margin: '0 auto',
    };



     // Render the component
    return (
        <Container style={style}>
            <>
                <IconButton style={{ marginLeft: '15.625rem', marginTop: '-1.25rem' }} onClick={() => {
                  
                }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" style={{ fontFamily: 'Arial' }}>Click after you finish to Add a Marker</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel> Name: </InputLabel>
                        <TextField style={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Type</InputLabel>
                        <Select style={{ width: '100px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
                            <MenuItem value="bar">Bar</MenuItem>
                            <MenuItem value="shop">Shop</MenuItem>
                            <MenuItem value="restaurant">Restaurant</MenuItem>
                            <MenuItem value="park">Park</MenuItem>
                            <MenuItem value="monument">Monument</MenuItem>
                            <MenuItem value="sight">Sight</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Privacy</InputLabel>
                        <RadioGroup row value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                            <FormControlLabel
                                value="public"
                                control={<Radio color="default" />}
                                label="Public"
                            />
                            <FormControlLabel
                                value="private"
                                control={<Radio color="default" />}
                                label="Private"
                            />
                        </RadioGroup>
                    </FormControl>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={() => {
                            handleAddButtonClick(); //event to know that the action is finoished
                    }}>
                        Finish
                    </Button>
                </div>
                </div>
            </>
        </Container>
    )};
    export default List;