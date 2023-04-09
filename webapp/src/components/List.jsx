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


const List = ({ isVisible, onAddMarker}) => {

    const handleAddButtonClick = () => {
        onAddMarker();
    };

    const style = {
        display: isVisible ? 'block' : 'none',
        width: '100%',
        maxWidth: '20rem',
        margin: '0 auto',
    };

    return (
        <Container style={style}>
            <>
                <IconButton style={{ marginLeft: '15.625rem', marginTop: '-1.25rem' }} onClick={() => {
                    handleAddButtonClick(); // PANELİN AÇILIP KAPANMA İŞLEMİNİ YAPTIK
                }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" style={{ fontFamily: 'Arial' }}>Click for Add a Marker</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel> Name: </InputLabel>
                        <TextField style={{ width: '100%' }} />
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Type</InputLabel>
                        <Select style={{ width: '100%' }}>
                            <MenuItem value="Bar">Bar</MenuItem>
                            <MenuItem value="Shop">Shop</MenuItem>
                            <MenuItem value="Restaurant">Restaurant</MenuItem>
                            <MenuItem value="Park">Park</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel>Privacy</InputLabel>
                        <RadioGroup row>
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
                            handleAddButtonClick(); // PANELİN AÇILIP KAPANMA İŞLEMİNİ YAPTIK
                    }}>
                        Finish
                    </Button>
                </div>
                </div>
            </>
        </Container>
    )};
    export default List;