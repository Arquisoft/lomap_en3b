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


const List = ({ isVisible, onAddMarker}) => {

    const handleAddButtonClick = () => {
        onAddMarker();
    };

    const style = {
        display: isVisible ? 'block' : 'none',
    };




    return (
        <Container style={style}>
                <>
                    <Typography variant="h5" style={{ fontFamily: 'Arial' }} >Click to add a marker</Typography>
                    <FormControl>
                        <InputLabel> Name: </InputLabel>
                        <TextField style={{ width: '200px' }} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select style={{ width: '200px' }} defaultValue={''}  >
                            <MenuItem value="bar">Bar</MenuItem>
                            <MenuItem value="shop">Shop</MenuItem>
                            <MenuItem value="restaurant">Restaurant</MenuItem>
                            <MenuItem value="park">Park</MenuItem>
                            <MenuItem value="monument">Monument</MenuItem>
                            <MenuItem value="sight">Sight</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Rating</InputLabel>
                        <Rating
                            name="rating"
                            count={5}
                            size={48} // yıldızın sizeını beliriliyoruz
                            activeColor="#ffd700"
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Privacy</InputLabel>
                        <RadioGroup  row >
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
                    <FormControl>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <InputLabel>Picture</InputLabel>
                            </Grid>
                            <Grid item>
                                <IconButton size="large" edge="start" color="default" aria-label="menu">
                                    <AddAPhotoIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </FormControl>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={() => {
                                handleAddButtonClick(); // PANELİN AÇILIP KAPANMA İŞLEMİNİ YAPTIK
                            }}>
                                Finish
                            </Button>
                        </div>
                </>
        </Container>
    )};
    export default List;